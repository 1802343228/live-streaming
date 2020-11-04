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
			
			//监听连接
			S.on('connect',() => {
				console.log('已连接');
				//测试推送一条消息到后端
				S.emit('test','测试socket连接')
				
				//监听服务端的消息
				S.on(S.id,(e)  => {
					console.log(e);
				})
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
		authMethod({
			state
		},callback){
			if(!state.token){
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