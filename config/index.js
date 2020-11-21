const senderEmail = '请填写发送方的邮箱帐号' // 你的邮箱帐号(发送方)
const receiverEmail = '请填写接收方的邮箱帐号' // 接收方邮箱帐号(接收方)

module.exports = {
  /** 是否忽略录像状态(为true时,录像状态视作为下播状态,默认为true) */
  isIgnoreLoopVideo: true, // 是否忽略录像
  /** 延迟时间(默认每10秒刷新一次房间信息) */
  delayTime: 1000 * 10,
  /** 邮件发送器的配置 */
  transporter: {
    /** smtp域名 (163的smtp域名为 stmp.163.com) */
    host: 'smtp.qq.com',
    /** 端口 */
    port: 465, // 端口
    /** true for 465, false for other ports */
    secure: true, // true for 465, false for other ports
    auth: {
      /** 你的邮箱帐号 */
      user: senderEmail,
      /** 你的邮箱SMTP密码(授权码) */
      pass: '请填写你的邮箱授权码',
    },
  },
  /** 斗鱼房间配置 */
  douyu: {
    /** 房间API */
    roomApi: `http://open.douyucdn.cn/api/RoomApi/room/`,
    /** 录像API */
    loopVideoApi: 'https://www.douyu.com/wgapi/live/liveweb/getRoomLoopInfo',
    /** 斗鱼房间号 */
    roomId: [
      '60937', // zard房间号
      '9999', // yyf房间号
    ],
  },
  // TODO: 改为模版
  emailDetail: {
    from: `"斗鱼tv开播提醒" <${senderEmail}>`, // sender addressss
    to: receiverEmail, // list of receivers
    subject: 'Zard开播了', // Subject line
    text: '没有内容', // plain text body
    // html: '<b>Hello world?</b>' // html body
  },
}
