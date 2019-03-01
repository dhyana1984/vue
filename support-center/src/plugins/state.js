export default{
    install(Vue,state){
        //使用Object.defineProperty在Vue原型上设置了一个getter，所以每个组件都会继承它
        Object.defineProperty(Vue.prototype,"$state",{
            get:() => state
        })
    }
}