const express = require('express')
const { initChatService } = require('./chat')
let app
const port = 5566


const initExpress = () => {
  if (app) {
    console.log('[express] 服务已启动, 不再启动')
    return
  }
  app = express()
  // app.use(validateHeader)
  app.use(express.static("public"));
  app.use(express.json())
  app.listen(port, () => {
    console.log(`[express] 服务启动,端口:${port}`)
  })
  initChatService(app)
}

module.exports = {
  expressApp: app,
  initExpress
}
