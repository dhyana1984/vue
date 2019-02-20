//用来显示两个玩家的城堡的图片
Vue.component("castle",{
    template:   `<div class="castle" :class="'player-' + index">
                    <img class="building" :src="'svg/castle' + index+'.svg'"/>
                    <img class="ground" :src="'svg/ground' + index+'.svg'"/>
                    <castle-banners :player="player" />
                </div>`,
    props:["player","index"]
})

Vue.component("castle-banners",{
    template:   `<div class="banners">
                    <!--食物-->
                    <img class="food-icon" src="svg/food-icon.svg" />
                    <bubble type="food" :value="player.food" :ratio="foodRatio" />
                    <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

                    
                    <!--生命值-->
                    <img class="health-icon" src="svg/health-icon.svg" />
                    <bubble type="health" :value="player.health" :ratio="healthRatio" />
                    <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />

                </div>`,
    props: ["player"],
    computed: {
        //计算食物点数
        foodRatio(){
            //maxFood在state.js定义
            return this.player.food/ maxFood
        },
        //计算生命值点数
        healthRatio(){
            //maxHealth在state.js定义
            return this.player.health/ maxHealth
        }
    },
})

//生命和食物值的气泡，根据type区food-bubble或者health-bubble
//依赖于计算属性bubbleStyle来决定气泡位置
Vue.component("bubble",{
    template:   `<div class="stat-bubble" :class="type+ '-bubble'" :style="bubbleStyle">
                    <img :src="'svg/'+type +'-bubble.svg'" />
                    <div class="counter">{{value}}</div>
                </div>`,
    props:["type","value","ratio"],
    computed: {
        bubbleStyle(){
            return {
                top:(this.rario*200+40) * state.worldRatio+"px"
            }
        }
    },
})

Vue.component("banner-bar",{
    template:"#banner",
    props:["color","ratio"],
    computed: {
        targetHeight(){
            return 220 * this.ratio + 40
        }
    },
    data(){
        return {
            height:0
        }
    },
    created() {
        this.height=this.targetHeight
    },
    watch: {
        targetHeight(newValue,oldValue){
            //TWEEN库的工作原理是创建一个Tween对象，并给该对象一个起始值，一个缓动函数， 一个结束值
            //还提供回调方法onUpdate
            //由于onUpdate回调函数中this是Tween对象而不是Vue组件实例，所以这里保存实例到vm
            const vm = this  
            new TWEEN.Tween({value:oldValue})           //起始值
                .easing(TWEEN.Easing.Cubic.InOut)       //缓动函数
                .to({value:newValue})                   //结束值
                .onUpdate(() =>{                        //回调函数
                    //在onUpdate回调方法中，这里的this上下文是Tween对象而不是Vue组件实例
                    //所以需要用const vm = this保存实例
                    vm.height=this.value.toFixed(0)
                }).start()                               
        }
    },
})