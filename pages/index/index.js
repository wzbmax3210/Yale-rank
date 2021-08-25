// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '雅乐争霸赛',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    rankData: [],
    matchData: [],
    testData: {
      "rank": [
        {
          "name": "小嘎",
          "rank": -133,
          "lastRank": 12
        },
        {
          "name": "张总",
          "rank": -260,
          "lastRank": 86
        },
        {
          "name": "陈毛",
          "rank": -787,
          "lastRank": 0
        },
        {
          "name": "钟总",
          "rank": -225,
          "lastRank": -68
        },
        {
          "name": "吴董",
          "rank": -98,
          "lastRank": -156
        },
        {
          "name": "小黑",
          "rank": -204,
          "lastRank": -204
        },
        {
          "name": "罗博",
          "rank": -283,
          "lastRank": -299
        },
        {
          "name": "赖总",
          "rank": 0,
          "lastRank": 0
        },
        {
          "name": "直播",
          "rank": 707,
          "lastRank": 114
        }
      ],
      "match": [
        {
          "date": "8/14/2021, 6:33:35 PM",
          "detail": {
            "张总": "86",
            "陈毛": "0",
            "罗博": "-299",
            "直播": "114"
          }
        },
        {
          "date": "8/8/2021, 4:20:06 AM",
          "detail": {
            "小嘎": "12",
            "陈毛": "-128",
            "吴董": "-156",
            "直播": "272"
          }
        },
        {
          "date": "8/8/2021, 12:30:28 AM",
          "detail": {
            "陈毛": "-192",
            "吴董": "-26",
            "小黑": "-204",
            "罗博": "422"
          }
        },
        {
          "date": "8/7/2021, 2:10:14 PM",
          "detail": {
            "小嘎": "208",
            "陈毛": "68",
            "吴董": "-285",
            "直播": "-73"
          }
        },
        {
          "date": "8/1/2021, 1:54:30 AM",
          "detail": {
            "小嘎": "-336",
            "陈毛": "-358",
            "吴董": "-194",
            "直播": "759"
          }
        },
        {
          "date": "7/31/2021, 6:43:36 PM",
          "detail": {
            "小嘎": "-46",
            "陈毛": "-12",
            "钟总": "-9",
            "直播": "20"
          }
        },
        {
          "date": "7/25/2021, 6:10:24 PM",
          "detail": {
            "小嘎": "-15",
            "陈毛": "292",
            "吴董": "-183",
            "直播": "-167"
          }
        },
        {
          "date": "7/24/2021, 7:10:36 PM",
          "detail": {
            "张总": "230",
            "钟总": "-17",
            "罗博": "-90",
            "直播": "-222"
          }
        },
        {
          "date": "7/17/2021, 9:38:19 PM",
          "detail": {
            "直播": -174,
            "小嘎": 450,
            "钟总": -234,
            "罗博": -168
          }
        },
        {
          "date": "7/10/2021, 11:10:27 PM",
          "detail": {
            "直播": -65,
            "吴董": 96,
            "钟总": -22,
            "陈毛": -100
          }
        }
      ]
    }
  },
  methods: {
    titleMapHandle(rankPoint) {
      switch (true) {
        case rankPoint <= -1000:
          return 'fish - 送神';
        case rankPoint <= -600 && rankPoint > -1000:
          return 'fish - 下层';
        case rankPoint <= -300 && rankPoint > -600:
          return 'fish - 口转脚';
        case rankPoint <= -100 && rankPoint > -300:
          return 'fish - 拔根';
        case rankPoint < 100 && rankPoint > -100:
          return '凡人';
        case rankPoint >= 100 && rankPoint < 300:
          return '筑根';
        case rankPoint >= 300 && rankPoint < 600:
          return '心转手';
        case rankPoint >= 600 && rankPoint < 1000:
          return '上层';
        case rankPoint >= 1000:
          return '鬼神';
      }
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    let resultRankData = this.data.testData.rank
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    resultRankData.map(v => {
      v.title = this.methods.titleMapHandle(v.rank)
    })
    this.setData({
      rankData: resultRankData.sort((a, b) => b.rank - a.rank),
      matchData: this.data.testData.match
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
