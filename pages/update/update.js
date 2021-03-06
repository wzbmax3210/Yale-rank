// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    nameResult: [],
    rankMap: {},
    nameMap: {}
  },
  onLoad() {
    const db = wx.cloud.database()
    db.collection('rank' + new Date().getFullYear())
      .get()
      .then(res => {
        var tmpRankMap = {}
        var tmpNameMap = {}
        res.data.map(v => {
          tmpRankMap[v._id] = v.rank
          tmpNameMap[v._id] = v.name
        })
        this.setData({
          nameResult: res.data,
          rankMap: tmpRankMap,
          nameMap: tmpNameMap
        })
      })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var submitObj = e.detail.value
    var matchDetail = {}
    var place = ''
    for (var id in submitObj) {
      if (submitObj.hasOwnProperty(id) && id !== 'place') {
        var tmpRank = parseInt(submitObj[id])
        if (!isNaN(tmpRank)) {
          matchDetail[this.data.nameMap[id]] = tmpRank
          const db = wx.cloud.database()
          const _ = db.command
          db.collection('rank' + new Date().getFullYear()).doc(id)
            .update({
              data: {
                lastRank: tmpRank,
                rank: this.data.rankMap[id] + tmpRank
              }
            })
        }
      } else if (id === 'place' && submitObj[id]) {
        place = submitObj[id]
      }
    }
    if (JSON.stringify(matchDetail) !== '{}') {
      if (place === '') {
        wx.showToast({
          title: '战地不能为空',
          icon: 'none',
          duration: 2000
        })
      } else {
        const db = wx.cloud.database()
        db.collection('match').add({
          data: {
            date: new Date(),
            detail: matchDetail,
            place: place || ''
          }
        }).then(res => {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../index/index'
          })
        }).catch(console.error)
      }
    } else {
      wx.showToast({
        title: '战绩不能全为空',
        icon: 'none',
        duration: 2000
      })
    }
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  }
})
