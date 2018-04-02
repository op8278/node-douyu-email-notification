const axios = require('axios')
const config = require('../config/config.js')

// 延迟函数
function sleep(ms = 1000 * 10) { // 默认10秒
  return new Promise(resolve => setTimeout(resolve, ms))
}
// 根据斗鱼房间号,判断是否在开播状态
function isOnStream(roomId) {
  return axios.get(config.douyu.roomApi + roomId).then((res) => {
    const responseData = res.data
    if (responseData.error != '0') {
      console.log('请求错误')
      // TODO: 错误处理
      return false
    }
    // 判断是否在开播状态
    // 1 - 开播 , 2 - 未开播
    if (responseData.data.room_status != 1) {
      return false
    }
    return true
  })
}
// 通过RoomId,获取斗鱼房间信息
function getDouyuRoomInfoByRoomId(roomId) {
  try {
    return axios.get(config.douyu.roomApi + roomId)
  } catch (error) {
    throw error
  }
}
// 获取RoomId列表上,所有斗鱼房间信息
function getAllDouyuRoomInfoPromise(roomIdArray = config.douyu.roomId) {
  let douyuRoomInfoPromiseArray = []
  for (let roomId of roomIdArray) {
    douyuRoomInfoPromiseArray.push(getDouyuRoomInfoByRoomId(roomId))
  }
  return Promise.all(douyuRoomInfoPromiseArray)
}
// 发送邮件
function sendMail(transporter, mailOptions) {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
  })
}
module.exports = {
  sleep,
  isOnStream,
  getDouyuRoomInfoByRoomId,
  getAllDouyuRoomInfoPromise,
  sendMail,
}