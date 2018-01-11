# 斗鱼邮件开播提醒
Node.js小脚本,实现每10秒刷新斗鱼房间信息,若监听的主播开播,则发送邮件到指定配置邮箱

注意: 配合 `微信中的功能` :`QQ邮箱提醒` 效果更佳!!!
### 配置
需要自己配置 `config.js` 文件：
- `senderEMail` ： 发送方的邮箱帐号
- `transporter.auth.pass` ： 发送方的邮箱授权码
- `receiverEmail` ： 接收方的邮箱帐号
- `douyu.roomId` ： 监听的斗鱼房间列表(房间号或别名)
- `delayTime` ：  延迟时间(默认每10秒刷新一次房间信息)
### 运行
1. `git clone git@github.com:op8278/node-douyu-email-notification.git`  
2. `cd node-douyu-email-notification`  
3. `npm install`  
4. `node app.js`  