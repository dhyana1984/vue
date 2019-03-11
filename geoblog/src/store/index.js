import Vue from "vue"
import Vuex from "vuex"

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
        userPicture: ()=> null,
    },
    /*
    action的声明由一个类型和一个处理函数构成。这个处理函数不能直接调用，
    而需要分发一个action，类似store.dispath("type",playload)
    action的处理函数接受两个参数
    1.context，提供commit，dispatch，state以及链接到store的getters工具函数
    2.playload，是dispatch分发时带上的参数
    */
    actions:{
        login({commit}){
            const userData = {
                profile:{
                    displayName:"Mr Cat",
                },
            };
            commit("user",userData);
        },
        logout({commit}){
            commit("user",null)
        }
    }
})

export default store;