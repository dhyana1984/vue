import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

export const Users = modelFactory(collectionFactory('users', idIndex))
export const Tickets = modelFactory(collectionFactory('tickets', idIndex))
export const Questions = modelFactory(collectionFactory('questions', idIndex))

// Init
export async function initData () {
  // FAQ
  Questions.remove({}, {}, true)
  Questions.insert([
    {
      title: '这个网站是用来做什么的？',
      content: `这是我的Chris Xiong的个人网站，本来用来放小朋友随机计算题生成器，现在也会用来放一些自己开发的Web程序Demo，包括此帮助中心。`,
    },
    {
      title: '我在哪里可以看到网站的所有内容？',
      content: `目前我还没有时间做一个大的内容目录，所以想体验其他内容请参考以下地址（除此帮助中心，其他内容不用注册）：
                <p>小朋友刷题器：http://weegeek.club/kidexercise/</p>
                <p>一个基于Vue的卡牌游戏Demo：http://www.weegeek.club/castleduel</p>
                <p>一个基于angular的在线商店Demo：http://www.weegeek.club/angularsportsstore</p>
                更多内容尽情关注
                `,
    },
    {
      title: '我在这里可以做什么？',
      content: `无论是你有任何问题或者建议或者遇到了任何bug，请在这里提交你的问题，我看到后会处理。请点击【需要帮助】-》如果未注册请先注册=》登录=》点击【新的问题】=》填写简短描述和问题细节=》点提交
                然后在【查看所有】页面可以看到自己提交的问题。`,
    },
    {
      title: '为什么访问速度有时候有点慢？',
      content: '因为我用的新加坡的AWS云，所以可能有些地方网络连接状态不太好，不过即便是稍慢也不太影响使用。',
    },
    {
      title: '为什么这里需要登录?',
      content: 'Inventore iste reprehenderit aut reiciendis repellendus. Quas cumque aliquam accusantium et itaque quisquam voluptatem. Commodi quo quia occaecati dicta ratione qui at tempore. At saepe est et saepe accusamus voluptates.',
    },
  ])
}
