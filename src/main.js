import Vue from 'vue';
import NProgress from 'vue-nprogress';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import { initializeFirebaseApp } from './services/firebase/firebase';
import './assets/tailwind.css';

initializeFirebaseApp();

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

const nprogress = new NProgress();
nprogress.configure({
  trickleSpeed: 200,
  showSpinner: false,
  easing: 'ease',
  speed: 640,
});

new Vue({
  nprogress,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
