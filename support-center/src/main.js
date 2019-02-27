import AppLayout from "./components/AppLayout.vue"
import Vue from "vue"
import router from './router';
import "./global-components"

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router,
 
})
