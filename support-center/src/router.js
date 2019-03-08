import Vue from 'vue';
import VueRouter from 'vue-router';
import FAQ from "./components/FAQ.vue"
import Home from "./components/Home.vue"
import Login from "./components/Login.vue"
import TicketLayout from "./components/TicketLayout.vue"
import state from './state'
import Tickets from "./components/Tickets.vue"
import NewTicket from "./components/NewTicket.vue"
import Ticket from "./components/Ticket.vue"
import NotFound from "./components/NotFound.vue"

//将VueRouter插件安装到Vue中
Vue.use(VueRouter)

//创建路由信息
const routes=[
    //路由放这里
    {path:"/SupportCenter", name:"home", component:Home},
    {path:"/SupportCenter/FAQ",name:"faq",component:FAQ},
    {
        path:"/SupportCenter/Login",name:"login",component:Login,
        meta:{guest : true} //标记为访客路由，登录过的用户不能访问Login页面
    },
    {
        path:"/SupportCenter/Tickets",component:TicketLayout,
        meta:{ private:true}, //设置路由为私有，必须登录才能访问，可以将任何信息放入meta以扩展路由功能
        //子路由
        children:[
            //默认子路由，父路由的path会转移给默认子路由
            {path:"",name:"tickets",component:Tickets},
            {path:"New",name:"new-ticket",component:NewTicket},
            //props:true用props属性将所有路由参数作为props传给Ticket组件
            {path:":id",name:"ticket",component:Ticket,props:true},
          
        ]
    },
    {path:"*", component:NotFound}
]

//创建路由对象
const router= new VueRouter({
    routes,
    mode:"history",//路由模式默认是hash即带#，还有history和abstract
    //在history模式下，scrollBehavior可以保存用户跳转路由之前鼠标滚动的位置
    //to是目标路由对象，from是之前的路由对象
    //savedPosition是浏览器历史记录中每个条目自动保存的滚动位置
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
    console.log("to",to.name)
    //如果用户没有登录，重定向到login组件
    //matched属性可以访问路由对象列表，然后用some数组方法验证至少有一个路由对象具有所需要的元素
    if(to.matched.some(r => r.meta.private) && !state.user){
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
    if(to.matched.some(r => r.meta.guest) && state.user){
        next({name:"home"})
        return //不要掉
    }

    next()
})

export default router;