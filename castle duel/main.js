//创建应用的主Vue实例
new Vue({
    name:"game",
    el:"#app",
    data:state,
    //由于html不区分大小写，所以prop的名字currentPlayIndex用短横线命名
    template:   `<div class="#app">
                    <top-bar 
                    :turn="turn" 
                    :current-Player-Index="currentPlayIndex"
                    :players="players"/>
                </div>`,
    mounted() {
        //在使用实例属性/方法的时候需要水用$符号，以便与用户自定义的定义的属性区分开来
        console.log(this.data ===state)
    },
    
})

//窗口大小变化的处理
window.addEventListener("resize",() =>{
    state.worldRatio = getWorldRatio()
})