<template>
  <div class="login-page">
    <h1 class="font-bold uppercase text-xl mb-5">Đăng nhập hệ thống - Ký túc xá BVU</h1>

    <a-form-model class="w-full" @submit="verifyPhoneNumber" :model="form" :rules="rules" ref="form">
      <a-form-model-item class="mb-2" has-feedback prop="phoneNumber">
        <a-input @keypress="onPhoneNumberInputKeyPress($event)" @paste="onPhoneNumberInputChange($event)"
          addonBefore="Số điện thoại" placeholder="Ví dụ: 0333326585" :disabled="loginButtonSpinning" allow-clear v-model="form.phoneNumber">
          <a-tooltip slot="suffix" title="Ví dụ số điện thoại hợp lệ: 0333326585">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-form-model-item>

      <a-form-model-item>
        <a-button type="primary" class="w-full" @click="verifyPhoneNumber" :loading="loginButtonSpinning">Đăng nhập</a-button>
      </a-form-model-item>
    </a-form-model>

    <div id="recaptcha-container" class=""></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Button, Calendar, Input, InputNumber, Alert, Tooltip, Icon,
  Form, Layout, FormModel, message, DatePicker, Table, Divider, Tag,
} from 'ant-design-vue';
import firebase from 'firebase/app';

Vue.prototype.$message = message;
Vue
  .use(Alert)
  .use(Button)
  .use(Form)
  .use(FormModel)
  .use(DatePicker)
  .use(Table)
  .use(Layout)
  .use(Calendar)
  .use(Tag)
  .use(Tooltip)
  .use(Divider)
  .use(Icon)
  .use(Input)
  .use(InputNumber);

export default Vue.extend({
  data() {
    const onPhoneNumberInputChangeValidator = (rule: any, value: any, callback: any) => {
      const isFormatValid = new RegExp(/^0[1-9]{1}[0-9]{8}$/gm).test(value);
      if (!isFormatValid) {
        callback('Số điện thoại không hợp lệ (Yêu cầu 10 chữ số)');
      } else {
        callback();
      }
    };

    return {
      phoneNumber: '',
      loginButtonSpinning: false,
      form: {
        phoneNumber: '',
      },
      rules: {
        phoneNumber: [
          {
            required: true, message: 'Vui lòng nhập số điện thoại', trigger: ['blur', 'change'],
          },
          {
            validator: onPhoneNumberInputChangeValidator, trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  computed: {
    // getPhoneNumber() {
    //   // return `+84${this.phoneNumber}`;
    // },
  },
  mounted() {
    //
  },
  methods: {
    // onPhoneNumberInputChange(event: any) {
    //   const clipboardText = event.clipboardData.getData('text/plain');
    //   const parsedNumber = parseInt(clipboardText, 10);

    //   console.log(clipboardText);
    //   console.log('parsed:', parsedNumber);

    //   if (!parsedNumber && !Number.isInteger(parsedNumber)) {
    //     event.preventDefault();
    //     return false;
    //   }

    //   event.clipboardData.setData('text/plain', parsedNumber);
    //   return true;
    // },
    onPhoneNumberInputKeyPress(event: any) {
      const evt = (event) || window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;

      if ((charCode < 48 || charCode > 57) || (charCode === 48 && this.form.phoneNumber == '0') || (this.form.phoneNumber.length === 10)) {
        evt.preventDefault();
        return false;
      }

      return true;
    },
    verifyPhoneNumber() {
      console.log(this.form.phoneNumber);

      (this.$refs.form as FormModel).validate((isValid) => {
        if (isValid) {
          this.login();
        }
      });
    },

    login() {
      this.loginButtonSpinning = true;

      // 'recaptcha-container' is the ID of an element in the DOM.
      const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const provider = new firebase.auth.PhoneAuthProvider();

      provider.verifyPhoneNumber(`+84${this.form.phoneNumber}`, applicationVerifier)
        .then((verificationId) => {
          const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
          return firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode!);
        })
        .then((phoneCredential) => {
          firebase.auth().signInWithCredential(phoneCredential)
            .then((userCredentials) => {
              console.log(userCredentials);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log('err:', err);
        })
        .finally(() => {
          this.loginButtonSpinning = false;
        });
    },
  },
});
</script>

<style lang="scss">
.ant-layout {
  position: relative;
}

#content {

  .login-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    padding: 10px;
    background: white;

    display: flex;
    flex-direction: column;
    align-items: center;

    .grecaptcha-badge {
      bottom: 20px !important;
      right: 20px !important;
    }
  }
}
</style>
