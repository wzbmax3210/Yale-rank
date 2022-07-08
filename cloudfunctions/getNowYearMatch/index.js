// 云函数入口文件
const cloud = require('wx-server-sdk')
const util = require("./util.js")

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const nowYear = new Date().getFullYear()
  const _ = cloud.database().command
  let result = []
  await db.collection('match')
    .orderBy('date', 'desc')
    .where({
      date: _.gte(new Date(nowYear))
    })
    .get()
    .then(res => {
      console.log(res.data)
      result = res.data.filter(v => {
        return new Date(v.date).getFullYear() === nowYear
      }).map(v => {
        v.date = util.formatTime(v.date)
        v.clubExpense = 0
        for (let i in v.detail) {
          v.clubExpense -= v.detail[i]
        }
        return v
      })
    }).catch(() => {
    })

  return result
}