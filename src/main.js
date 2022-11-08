import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


window.swal = require('sweetalert');
window.toastr = require('toastr');
window.moment = require('moment');

Vue.config.productionTip = false;

/*
  * setting up an event bus for component communication in an efficient manner,
  * eliminate Tight coupling as much as possible
  * you can read more about it at my blog:
  * https://www.techalyst.com/posts/vuejs-global-event-bus-and-component-communication-laravel-full-stack-development
 */
Vue.prototype.$eventBus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
