'use strict'

const await = require('await-stream-ready/lib/await')
const live = require('../../model/live')
const Controller = require('egg').Controller

class NspController extends Controller {
    // async test() {
    //     const {ctx,app} = this
    //     console.log("11111111111111")
    //     let message = ctx.args[0]
    //     console.log(message)
    //     const socket = ctx.socket
    //     const id = socket.id
    //     socket.emit(id,'来自后端的消息')
    // }
    //验证token
    async checkToken(token) {
        const { ctx, app, service, helper } = this
        const socket = ctx.socket
        const id = socket.id

        if(!token) {
            //通知前端 没有访问该接口的权限
            socket.emit(id,ctx.helper.parseMsg('error','您没有权限访问该接口'));
            return false
        }

        let user = {}
        try {
            user = ctx.checkToken(token)
        }catch(error){
            let fail = error.name === 'TokenExprieError'
            ? 'token已过期！请重新获取令牌'
            :'Token 令牌不合法！'
            socket.emit(id,ctx.header.parseMsg('error',fail))
            return false
        }
        return user
    }

    //进入直播间
    async joinLive() {
        console.log("请求了11111111111111111111111111111111111111111111111111")
        const { ctx, app, service, helper }  = this
        const nsp = app.io.of('/')

        //接收参数
        const message = ctx.args[0] || {}

        //当前连接
        const socket = ctx.socket
        console.log('socket'+socket)
        const id = socket.id

        let{ live_id, token } = message
        console.log('message'+message)
        let user = await this.checkToken(token)
        console.log("1111111123213")
        if(!user) {
            return
        }
        let msg = await service.live.checkStatus(live_id)
        console.log('msg'+msg)
        if(msg) {
            socket.emit(id,ctx.helper.parseMsg('error',msg))
            return
        }

        const room = 'live_' + live_id
        socket.join(room)
        const rooms = [room]
        let list = await service.cache.get('userList_'+room)
        list = list ? list : []
        list = list.filter((item) => item.id !== user.id)
        list.unshift({
            id:user.id,
            name:user.username,
            avatar:user.avatar,
        })
        service.cache.set('userList_' + room , list)

        nsp.adapter.clients(room,(err,clients) => {
            nsp.to(room).emit('online',{
                clients,
                action: 'join',
                user:{
                    id:user.id,
                    name:user.username,
                    avatar:user.avatar
                },
                data:list,
            })
        })

        let liveUser = await app.model.LiveUser.findOne({
            where:{
                user_id:user.id,
                live_id,
            },
        })
        if(!liveUser){
            app.model.LiveUser.create({
                user_id:user.id,
                live_id,
            })
            let live = await service.live.exist(live_id)
            if(live) {
                live.increment({
                    look_count:1,
                })
            }
        }
    }

    //离开直播间
    async leaveLive() {
        const { ctx, app, service, helper } = this
        const nsp = app.io.of('/')
        const message = ctx.args[0] || {}

        const socket = ctx.socket
        console.log('socket'+socket)
        const id = socket.id

        let{ live_id, token } = message
        //验证用户token
        let user = await this.checkToken(token)
        if(!user) {
            return
        }

        let msg = await service.live.checkStatus(live_id)
        console.log('msg'+msg)
        if(msg) {
            socket.emit(id,ctx.helper.parseMsg('error',msg,{
                notoast:true,
            }))
            return
        }

        const room = 'live_' + live_id
        socket.join(room)
        const rooms = [room]
        let list = await service.cache.get('userList_'+room)
       if(list){
           list = list.filter((item) => item.id !== user.id)
           service.cache.set('userList_'+ room,list)
       }
       console.log(list)

        nsp.adapter.clients(room,(err,clients) => {
            nsp.to(room).emit('online',{
                clients,
                action: 'join',
                user:{
                    id:user.id,
                    name:user.username,
                    avatar:user.avatar
                },
                data:list,
            })
        })

    }

    
}

module.exports = NspController