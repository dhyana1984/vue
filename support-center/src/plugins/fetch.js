//自定义插件

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

export async function $fetch (url){
    const response = await fetch("http://localhost:3000/questions")
    if(response.ok){
        const data= await response.json();
        return data;
    }else{
       const error = new Error("error");
       throw error
    }
}