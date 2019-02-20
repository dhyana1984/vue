//创建应用的主Vue实例
new Vue({
    name:"game",
    el:"#app",
    data:state,
    
    template: `<div id="#app">
                <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />

                <div class="world">
                    <castle v-for="(player,index) in players" 
                    :player="player" 
                    :index = index />
                    <div class="land"/>
                </div>

                <transition name="hand">
                <hand v-if="!activeOverlay" :cards="testHand" @card-play="testPlayCard"  />
                </transition>

                <transition name="zoom">
                    <overlay v-if="activeOverlay" :key="activeOverlay">
                        <component :is="'overlay-content-'+ activeOverlay" 
                        :player="currentPlayer" :opponent="currentOpponent" :players="players"/>
                    </overlay>
                </transition>

            
                <transition name="fade">
                <div class="overlay-background" v-if="activeOverlay" />
                </transition>


            </div>`,
    mounted() {
        //在使用实例属性/方法的时候需要水用$符号，以便与用户自定义的定义的属性区分开来
        // console.log(this.$data ===state)
        // console.log(this.$data.currentPlayerIndex)
    },
    computed: {
        testCard(){
            return cards.archers
        }
    },
    methods: {
        handlePlay(person,action){
            console.log("You played a card"," person:",person," action:",action)
        },
        //模拟抽取5张卡牌
        createTestHand(){
            const cards=[]
            //遍历卡牌的id
            const ids=Object.keys(cards)
            
            //抽取5张卡牌
            for (let i = 0; i < 5; i++) {
                
                //注意这里用this.testDrawCard()
                cards.push(this.testDrawCard())           
            }

            return cards
        },
        //模拟卡牌随机抽取
        testDrawCard(){
            //使用id随机选取一张卡牌
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random()*ids.length)]
            //返回一张新的卡牌
            return{
                //carUid是玩家所抽取卡牌的唯一标识符，用于区分玩家手中的卡牌
                //cardUid来做区分是因为多张卡牌可以有相同意义，所以需要一种区分方法
                uid:cardUid++,
                id:randomId,
                //定义对象
                def:cards[randomId]
            }
        },
        //临时方法，hand组件出牌后回调的主组件的方法
        testPlayCard(card){
            console.log(123)
            //将卡牌从玩家手中移除
            const index = this.testHand.indexOf(card)
            this.testHand.splice(index,1)
        },
        test(){
            console.log(123)
        }

    },
    //初始化hand组件
    created() {
       
        this.testHand = this.createTestHand()
    },

    
})

//窗口大小变化的处理
window.addEventListener("resize",() =>{
    state.worldRatio = getWorldRatio()
})

//Tween.js
requestAnimationFrame(animate);

function animate(time){
    requestAnimationFrame(animate);
    TWEEN.update(time);
}