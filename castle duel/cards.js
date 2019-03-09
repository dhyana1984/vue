let cards = [
  {
    id: 'pikemen',
    type: 'attack',
    title: '枪兵',
    description: '消耗 1<b>Food</b><br>效果 1 <b>Damage</b>',
    note: '一把长枪插到你服气。',
    play (player, opponent) {
      player.food -= 1
      opponent.health -= 1
    },
  },
  {
    id: 'catapult',
    type: 'attack',
    title: '石弩',
    description: '消耗 2 <b>Food</b><br>效果 2 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 2
      opponent.health -= 2
    },
  },
  {
    id: 'trebuchet',
    type: 'attack',
    title: '投石机',
    description: '消耗 3 <b>Food</b><br>Take 1 <b>Damage</b><br>效果 4 <b>Damage</b>',
    note: ' &#171;史上最秀机械武器!&#187;',
    play (player, opponent) {
      player.food -= 3
      player.health -= 1
      opponent.health -= 4
    },
  },
  {
    id: 'archers',
    type: 'attack',
    title: '弓箭手',
    description: '消耗 3 <b>Food</b><br>效果 3 <b>Damage</b>',
    note: '&#171;拉弓~~~射！！！&#187;',
    play (player, opponent) {
      player.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'knighthood',
    type: 'attack',
    title: '骑士',
    description: '消耗 7 <b>Food</b><br>效果 5 <b>Damage</b>',
    note: '骄傲是骑士最强大的力量。',
    play (player, opponent) {
      player.food -= 7
      opponent.health -= 5
    },
  },
  {
    id: 'repair',
    type: 'support',
    title: '修理',
    description: '回复 5 <b>Damage</b><br>跳过下一轮',
    play (player, opponent) {
      player.skipTurn = true
      player.health += 5
    }
  },
  {
    id: 'quick-repair',
    type: 'support',
    title: '快速修理工',
    description: '消耗 3 <b>Food</b><br>回复 3 <b>Damage</b>',
    note: '钉锤在手，加血我有!',
    play (player, opponent) {
      player.food -= 3
      player.health += 3
    }
  },
  {
    id: 'farm',
    type: 'support',
    title: '农民',
    description: '回复 5 <b>Food</b><br>跳过下一轮',
    note: '&#171;打仗事小，种田事大。&#187;',
    play (player, opponent) {
      player.skipTurn = true
      player.food += 5
    },
  },
  {
    id: 'granary',
    type: 'support',
    title: '粮食',
    description: '回复 2 <b>Food</b>',
    play (player, opponent) {
      player.food += 2
    }
  },
  {
    id: 'poison',
    type: 'special',
    title: '毒药',
    description: '消耗 1 <b>Food</b><br>对方消耗 3 <b>Food</b>',
    note: '这屎里有。。。有毒。。。',
    play (player, opponent) {
      player.food -= 1
      opponent.food -= 3
    },
  },
  {
    id: 'fireball',
    type: 'special',
    title: '火球',
    description: '己方承受 3 <b>Damage</b><br>效果 5 <b>Damage</b><br>跳过本轮',
    note: '&#171;燃烧吧，小宇宙。&#187;',
    play (player, opponent) {
      player.health -= 3
      player.skipTurn = true
      opponent.health -= 5
    },
  },
  {
    id: 'chapel',
    type: 'special',
    title: '神庙',
    description: '发呆ing。。。',
    note: '太累了，休息下',
    play (player, opponent) {
      // Nothing happens...
    },
  },
  {
    id: 'curse',
    type: 'special',
    title: '诅咒',
    description: '所有人:<br>消耗 3 <b>Food</b><br>承受 3 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 3
      player.health -= 3
      opponent.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'miracle',
    type: 'special',
    title: '神迹',
    description: '所有人:<br>回复 3 <b>Food</b><br>回复 3 <b>Damage</b>',
    play (player, opponent) {
      player.food += 3
      player.health += 3
      opponent.food += 3
      opponent.health += 3
    },
  },
]

cards = cards.reduce((map, card) => {
  card.description = card.description.replace(/\d+\s+<b>.*?<\/b>/gi, '<span class="effect">$&</span>')
  card.description = card.description.replace(/<b>(.*?)<\/b>/gi, (match, p1) => {
    const id = p1.toLowerCase()
    return `<b class="keyword ${id}">${p1} <img src="svg/${id}.svg"/></b>`
  })
  map[card.id] = card
  return map
}, {})

let pile = {
  pikemen: 4,
  catapult: 4,
  trebuchet: 3,
  archers: 3,
  knighthood: 3,
  'quick-repair': 4,
  granary: 4,
  repair: 3,
  farm: 3,
  poison: 2,
  fireball: 2,
  chapel: 2,
  curse: 1,
  miracle: 1,
}
