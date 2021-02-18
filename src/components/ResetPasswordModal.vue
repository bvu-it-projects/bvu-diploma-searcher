<template>
    <!-- eslint-disable-next-line vue/max-attributes-per-line -->
    <a-modal v-model="isVisible" title="Đặt lại mật khẩu" :maskClosable="false"
      centered :destroyOnClose="true">
      <a-form-model :rules="rules" :model="form" ref="ruleForm"
        @submit.native.prevent @submit="handleOk">
        <a-form-model-item prop="email" style="margin-bottom: 0;">
          <a-input v-model="form.email" type="email"
            placeholder="Nhập email muốn đặt lại mật khẩu" @change="onEmailChanged">
            <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)"></a-icon>
          </a-input>
          <p class="explain">Một tin nhắn chứa hướng dẫn nhằm Đặt lại mật khẩu sẽ được gửi đến email này sau khi nhấn nút "Xác nhận" bên dưới.
          </p>
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button type="danger" @click="hideSelf">
          Huỷ
        </a-button>
        <a-button type="primary"
          :loading="loading" @click="handleOk" :disabled="!formValid">
          Xác nhận
        </a-button>
      </template>
    </a-modal>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase/app';
import {
  Button, FormModel, Input, Icon, Modal, notification,
} from 'ant-design-vue';
import { Validator } from '@/utils/input-validators';

Vue
  .use(Icon)
  .use(Modal)
  .use(Button)
  .use(FormModel)
  .use(Input);

export default Vue.extend({
  props: [
    'visible',
  ],
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('modalClosed', value);
      },
    },
  },
  data() {
    return {
      loading: false,
      formValid: false,
      form: {
        email: '',
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'change',
            message: 'Vui lòng nhập email của bạn !',
          },
          {
            trigger: 'change',
            validator: Validator.isEmailFormatValid,
          },
        ],
      },
    };
  },
  methods: {
    openNotificationWithIcon(type, content) {
      notification[type]({
        duration: 5,
        message: 'BVU Diploma Manager',
        description: content ?? 'Nothing.',
      });
    },
    onEmailChanged(e) {
      this.$refs.ruleForm.validate((valid) => {
        this.formValid = valid;
      });
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          firebase.auth()
            .sendPasswordResetEmail(this.form.email)
            .then(() => {
              this.openNotificationWithIcon('success', `Đã gửi tin nhắn Đặt lại mật khẩu tới email: ${this.form.email}`);

              setTimeout(() => {
                this.openNotificationWithIcon('info', 'Vui lòng kiểm tra hộp thư email của bạn và làm theo hướng dẫn để Đặt lại mật khẩu.');
              }, 1500);

              this.hideSelf();
            })
            .catch((err) => {
              // console.log(err);
              let errorMessage = '';

              if (err.code === 'auth/user-not-found') {
                errorMessage = 'Địa chỉ email không tồn tại trong hệ thống !';
              } else {
                errorMessage = 'Thất bại, kiểm tra lại email hoặc đường truyền mạng !';
              }

              this.openNotificationWithIcon('error', errorMessage);
            })
            .finally(() => {
              this.loading = false;
            });
          return;
        }

        alert('Thông tin chưa hợp lệ, vui lòng kiểm tra lại !');
      });
    },
    hideSelf() {
      this.isVisible = false;
    },
  },
});
</script>

<style lang="scss">
  .explain {
    margin-top: 15px;
  }
  .ant-modal {
    font-family: GoogleSans;

    .ant-form-item-control {
      line-height: normal;
    }
  }
</style>
