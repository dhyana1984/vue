import AppLayout from "./components/AppLayout.vue"
import Vue from "vue"
import router from './router';
import "./global-components"
import state from "./state"
import VueState from "./plugins/state"
import VueFetch,{$fetch} from "./plugins/fetch"
import './global-components'
import * as filters from "./filters"

//循环注册所有filter
for(const key in filters){
  Vue.filter(key, filters[key])
}

//这里的VueFetch就是fetch.js里面的install方法的Vue
//第二个参数定义的是fetch.js里面的install方法的options
Vue.use(VueFetch,{
  baseUrl:'http://localhost:3000/',
})
//安装VueState插件，将state设置成Vue的属性
Vue.use(VueState,state)



async function main() {
  //获取用户信息
  //页面启动或者加载时需要检查用户是否已经登录，所以刷新后仍然是登录状态
  try{
    //如果调用了/logout，再调用/user就会返回null，否则返回userinfo
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