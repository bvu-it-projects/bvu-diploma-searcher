<template>
  <div class="login-page">
    <a-form-model :model="form" :rules="rules" ref="ruleForm" class="login-form"
      @submit="onSubmit" @submit.native.prevent>
      <a-form-model-item prop="email">
        <a-input v-model="form.email" type="email" placeholder="E-mail">
          <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item prop="password">
        <a-input v-model="form.password" type="password" placeholder="Mật khẩu">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
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
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Button, Form, FormModel, Input, Icon,
} from 'ant-design-vue';

Vue
  .use(Icon)
  .use(Button)
  .use(FormModel)
  .use(Input);

export default Vue.extend({
  data() {
    return {
      isLoading: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'blur',
            message: 'Vui lòng nhập e-mail !',
          },
        ],
        password: [
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu !',
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!');
          return true;
        }

        console.log('error submit!!');
        return false;
      });
    },
  },
});
</script>

<style lang="scss" scoped>
  .login-page {
    font-size: 18px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .ant-form-item {
        margin: 0;
      }

      .ant-btn {
        width: -webkit-fill-available;
      }
    }
  }
</style>
