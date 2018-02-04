const nodemailer = require('nodemailer')

const { sleep, getAllDouyuRoomInfoPromise, sendMail } = require('./uti/util.js')
const config = require('./config/config.js')

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
      const { data: { data: roomInfo, error: errorCode } } = value
      // 判断状态
      if (errorCode !== 0 ) {
        throw new Error(roomInfo)
      }
      // 判断是否开播
      // "1" - 开播 , "2" - 未开播
      if (roomInfo.room_status === '1') {
        console.log(`${roomInfo.owner_name} ---- 已经开播 ---- ${roomInfo.start_time}`)
        if (!preStreamState[roomInfo.room_id]) {
          // 配置发送邮件信息
          const mailOptions = Object.assign(config.emailDetail, { 
            subject: roomInfo.owner_name, // 邮箱标题
            text: roomInfo.room_name + roomInfo.start_time // 邮箱内容
          })
          // 发送邮件
          sendMail(transporter, mailOptions)
          preStreamState[roomInfo.room_id] = true
        }
      } else {
        console.log(`${roomInfo.owner_name} ---- 未开播 ---- 上次开播时间 ---- ${roomInfo.start_time}`)
        preStreamState[roomInfo.room_id] = false
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
