const nodemailer = require('nodemailer')

const {
  sleep,
  getAllDouyuRoomInfoPromise,
  sendMail,
  getDouyLoopVideoInfoByRoomId,
  getFinalInfoByRoomIdPromise,
} = require('./util')
const config = require('./config')

let preStreamState = {} // 主播之前的开播状态

nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config.transporter)
  // 开启循环监听
  monitor(transporter)
})

// 监听房间状态
async function monitor(transporter) {
  try {
    const resultArray = await getAllDouyuRoomInfoPromise()
    for (let value of resultArray) {
      const { roomId, isLive, startTime, roomName, ownerName } = value

      if (isLive) {
        console.log(`${ownerName} ---- 已经开播 ---- ${startTime}`)

        if (!preStreamState[roomId]) {
          // 配置发送邮件信息
          const mailOptions = Object.assign(config.emailDetail, {
            subject: ownerName, // 邮箱标题
            text: roomName + startTime, // 邮箱内容
          })
          // 发送邮件
          sendMail(transporter, mailOptions)
          preStreamState[roomId] = true
        }
      } else {
        console.log(`${ownerName} ---- 未开播 ---- 上次开播时间 ---- ${startTime}`)
        preStreamState[roomId] = false
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    // 隔一段时间再请求
    await sleep(config.delayTime)
    return monitor(transporter)
  }
}
