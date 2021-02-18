<template>
  <div class="wrapper">

    <reset-password-modal
      v-bind:visible="modalVisible"
      @modalClosed="modalClosed">
    </reset-password-modal>

    <div class="login-page">
        <a-card title="BVU Diploma Manager">
          <a-form-model :model="form" :rules="rules" ref="ruleForm" class="login-form"
            @submit="onSubmit" @submit.native.prevent>
            <a-form-model-item prop="email">
              <a-input v-model="form.email" type="email"
                placeholder="E-mail" allow-clear>
                <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>

            <a-form-model-item prop="password">
              <a-input-password v-model="form.password" type="password"
                placeholder="Mật khẩu" allow-clear>
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input-password>
            </a-form-model-item>

            <a-form-model-item style="text-align: right;">
              <a @click="showModal">Quên mật khẩu ?</a>
            </a-form-model-item>

            <a-form-model-item style="margin-top: 20px;">
              <a-button
                type="primary"
                html-type="submit"
                :loading="isLoading"
                :disabled="form.email === '' || form.password === ''"
              >
                Đăng nhập
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Button, FormModel, Input, Icon, Card, Modal, notification,
} from 'ant-design-vue';
import ResetPasswordModal from '@/components/ResetPasswordModal.vue';
import firebase from 'firebase/app';
import UsersVue from './Users.vue';

Vue
  .use(Icon)
  .use(Modal)
  .use(Card)
  .use(Button)
  .use(FormModel)
  .use(Input);

export default Vue.extend({
  components: {
    ResetPasswordModal,
  },
  data() {
    return {
      modalVisible: false,
      isLoading: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'change',
            message: 'Vui lòng nhập e-mail !',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'change',
            message: 'Vui lòng nhập mật khẩu !',
          },
        ],
      },
    };
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    modalClosed(value) {
      this.modalVisible = value;
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.isLoading = true;

          firebase.auth()
            .signInWithEmailAndPassword(this.form.email, this.form.password)
            .then((value) => {
              // console.log();
              // value.user.updateProfile({
              //   displayName: 'Anh Tuấn',
              // })
              //   .then(() => {
              //     console.log(firebase.auth().currentUser.displayName);
              //   })
              //   .catch((reason) => {
              //     console.log(reason);
              //   });
            })
            .catch((reason) => {
              // alert(reason);
              console.log(reason, reason.message);
              notification.error({
                message: 'BVU Diploma Manager',
                description: reason,
              });
            })
            .finally(() => {
              this.isLoading = false;
            });
          return;
        }

        alert('Thông tin chưa hợp lệ, vui lòng kiểm tra lại !');
      });
    },
  },
});
</script>

<style lang="scss">
  .login-page {
    font-size: 18px;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: url('../assets/0.jpg') no-repeat center;
    background-size: cover;

    //  &::after {
    //   content: '';

    //   position: absolute;
    //   z-index: 0;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;

    //   background: rgba(255, 255, 255, 0.575);
    //   backdrop-filter: blur(20px) saturate(180%);
    // }

    .ant-card {
      // display: none;
      position: relative;
      z-index: 2;
      box-shadow: 0 13px 24px 0 rgba(128, 128, 128, 0.205);

      // > .ant-card-head {
      //   display: none;
      // }
      .ant-card-head-title {
        text-align: center !important;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 10px;

        // padding: 15px 15px 0;
        border-radius: 6px;

        .ant-form-item {
          margin: 0;
        }

        .ant-btn {
          width: -webkit-fill-available;
        }
      }
    }
  }
</style>
