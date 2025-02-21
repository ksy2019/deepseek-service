const axios = require('axios');
const data = {
    "model": "deepseek-ai/DeepSeek-V3",
    "stream": false,
    "max_tokens": 512,
    "stop": [
        "null"
    ],
    "temperature": 0.7,
    "top_p": 0.7,
    "top_k": 50,
    "frequency_penalty": 0.5,
    "n": 1,
    "response_format": {
        "type": "text"
    },
};

const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.siliconflow.cn/v1/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer sk-cigrbfprrjihriavfamwuclqqqqhinoxgvgbmuejznndaacr'
    },
};

const systemMessage = {
    "content": `你现在在一个execl插件程序中，你按照要求返回双层数组；内层数组的第一个是坐标，比如A1，第二个元素是填充值;如果不能处理就返回空数组；返回例子： [["A1","你好"],["A3","test"]] ，代表将A1表格填充你好，A3表格填充test；此条信息不用回复`,
    "role": "system"
}

const sendRequest = async (message) => {
    const userMessage = [
        {
            "content": message,
            "role": "user"
        }
    ]
    const requestData = {
        "messages": [
            systemMessage,
            ...userMessage
        ],
        ...data
    }
    try {
        const response = await axios({ ...config, data: requestData })
        return {
            code: 0,
            message: response.data.choices[0].message
        }
    } catch (err) {
        console.log(err)
        return {
            code: 200,
            message: '网络错误'
        }
    }
}

module.exports = {
    sendRequest
}