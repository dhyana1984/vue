import Vue from 'vue';
import VueRouter from 'vue-router';
import FAQ from "./components/FAQ.vue"
import Home from "./components/Home.vue"

//将VueRouter插件安装到Vue中
Vue.use(VueRouter)

//创建路由信息
const routes=[
    //理由放这里
    {path:"/", name:"home", component:Home},
    {path:"/faq",name:"faq",component:FAQ},
]

//创建路由对象
const router= new VueRouter({
    routes,
    mode:"history",//路由模式默认是hash即带#，还有history和abstract
})

export default router;