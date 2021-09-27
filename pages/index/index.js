// index.js
const util = require('../../utils/util.js')
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
    matchData: []
  },
  methods: {
    titleMapHandle(rankPoint) {
      switch (true) {
        case rankPoint <= -1000:
          return 'fish - 财神';
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
      url: '../update/update'
    })
  },
  onShow() {
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('rank')
      .field({
        _id: false,
        name: true,
        rank: true,
        lastRank: true
      })
      .orderBy('rank', 'desc')
      .get()
      .then(res => {
        let resultRankData = res.data
        resultRankData.map(v => {
          v.title = this.methods.titleMapHandle(v.rank)
        })

        this.setData({
          rankData: resultRankData,
        })
      })

    db.collection('match')
      .orderBy('date', 'desc')
      .get()
      .then(res => {
        this.setData({
          matchData: res.data.map(v => {
            v.date = util.formatTime(v.date)
            return v
          })
        })
      })

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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
