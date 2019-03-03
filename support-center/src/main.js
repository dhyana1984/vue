import AppLayout from "./components/AppLayout.vue"
import Vue from "vue"
import router from './router';
import "./global-components"
import state from "./state"
import VueState from "./plugins/state"
import VueFetch,{$fetch} from "./plugins/fetch"
import './global-components'

//这里的VueFetch就是fetch.js里面的install方法的Vue
//第二个参数定义的是fetch.js里面的install方法的options
Vue.use(VueFetch,{
  baseUrl:'http://localhost:3000/',
})
//安装VueState插件，将state设置成Vue的属性
Vue.use(VueState,state)



async function main() {
  //获取用户信息
  try{
    state.user = await $fetch("user")
  }catch(e){
    console.warn(e)
  }
  //启动应用
  new Vue({
    el: '#app',
    data: state,
    render: h => h(AppLayout),
    router,
   
  })
}

main();