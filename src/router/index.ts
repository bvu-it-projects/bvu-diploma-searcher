import store from '@/store';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      authorize: [],
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      authorize: [],
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      authorize: [],
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: {
      authorize: [
        'super-admin',
      ],
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
  },
  {
    path: '/403',
    name: 'NotAuthorized',
    component: () => import('../views/403.vue'),
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
    next();
    store.commit('sidebar/changeRoute', to.path);
  }
});

// only listed-routes can be go here (the following)
// redirect to login page if not logged in and trying to access a restricted page
router.beforeEach(async (to, from, next) => {
  const currentUser = await store.dispatch('auth/getCurrentUser');
  // console.log('currentUser:', currentUser);

  if (to.meta.authorize) {
    if (!currentUser) {
      return next({ path: '/login', query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    /*  if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to 403 page
      return next({ path: '/403' });
    } */
  } else if (to.path === '/login' && currentUser) { // redirect logged-in user to the index page
    // console.log('to:', to.path, to.path === '/login');
    return next('/');
  }

  const returnUrl = to.query.returnUrl ?? '/';
  store.commit('auth/updateReturnUrl', returnUrl);

  return next(/*  returnUrl as string */);
});

export default router;
