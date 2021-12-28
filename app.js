const koa = require('koa')
const app = new koa()

const data = require('./midddleware/koa_response_data')
const duration = require('./midddleware/koa_response_duration')
const header = require('./midddleware/koa_response_header')

app.use(duration)
app.use(header)
app.use(data)
app.listen(3000)


const webSocketService = require('./service/web_socket_service')
webSocketService.listen() //开启服务端的监听


