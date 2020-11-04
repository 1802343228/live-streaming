'use strict'

const Controller = require('egg').Controller

class NspController extends Controller {
    async test() {
        const {ctx,app} = this
        console.log("11111111111111")
        let message = ctx.args[0]
        console.log(message)
        const socket = ctx.socket
        const id = socket.id
        socket.emit(id,'来自后端的消息')
    }
}

module.exports = NspController