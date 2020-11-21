const axios = require('axios')

const config = require('../config')

// 延迟函数
function sleep(ms = 1000 * 10) {
  // 默认10秒
  return new Promise((resolve) => setTimeout(resolve, ms))
}
// 通过RoomId,获取斗鱼房间信息
function getDouyuRoomInfoByRoomId(roomId) {
  return axios.get(config.douyu.roomApi + roomId)
}
// 通过RoomId,获取斗鱼房间录像信息
function getDouyLoopVideoInfoByRoomId(roomId) {
  return axios.get(config.douyu.loopVideoApi, {
    params: {
      rid: roomId,
    },
  })
}
// 通过RoomId,获取合成的房间信息
async function getFinalInfoByRoomIdPromise(roomId) {
  try {
    let isLive = true // 是否正在直播
    // 判断是否正在推流中状态
    const {
      data: { data: roomInfo, error: errorCode },
    } = await getDouyuRoomInfoByRoomId(roomId)
    // room_status: 1(推流中,可能为录像),2(没有推流)
    if (roomInfo.room_status == 2) {
      isLive = false
    }

    // 判断是否需要忽略录像
    if (config.isIgnoreLoopVideo) {
      const {
        data: { data: loopVideoInfo, error: errorCode },
      } = await getDouyLoopVideoInfoByRoomId(roomId)
      // isShowLoopLogo: 1(录像播放中),0(没有录像)
      if (loopVideoInfo.isShowLoopLogo == 1) {
        isLive = false
      }
    }
    // 组装返回数据
    return Promise.resolve({
      roomId,
      isLive,
      startTime: roomInfo.start_time,
      roomName: roomInfo.room_name,
      ownerName: roomInfo.owner_name,
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

// 获取RoomId列表上,所有斗鱼房间信息
function getAllDouyuRoomInfoPromise(roomIdArray = config.douyu.roomId) {
  let douyuRoomInfoPromiseArray = []
  for (let roomId of roomIdArray) {
    douyuRoomInfoPromiseArray.push(getFinalInfoByRoomIdPromise(roomId))
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
  sendMail,
  getDouyuRoomInfoByRoomId,
  getDouyLoopVideoInfoByRoomId,
  getFinalInfoByRoomIdPromise,
  getAllDouyuRoomInfoPromise,
}
