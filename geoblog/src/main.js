import 'babel-polyfill'
import store from "./store"
import Vue from "vue"
import App from "./components/App.vue"
import router from "./router"
import {sync} from "vuex-router-sync"
import VueGoogleMaps from "vue-googlemaps"

Vue.use(VueGoogleMaps, {
    load:{
        apiKey:"VvKRu0FvILblEYPM5zXX8ijA",
        libraries:["places"]
    }
})

//vuex-router-sync包将路由集成到store中，它会将当前路由暴露到state(state.route)中，同时在每次路由改变时都提交一个mutation
//可以使用state.route对象获取当前路由信息
sync(store,router)

async function main(){
    await store.dispatch("init")
    new Vue({
        ...App,
        el:"#app",
        router,
        //注入store，所有组件都可以使用$store这个特殊属性访问store了
        store,
    })

}

main();