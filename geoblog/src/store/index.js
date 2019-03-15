import Vue from "vue"
import Vuex from "vuex"
import { $fetch } from '../plugins/fetch'
import router from "../router"
import maps from "./maps"


Vue.use(Vuex)

//使用Vuex.Store构造函数创建store
const store = new Vuex.Store({
    strict:true, //使用严格模式，严格模式中状态被异步mutation操作修改时会报错
    state(){
        return {
            user:null,
        }
    },
    mutations:{
        //mutation的函数接受两个参数，第一个是state，第二个是playload
        //不应该在mutation中使用异步函数，例如服务器请求
        user:(state,user) =>{
            state.user = user
        }
    },
    //利用getter让组件取state
    getters:{
        user:state =>state.user,
        userPicture: (state,getters)=> {
            const user = getters.user
            if(user){
                const photos = user.profile.photos;
                if(photos.length !==0){
                    return photos[0].value
                }
            }
        },
    },
    /*
    action的声明由一个类型和一个处理函数构成。这个处理函数不能直接调用，
    而需要分发一个action，类似store.dispath("type",playload)
    action的处理函数接受两个参数
    1.context，提供commit，dispatch，state以及链接到store的getters工具函数
    2.playload，是dispatch分发时带上的参数
    */
    actions:{
      async init ({dispatch}){
          await dispatch ("login")
      },
      async login({commit}){
        try{
            const user = await $fetch("user")
            commit("user",user);
            if(user){
                //重定向到对应的路由，或返回首页
                router.replace(router.currentRoute.params.wantedRoute ||
                    {name:"home"})
            }
        }catch(e){
                console.warn(e)
            }
        },
        logout({commit}){
            commit("user",null)
            $fetch("logout")
            //如果这个路由是私有的，跳到登录界面
            if(router.currentRoute.matched.some(r => r.meta.private)){
                router.replace({name:"login",params:{
                    wantedRoute:router.currentRoute.fullPath
                }})
            }
        }
    },
    modules:{
        maps,
    }
})

export default store;