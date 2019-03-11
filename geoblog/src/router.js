import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "./components/Login.vue"
import GeoBlog from "./components/GeoBlog.vue"
import NotFound from "./components/NotFound.vue"

//将VueRouter插件安装到Vue中
Vue.use(VueRouter)

//创建路由信息。注意这里的routes不能错，一定要用routes变量名
const routes = [
    {path:"/", name:"home",component:GeoBlog, meta:{private:true}},
    {path:"/login", name:"login",component:Login},
    {path:"*",component:NotFound},
]


//创建路由对象
const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior(to,from,savedPosition){

        //如果有滚动位置，恢复到这个滚动位置
        if(savedPosition){
            return savedPosition
        }
        //检查路由是否有模仿浏览器行为的散列值
        if(to.hash){
            return {selector:to.hash}
        }
        //还可以用return {selector:"h1"}这样的形式
        return {x:0,y:0}
    }
})

//TODO 导航守卫

export default router