import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import UploadDatasets from './views/UploadDatasets.vue';
import TimeSeriesForecast from './views/TimeSeriesForecast.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'auth-layout' },
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/upload-datasets',
      name: 'upload-datasets',
      component: UploadDatasets,
    },
    {
      path: '/time-series-forecast',
      name: 'time-series-forecast',
      component: TimeSeriesForecast,
    },
  ],
});
