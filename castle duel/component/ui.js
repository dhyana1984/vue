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
    template:   `<div class="card" :class="'type-'+def.type" @click="play">
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
        play(){
            this.$emit("play","girl","sex")
        }
    },
})

//手牌组件
Vue.component("hand",{
    template:   `<div class="hand">
                    <div class="wrapper">
                        <card v-for="card of cards" :def="card.def"/>
                    </div>
                </div>`,
    props: ["cards"]
})