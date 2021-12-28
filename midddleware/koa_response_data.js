const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
    const url = ctx.request.url
    let filePath = url.replace('/api', '../data') + '.json'
    filePath = path.join(__dirname, filePath)
    try {
        const res = await fileUtils.getFileJsonData(filePath)
        ctx.response.body = res
    } catch (error) {
        const errorMsg = {
            message: '读取文件内容失败，文件资源不存在',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }

    console.log(filePath)
    await next()

}