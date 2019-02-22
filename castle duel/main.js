//创建应用的主Vue实例
new Vue({
    name:"game",
    el:"#app",
    data:state,
    
    template: `<div id="#app" :class="cssClass">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
  
    <div class="world">
      <castle v-for="(player, index) in players" :player="player" :index="index" />
      <div class="land" />
      <div class="clouds">
        <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
      </div>
    </div>
 
    <transition name="hand">
      <hand v-if="!activeOverlay" :cards="currentHand" @card-play="handlePlayCard" @card-leave-end="handleCardLeaveEnd" />
    </transition>


    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay" />
    </transition>

    <transition name="zoom">
      <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
        <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" :opponent="currentOpponent" :players="players" />
      </overlay>
    </transition>
  </div>`,
    mounted() {
        //在使用实例属性/方法的时候需要水用$符号，以便与用户自定义的定义的属性区分开来
        // console.log(this.$data ===state)
        // console.log(this.$data.currentPlayerIndex)
        beginGame();
    },
    computed: {
        //控制是否能作弊
        cssClass(){
            return {
                "can-play":this.canPlay
            }
        },

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
        handlePlayCard(card){
            playCard(card)
        },
        //卡牌被打出
        handleCardLeaveEnd(){
            appplyCard()
        },

        handleOverlayClose(){
            overlayCloseHandlers[this.activeOverlay]()
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
var overlayCloseHandlers = {
    'player-turn' () {
        //在第一回合对手没有出牌，所以只有在是第二回合以后才切换到last-play浮层
      if (state.turn > 1) {
        state.activeOverlay = 'last-play'
      } else {
        newTurn()
      }
    },
  
    'last-play' () {
      newTurn()
    },
  
    'game-over' () {
      document.location.reload()
    },
  }
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
state.activeOverlay = 'player-turn'
function beginGame(){
    
    state.players.forEach(drawInitialHand)
}

function playCard(card){
    if(state.canPlay){
        state.canPlay=false
        currentPlayingCard = card

        //将卡牌从玩家手牌中移除
        const index = state.currentPlayer.hand.indexOf(card)
        state.currentPlayer.hand.splice(index,1)

        //将卡牌放到弃牌堆
        addCardToPile(state.discardPile,card.id)
    }
}

function appplyCard(){
    const card = currentPlayingCard
    applyCardEffect(card)

    setTimeout(()=>{
        //检查玩家是否死亡
        state.players.forEach(checkPlayerLost)

        if(isOnePlayerDead()){
            endGame()
        }else{
            nextTurn()
        }
    }, 700)
}

//下一回合
function nextTurn(){
    state.turn++;
    state.currentPlayerIndex = state.currentOpponentId
    state.activeOverlay="player-turn"
}

//利用newTurn函数隐藏已经显示的浮层界面，根据卡牌效果跳过当前玩家的回合，或者开始新回合
function newTurn(){
    state.activeOverlay=null
    if(state.currentPlayer.skipTurn){
        skipTurn()
    }else{
        startTurn()
    }
}
//直接进入下一回合
function skipTurn(){
    state.currentPlayer.skipppedTurn=true
    state.currentPlayer.skipTurn = false
    nextTurn()
}


function startTurn(){
    state.currentPlayer.skipppedTurn = false
    //如果两名玩家都已经玩过一个回合
    if(state.turn>2){
        //抽一张新的卡牌
        setTimeout(() =>{
            state.currentPlayer.hand.push(drawCard())
            state.canPlay=true
        }, 800)
    }else{
        state.canPlay = true
    }
} 
//如果玩家死亡，会显示game over浮层
function endGame(){
    state.activeOverlay = "game-over"
}