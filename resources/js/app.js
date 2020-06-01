
require('./bootstrap');

window.Vue = require('vue');
window.axios=require('axios');
window.VueCookie = require('vue-cookie');
// window.Vue.use(VueRouter);
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex';
import VueSimpleAlert from "vue-simple-alert";
import VueRouter from 'vue-router';
import {store} from './store/index';
import {routes} from './routes'
import MainApp from './components/MainApp.vue'
import Header from './components/Header.vue'
import VuePromptpayQr from 'vue-promptpay-qr'
import pdf from 'vue-pdf'

// if (inBrowser && window.Vue) {
//   window.Vue.use(VueRouter);
// }

Vue.use(VueSimpleAlert);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VuePromptpayQr)

const router = new VueRouter({
  routes,
  mode: 'history'
});



// Vue.component('mainpage', require('./components/mainpage.vue').default);
// Vue.component('login', require('./components/auth/login.vue').default);
// Vue.component('login-img', require('./components/auth/login-img.vue').default);




const app = new Vue({
    el: '#app',
      store,
      router,
      components:{
        MainApp,
        Header,
        pdf
      }

});
