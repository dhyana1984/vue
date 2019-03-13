import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "./components/Login.vue"
import GeoBlog from "./components/GeoBlog.vue"
import NotFound from "./components/NotFound.vue"
import store from "./store"

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

/*
beforeEach在路由每次解析之前运行，允许在必要时用另一个路由替换目标路由
参数：
to是目标路由
from是以前的路由
next是为了完成解析不得不在某个时刻调用的函数，如果next不调用将会卡主
*/
router.beforeEach((to, from, next) =>{
    const user = store.getters.user
    //console.log("to",to.name)
    //如果用户没有登录，重定向到login组件
    //matched属性可以访问路由对象列表，然后用some数组方法验证至少有一个路由对象具有所需要的元素
    if(to.matched.some(r => r.meta.private) && !user){
        next({
            name:"login",
            params:{
                //保存用户想要访问的原始页面，当登录后重定向到这个页面
                wantedRoute:to.fullPath
            }
        })
        return  //这里不要掉，否则会执行下面的next
    }
    //检查路由是否仅限于访客浏览，例如Login页面
    if(to.matched.some(r => r.meta.guest) && user){
        next({name:"home"})
        return //不要掉
    }

    next()
})

export default router