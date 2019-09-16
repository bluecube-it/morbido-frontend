import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import UploadDatasets from './views/UploadDatasets.vue';
import TimeSeriesForecast from './views/TimeSeriesForecast.vue';
import { isTokenExpired } from './utils/utils';

Vue.use(Router);

const jwt = require('jsonwebtoken');

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'auth-layout',
        guest: true,
        requiresAuth: false,
      },
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        requiresAuth: true,
      },
      component: Dashboard,
    },
    {
      path: '/upload-datasets',
      name: 'upload-datasets',
      meta: {
        requiresAuth: true,
      },
      component: UploadDatasets,
    },
    {
      path: '/time-series-forecast',
      name: 'time-series-forecast',
      meta: {
        requiresAuth: true,
      },
      component: TimeSeriesForecast,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const decoded = jwt.decode(localStorage.getItem('jwt'));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath,
        },
      });
    } else if (isTokenExpired(decoded) === true) {
      localStorage.removeItem('jwt');
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath,
        },
      });
    } else {
      // const user = JSON.parse(localStorage.getItem('user'));
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else if (isTokenExpired(decoded) === true) {
      next();
    } else {
      next({
        name: 'dashboard',
      });
    }
  } else {
    next();
  }
});

export default router;
