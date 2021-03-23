<template>
  <div id="app">
    <nprogress-container style="z-index: 99;"></nprogress-container>
    <a-layout>
      <a-layout-header id="header" class="inner-page">
        <img src="./assets/banner-phongdaotao.jpg" alt="" srcset="">
      </a-layout-header>

      <a-layout-content id="content" class="inner-page">
        <router-view/>
      </a-layout-content>

      <a-layout-footer id="footer" class="inner-page">
        Copyright © 2021 Trường Đại Học Bà Rịa Vũng Tàu - Phòng Đào Tạo
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Vue from 'vue';
import NprogressContainer from 'vue-nprogress/src/NprogressContainer.vue';
import NProgress from 'vue-nprogress';

import {
  Button, Calendar, Input, InputNumber, Alert,
  Form, Layout, FormModel, message, notification,
  DatePicker, Table, Divider, Tag,
} from 'ant-design-vue';

Vue.prototype.$message = message;
Vue.use(NProgress, {
  showSpinner: false,
  easing: 'ease',
  speed: 1500,
});

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
  .use(Divider)
  .use(Input)
  .use(InputNumber);

export default Vue.extend({
  components: {
    NprogressContainer,
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.$nprogress.start();
      next();
    });

    this.$router.afterEach(() => {
      this.$nprogress.done();
    });
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: GoogleSans;
  src: url('./assets/fonts/GoogleSans/GoogleSansTTF/GoogleSans-Regular.ttf');
}

#app {
  font-family: GoogleSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .ant-layout {
    min-height: 100vh;
    background: #f8f8f8;
  }

  .inner-page {
    width: 950px;
    margin: auto;

    @media (max-width: 999px) {
      width: 100%;
    }
  }

  #header {
    background: white;
    border: 1px solid rgb(221, 221, 221);
    border-bottom: none;

    // padding: 20px 50px;
    // padding: 0;
    font-weight: bolder;
    font-size: 20px;
    text-align: center;

    height: 147px;
    overflow: hidden;
    // background: url('./assets/banner-phongdaotao.jpg') no-repeat center;
    // background-size: 50% 50%;

    img {
      // background-size: cover;
      margin: 0 auto;
      width: 100%;
    }

    @media (max-width: 880px) {
      height: fit-content;
    }
  }

  #content {
    @media (max-width: 600px) {
      padding: 50px;
    }

    padding: 30px 100px;
    background: #fff;
    border: 1px solid rgb(221, 221, 221);
  }

  #footer {
    background: #004a90;
    color: white;
    text-align: center;

    animation: fadeInUp; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s;
  }
}
</style>
