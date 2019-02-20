// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  // World
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

}
