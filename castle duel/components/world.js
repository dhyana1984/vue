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
                .to({value:newValue},500)                   //结束值
                .onUpdate(function() {                        //回调函数
                    //在onUpdate回调方法中，这里的this上下文是Tween对象而不是Vue组件实例
                    //所以需要用const vm = this保存实例
                    vm.height=this.value.toFixed(0)
                }).start()                               
        }
    },
})

/* 云朵*/

//云朵动画的最小和最大持续时间
const cloudAnimationDurations = {
    min:10000, //10秒
    max:50000, //5秒
}

//有5种不同的云，所以  props:["type"]的范围是1-5
Vue.component("cloud",{
    template:   `<div class="cloud" :class="'cloud-' + type" :style = "style">
                    <img :src="'svg/cloud' +type +'.svg'" @load="initPosition"/>
                </div>`,
    props:["type"],
    data(){
        return {
            //通过修改响应式的style数据属性来修改组建中的z-index和transform css属性
            style:{
                transform: "none",
                zIndex:0,
            }
        }
    },
    methods: {
        //利用transform css属性设置cloud组件的位置
        setPosition(left, top){
            //使用transform可以获得更好的性能
            this.style.transform = `translate(${left}px,${top}px)`
        },
        //当图片加载时。需要初始化云朵的水平位置，使其在可见范围之外
        initPosition(){
            //元素宽度
            const width = this.$el.clientWidth
            this.setPosition(-width,0)
        },
        //计算随机的动画持续时间，并接受一个delay参数
        startAnimation(delay=0){
            const vm = this
            //元素宽度
            const width = this.$el.clientWidth

            //随机动画持续时间
            const {min,max} = cloudAnimationDurations
            const animationDuration= Math.random() *(max - min)+ min
            //将速度快的云朵放到最前面
            //移动越快，云朵动画持续时间越短，通过z-index属性将移动过快的云朵显示在前面
            this.style.zIndex = Math.round(max - animationDuration)

            //计算出云朵的随机垂直位置，然后用Tween在一定延迟之后，通过每次更新时设置云朵的位置，对云朵做水平移动动画处理
            //完成时，将在随机延迟后启动另外一个动画
            //随机位置
            const top = Math.random()* (window.innerHeight*0.3)
            new TWEEN.Tween({value: - width})
                .to({value:window.innerWidth}, animationDuration)
                .delay(delay)
                .onUpdate(function(){
                    vm.setPosition(this.value,top)
                })
                .onComplete(() =>{
                    //随机延时
                    this.startAnimation(Math.random()*10000)
                })
                .start()
        }
    },
    mounted() {
        //以负值延迟开始动画
        //所以动画将从中途开始
        this.startAnimation(-Math.random() * cloudAnimationDurations.min )
    },
})