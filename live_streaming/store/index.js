import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import $H from '../common/request.js';
import $C from '../common/config.js';
import io from '../common/uni-socket.io.js';


export default new Vuex.Store({
	state: {
		user:null,
		token:null,
		socket:null
	},
	actions:{
		//连接socket
		connectSocket({
			state,
			dispatch
		}) {
			const S = io($C.socketUrl,{
				query:{},
				transports:['websocket'],
				timeout:5000
			})
			//全局事件，用来监听在线人数
			let onlineEvent = (e) => {
				uni.$emit('live',{
					type:'online',
					data: e
				})
			}
			//监听连接
			S.on('connect',() => {
				console.log('已连接');
				//测试推送一条消息到后端
				state.socket = S
				//socket.io唯一链接Id，可以监控这个id实现点对点通讯
				const{
					id
				} = S
				S.on(id,(e) => {
					let d = e.data
					if(d.action === 'error'){
						let msg = d.payload
						return uni.showToast({
							title:msg,
							icon:'none'
						})
					}
				})
				//监听在线用户信息
				S.on('online',onlineEvent)
				//监听服务端的消息
				// S.on(S.id,(e)  => {
				// 	console.log(e);
				// })
			})
			//监听失败
			S.on('error',() => {
				console.log('连接失败');
			})
			//监听断开
			S.on('disconnect',() => {
				console.log('已断开');
			})
		},
		logout({state}) {
			$H.post('/logout',{},{
				token:true,
				toast:false
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		initUser({state}){
			let user = uni.getStorageSync('user')
			let token = uni.getStorageSync('token')
			if(user){
				state.user = JSON.parse(user)
				state.token = token
			}
		},
		login({state},user){
			state.user = user
			state.token = user.token
			
			uni.setStorageSync('user',JSON.stringify(user))
			console.log("1111111");
			console.log(user.token);
			uni.setStorageSync('token',user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info',{
				token:true,
				noJump:true,
				toast:false
			}).then(res => {
				state.user = res
				uni.setStorage({
					key:"user",
					data:JSON.stringify(state.user)
				})
			})
		},
		authMethod({},callback){
			let token = uni.getStorageSync('token')
			if(!token){
				uni.showToast({
					title:'请先登录',
					icon:'none'
				});
				return uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}

	}
})