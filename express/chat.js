const { sendRequest } = require("../service/chat")


const initChatService = (expressApp) => {

  // 初始化接口
  expressApp.post('/api/chat', async (req, res) => {
    const reqBody = req.body
    const responseData = await sendRequest(reqBody.message)
    res.json(responseData)
  })

}

module.exports = {
  initChatService
}
