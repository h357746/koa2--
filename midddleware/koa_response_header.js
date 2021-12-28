module.exports = async (ctx, next) => {
    //设置响应头
    ctx.set('Content-Type', 'application/json;charset=utf-8')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE')
    await next()
}