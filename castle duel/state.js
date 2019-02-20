// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  //每个位置乘以worldRatio，界面才会考虑浏览器窗口的缩放尺寸
  worldRatio: getWorldRatio(),
  
  //游戏
  turn: 1,
  players:[
    {
      name:"Chris Xiong",
      food:10,
      health:10,
      //是否跳过下个回合
      skipTurn:false,
      //跳过了上个回合
      skipppedTurn:false,
      hand:[],
      lastPlayedCardId:null,
      dead:false
    },
    {
      name:"Jack Wang",
      food:10,
      health:10,
      //是否跳过下个回合
      skipTurn:false,
      //跳过了上个回合
      skipppedTurn:false,
      hand:[],
      lastPlayedCardId:null,
      dead:false
    }
  ],
  //Math.round() 方法可把一个数字舍入为最接近的整数
  //Math.random()可返回介于 0 ~ 1 之间的一个随机数。
  //使用随机的0或者1来决定谁先行动
  currentPlayerIndex:Math.round(Math.random()),
  testHand:[],
  //保存当前的显示浮层名称，如果没有浮层则为null
  activeOverlay:null,

  //根据currentPlayerIndex属性返回player对象
  get currentPlayer(){
    return state.players[state.currentPlayerIndex]
  },

  //返回对手player的索引
  get currentOpponentId(){
    return state.currentPlayerIndex ===0?1:0
  },

  //返回相应的player对象
  get currentOpponent(){
    return state.players[state.currentOpponentId]
  }
}
