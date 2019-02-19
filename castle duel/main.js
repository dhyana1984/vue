//创建应用的主Vue实例
new Vue({
    name:"game",
    el:"#app",
    data:state,
    //由于html不区分大小写，所以prop的名字currentPlayIndex用短横线命名
    template:   `<div class="#app">
                    <top-bar 
                    :turn="turn" 
                    :currentPlayerIndex="currentPlayerIndex"
                    :players="players"/>

               

                    <hand :cards="testHand"/>
                </div>`,
    mounted() {
        //在使用实例属性/方法的时候需要水用$符号，以便与用户自定义的定义的属性区分开来
        console.log(this.$data ===state)
        console.log(this.$data.currentPlayerIndex)
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

    },
    //初始化hand组件
    created() {
       
        this.testHand = this.createTestHand()
    },

    
})

//窗口大小变化的处理
// window.addEventListener("resize",() =>{
//     state.worldRatio = getWorldRatio()
// })