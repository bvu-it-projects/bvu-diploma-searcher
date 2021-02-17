<template>
  <div id="app">
    <nprogress-container style="z-index: 99;"></nprogress-container>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
