import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '@/store/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
    meta: {
      title: 'Trang chủ',
      auth: {
        required: true,
      },
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue'),
    meta: {
      title: 'Đăng nhập',
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/Errors/404.vue'),
    meta: {
      title: 'Page not found',
    },
  },
  {
    path: '/403',
    name: 'NotAuthorized',
    component: () => import('../views/Errors/403.vue'),
    meta: {
      title: 'Not authorised',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// handle not-existed routes (not yet declared in the "const routes" above)
router.beforeEach(async (to, from, next) => {
  if (!to.matched.length) {
    next('/404');
  } else {
    document.title = `BVU Dormitory - ${to?.meta?.title ?? ''}`;
    next();
  }
});

// only listed-routes can be go here (the following)
// redirect to login page if not logged in and trying to access a restricted page
router.beforeEach(async (to, from, next) => {
  const currentUser = await store.dispatch('auth/getCurrentUser');
  console.log('currentUser:', currentUser);

  // if the route requires logged-in
  if (to?.meta?.auth && to.meta.auth.required) {
    // if no user is logged-in => goto the login page with a returnUrl
    if (!currentUser) {
      return next({ path: '/login', query: { returnUrl: to.path } });
    }

    // user is logged-in check if the route is restricted by role
    // if (to.meta.auth.roles.length && !to.meta.auth.roles.includes(currentUser.role)) {
    //   // role not authorised so redirect to the 403 page
    //   return next({ path: '/403' });
    // }
  } else if (to.path === '/login' && currentUser) {
    // redirect logged-in user to the admin page
    // console.log('to:', to.path, to.path === '/login');
    return next('/');
  }

  return next();
});

export default router;
