import 'babel-polyfill'
import store from "./store"
import Vue from "vue"
import App from "./components/App.vue"
import router from "./router"

new Vue({
    ...App,
    el:"#app",
    router,
    //注入store，所有组件都可以使用$store这个特殊属性访问store了
    store,
})

