import Vue from 'vue';
import NProgress from 'vue-nprogress';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import { initializeFirebaseApp } from './services/firebase/firebase';

initializeFirebaseApp();
Vue.config.productionTip = false;
const nprogress = new NProgress();

new Vue({
  nprogress,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
