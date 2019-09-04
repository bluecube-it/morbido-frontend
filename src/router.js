import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import UploadDatasets from './views/UploadDatasets.vue';

Vue.use(Router);

export default new Router({
  routes: [
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
  ],
});
