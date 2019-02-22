// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
  //保存当前的显示浮层名称，如果没有浮层则为null
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  activeOverlay: null,
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


  //根据currentPlayerIndex属性返回player对象
  get currentPlayer () {
    return state.players[state.currentPlayerIndex]
  },
  //返回对手player的索引
  get currentOpponentId () {
    return state.currentPlayerIndex === 0 ? 1 : 0
  },

  //返回相应的player对象
  get currentOpponent () {
    return state.players[state.currentOpponentId]
  },

  //显示当前玩家手牌
  get currentHand () {
    return state.currentPlayer.hand
  },
  //玩家可以抽牌的牌堆，使用card.js的pile对象对其初始化
  //pile的键是卡牌定义的id，值是牌堆中这种类型的卡牌数量
  drawPile: pile,
  //discardPile是弃牌堆，属性与drawPile相同，用处是玩家打出的所有卡牌都将从手牌移除，并且放到这个弃牌堆中
  //如果drawPile空了，将使用discardPile重新填满，然后discardPile就空了
  discardPile: {},
  //禁止作弊，防止玩家在回合中的动画时间重复出牌
  //通过canplay做两件事情，首先，当玩家出牌，检查完架是否已经出过一张牌
  //其次，在css中禁用手牌上鼠标事件
  canPlay: false,
}
