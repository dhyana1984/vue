import AppLayout from "./components/AppLayout.vue"
import Vue from "vue"
import router from './router';
import "./global-components"
import VueFetch from "./plugins/fetch"
import state from "./state"
import VueState from "./plugins/state"


//这里的VueFetch就是fetch.js里面的install方法的Vue
//第二个参数定义的是fetch.js里面的install方法的options
Vue.use(VueFetch,{
  baseUrl:'http://localhost:3000/',
})
//安装VueState插件，将state设置成Vue的属性
Vue.use(VueState,state)
new Vue({
  el: '#app',
  data: state,
  render: h => h(AppLayout),
  router,
 
})
