//最上面对阵双方信息以及回合信息组件
Vue.component("top-bar",{
    
    //props是从父组件传递而来
    props:["players","currentPlayerIndex","turn"],
    template:   `<div class="top-bar" :class="'player-' + currentPlayerIndex">
                    <div class="player p0">{{players[0].name}}</div>
                    <div class="turn-counter">
                        <img class="arrow" src="svg/turn.svg"/>
                        <div class="turn">
                            回合{{turn}}
                        </div>
                    </div>
                    <div class="player p1">
                        {{players[1].name}}
                    </div>
                </div>`,
    
    created() {
        //调用props的对象
        console.log(this.players)
    },
})
//定义卡片组件
Vue.component("card",{
    
    props:["def"],
    //:class="'type-'+def.type"根据卡片不同应用不同的样式
    template:   `<div class="card" :class="'type-'+def.type" @clicl="test">
                    <div class="title">
                        {{def.title}}
                    </div>
                    <img class="separator" src="svg/card-separator.svg"/>
                    <div class="description">
                        <div v-html="def.description"></div>  
                    </div>
                    <div class="note" v-if="def.note">
                        <div v-html="def.note"></div>
                    </div>
                </div>`,
    methods: {
        //card组件点击后执行的方法，向hand父组件发送play事件
        play(){
            console.log(123)
            this.$emit("play")
        },
        test(){
            console.log(123)
        }
    },
})

//手牌组件
Vue.component("hand",{
    template:   `<div class="hand">
                    <div class="wrapper">
                        <transition-group  name="card" tag="div" class="cards">
                            <card :key="card.uid"   v-for="card of cards" :def="card.def" @play="handlePlay(card)"/>
                        </transition-group>
                    </div>
                </div>`,
    props: ["cards"],
    methods: {
        //card组件点击后，回调的hand组件的方法，向main组件发送card-play事件，并且带card参数
        handlePlay(card){
            
            //向父组件发送card-play事件
            this.$emit("card-play",card)
        },
    },
})

Vue.component("overlay",{
    template: `<div class="overlay" @click="handleClick">
                    <div class="content">        
                        <!--这里是插槽-->
                        <slot/>
                    </div>
                </div>`,
    methods: {
        //这个事件帮助在回合开始时知晓何时从一个浮层切换到下一个
        handleClick(){
            this.$emit("close")
        }
    },
})