# 斗鱼邮件开播提醒
Node.js小脚本,实现每10秒刷新斗鱼房间信息,若监听的主播开播,则发送 `开播提醒邮件` 到 `指定配置邮箱`

注意: Node.js 版本需要支持 async/await特性,最好>8.0以上

提示: 配合 `微信中的功能` :`QQ邮箱提醒` 效果更佳!!!
### 配置
需要自己配置 `config.js` 文件：
- `senderEmail` ： 发送方的邮箱帐号
- `transporter.auth.pass` ： 发送方的邮箱授权码
- `transporter.host` ： 发送方的邮箱SMTP域名(qq邮箱: smtp.qq.com , 163邮箱: smtp.163.com )
- `receiverEmail` ： 接收方的邮箱帐号
- `douyu.roomId` ： 监听的斗鱼房间列表(房间号或别名)
- `delayTime` ：  延迟时间(默认每10秒刷新一次房间信息)

若想修改邮件 标题/内容

暂时修改`app.js` 下面的:
```js
const mailOptions = Object.assign(config.emailDetail, { 
  subject: roomInfo.owner_name, // 邮箱标题
  text: roomInfo.room_name + roomInfo.start_time // 邮箱内容
})
```
### 运行
1. `git clone git@github.com:op8278/node-douyu-email-notification.git`  
2. `cd node-douyu-email-notification`  
3. `npm install`  
4. `node app.js`  