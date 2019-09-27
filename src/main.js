import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';
import App from './App.vue';
import router from './router';
import store from './store';

import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../public/css/dashboard.css';

Vue.use(BootstrapVue);
Vue.use(Chartkick.use(Chart));

Vue.component('main-layout', MainLayout);
Vue.component('auth-layout', AuthLayout);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
