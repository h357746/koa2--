const WebSocket = require('ws')
const path = require('path')
const fileUtils = require('../utils/file_utils')
//创建websocket服务端对象
const wss = new WebSocket.Server({
    port: 9998
})
module.exports.listen = () => {
    //对客户端的链接事件进行监听
    wss.on('connection', client => {
        console.log('有客户端链接了')
        //对客户端的链接对象进行message事件监听
        //msg:由客户端发给服务端的数据
        client.on('message', async msg => {
            console.log('客户端发送数据给服务端了：' + msg)
            //由服务端给客户端发送数据
            let payload = JSON.parse(msg)
            const action = payload.action
            if (action === 'getData') {
                let filePath = '../data/' + payload.chartName + '.json'
                filePath = path.join(__dirname, filePath)
                const res = await fileUtils.getFileJsonData(filePath)
                //需要在服务端获取的数据的基础上增加一个data数据
                payload.data = res
                client.send(JSON.stringify(payload))
            } else {
                //原封不动的将所接受到的数据转发到每一个处于链接状态的客户端
                wss.clients.forEach(client => {
                    client.send(JSON.stringify(payload))
                })

            }




        })

    })
}