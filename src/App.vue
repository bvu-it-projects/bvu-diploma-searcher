<template>
  <div id="app">
    <nprogress-container></nprogress-container>

    <a-layout>
      <!-- sidebar -->
      <sidebar />

      <!-- main -->
      <a-layout id="main">
        <a-layout-header id="header" class="inner-page bg-white fixed top-0 right-0 left-0 z-0 shadow">
        </a-layout-header>

        <a-layout-content id="content" class="inner-page p-5">
          <router-view />
        </a-layout-content>
      </a-layout>

    </a-layout>
  </div>
</template>

<script>
import Antd from 'ant-design-vue';
import Vue from 'vue';
import NprogressContainer from 'vue-nprogress/src/NprogressContainer.vue';
import NProgress from 'vue-nprogress';
import Sidebar from './components/layout/sidebar/Sidebar.vue';

Vue.use(Antd);

Vue.use(NProgress, {
  showSpinner: false,
  easing: 'ease',
  speed: 1500,
});

export default {
  components: {
    NprogressContainer,
    Sidebar,
  },
  computed: {
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
  mounted() {
    // listening on #sidebar width changes to adjust corresponding to the #main and #header
    new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(entry);
        // console.log(entry.target.clientWidth);

        document.getElementById('header').style.marginLeft = `${entry.target.clientWidth}px`;
        document.getElementById('main').style.marginLeft = `${entry.target.clientWidth}px`;
      });
    }).observe(document.getElementById('sidebar'));
  },
  methods: {
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: GoogleSans;
  src: url('./assets/fonts/GoogleSans/GoogleSansTTF/GoogleSans-Regular.ttf');
}

#app {
  // font-family: GoogleSans;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .ant-layout {
    min-height: 100vh;
    background: #f8f8f8;

    &-header {
      background: rgba(255, 255, 255, 0.945);
      backdrop-filter: blur(25px) saturate(180%);
    }

    &-content {
      padding-top: 90px;
    }
  }

  .inner-page {
    width: 100%;
    margin: auto;
  }

  ion-icon {
    font-size: 20px;
    --ionicon-stroke-width: 36px;
  }
}
</style>
