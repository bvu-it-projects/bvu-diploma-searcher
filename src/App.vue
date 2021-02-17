<template>
  <div id="app">
    <nprogress-container style="z-index: 99;"></nprogress-container>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import NprogressContainer from 'vue-nprogress/src/NprogressContainer.vue';
import NProgress from 'vue-nprogress';

Vue.use(NProgress, {
  showSpinner: false,
  easing: 'ease',
  speed: 1500,
});

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
}

</style>
