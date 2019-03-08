//自定义数据发送插件
import router from "../router"

let baseUrl
export default{

    //Vue参数是Vue构造函数
    //options是可选参数
    //通过修改构造函数为框架添加新特性
    install (Vue,options){
        
        baseUrl = options.baseUrl
        //添加$fetch到Vue原型，以便在所有组件中可用
        Vue.prototype.$fetch = $fetch
    }
}

//option参数是浏览器fetch方法的一个可选对象，它允许我们更改不同的参数，例如所选用的HTTP方法，请求主体等
export async function $fetch (url,options){
    /*
       告诉服务器将始终在请求主体中发送Json，并告诉浏览器还将包含验证令牌 
    */
    const finalOptions = Object.assign({},{
        headers:{
            "Content-Type":"application/json",

        },
        credentials:"include",
    }, options)
    const response = await fetch("http://localhost:3000/"+url,finalOptions)
    if(response.ok){
        const data= await response.json();
        return data;
    }else if(response.status===403){
        //如果会话不再有效，登出
        //TODO
        
        //如果该路由是私有的，跳到登录页面
        if(router.currentRoute.matched.some(r => r.meta.private)){
            router.replace({name:"login",params:{
                //重新登录后跳到登出前的页面
                wantedRoute: router.currentRoute.fullPath
            }})
        }
    }else{
        const message = await response.text()
        const error = new Error(message);
        error.response=response
        throw error
    }
}