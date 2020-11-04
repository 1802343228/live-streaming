<template>
	<view class="container">
		<view class="flex align-center justify-center" style="width: 90rpx;height: 90rpx;"><text @click="back(e)" class="iconfont text-dark">&#xe607;</text></view>
		<view class="flex align-center justify-center" style="height: 350rpx;">
			<text style="font-size: 50rpx;" class="text-dark">{{ loginType === "login" ? "账号密码登录" : "手机验证码登录" }}</text>
		</view>
		<view class="px-3" v-if="loginType === 'login'">
			<input type="text" v-model="form.username" class=" px-3 mb-4 font rounded border-bottom" placeholder="昵称/手机号/邮箱" style="height: 100rpx;" />
			<view class="border-bottom flex">
				<input type="password" v-model="form.password" class=" px-3 font rounded" placeholder="请输入密码" style="height: 100rpx;width: 65%;" />
				<text v-if="type === 'login'" class="text-light-muted p-2">忘记密码</text>
			</view>
			<input
				v-if="type != 'login'"
				type="password"
				v-model="form.repassword"
				class="px-3 mb-4 font rounded border-bottom mt-2"
				placeholder="请输入确认密码"
				style="height: 100rpx;"
			/>
		</view>

		<view class="px-3" v-else>
			<view class="border-bottom flex">
				<text class="font-weight-bold p-3">+86</text>
				<input v-model="phone" type="text" class="px-3 font rounded" placeholder="手机号" style="height: 100rpx;" />
			</view>
			<view class="border-bottom flex mt-3">
				<input type="password" v-model="form.password" class=" px-3 font rounded" placeholder="请输入密码" style="height: 100rpx;width: 56%;" />
				<text v-if="type === 'login' && !send" class="text-light-muted p-2 border bg-hover-light rounded" style="height: 40rpx;width: 25%;" @click="sendCode">
					获取验证码
				</text>
				<text v-if="send" class="text-light-muted p-2 border bg-hover-light rounded align-center" style="height: 40rpx;width: 25%">还剩{{ sec }}s</text>
			</view>
			<input
				v-if="type != 'login'"
				type="password"
				v-model="form.repassword"
				class="px-3 mb-4 font rounded border-bottom"
				placeholder="请输入确认密码"
				style="height: 100rpx;"
			/>
		</view>

		<view class="p-3 flex align-center justify-center mt-5" @click="submit">
			<view class="rounded-circle bg-main p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover">
				<text class="text-white font-md">{{ type === "login" ? "登 录" : "注 册" }}</text>
			</view>
		</view>
		<view class="flex align-center justify-center">
			<text class="text-main font p-2" @click="changeLoginType">{{ loginType === "psw" ? "验证码登录" : "账号密码登录登录" }}</text>
			<text class="text-main font p-2">|</text>
			<text class="text-main font p-2" @click="changeType">{{ type === "login" ? "注册账号" : "去登录" }}</text>
		</view>
		<view class="flex align-center justify-center"><text class="text-light-muted p-2">————社交账号登录————</text></view>
		<view class="flex align-center justify-center">
			<image class="p-3" style="width: 100rpx;height: 100rpx;" src="../../static/login/QQ.png"></image>
			<image @click="wxLogin" class="p-3" style="width: 100rpx;height: 100rpx;" src="../../static/login/微信.png"></image>
			<image class="p-3" style="width: 100rpx;height: 100rpx;" src="../../static/login/微博.png"></image>
		</view>
		<view class="align-center justify-between text-light-muted" style="padding: 110rpx;">
			注册即代表您同意
			<text style="color: #8745FF;">《XXX社区协议》</text>
		</view>
	</view>
</template>

<script>
	import $H from '@/common/request.js';
	import store from '../../store/index.js';
export default {
	data() {
		return {
			type: "login",
			loginType: "login",
			send: false,
			sec: 60,
			phone: "",
			wxid:"oRrdQt3hwWWB3VH2Qaa8ZJRAlY9g",
			form: {
				username: "",
				password: "",
				repassword: ""
			}
		};
	},
	computed: {
		disabled() {
			if ((this.form.username === "" || this.form.password === "") && (this.form.phone === "" || this.form.code === "")) {
				return true;
			}
			return false;
		}
	},
	methods: {
		back(e) {
			uni.navigateBack({
				delta: 1
			});
		},
		changeType() {
			this.type = this.type === "login" ? "reg" : "login";
		},
		changeLoginType() {
			this.loginType = this.loginType === "login" ? "phoneLogin" : "login";
		},
		submit() {
			let msg = this.type === "login" ? "登录" : "注册";

			$H.post("/" + this.type, this.form).then(res => {
				uni.showToast({
					title: msg + "成功",
					icon: "none"
				});
				if (this.type === "reg") {
					this.changeType();
					this.form = {
						username: "",
						password: "",
						repassword: ""
					};
				} else {
					store.dispatch("login", res);
					uni.navigateBack({
						delta: 1
					});
				}
			});
		},
		// 表单验证
		validate() {
			//手机号正则
			var mPattern = /^1[34578]\d{9}$/;
			if (!mPattern.test(this.phone)) {
				uni.showToast({
					title: "手机号格式不正确",
					icon: "none"
				});
				return false;
			}
			// ...更多验证
			return true;
		},
		sendCode() {
			this.send = true;
			// 倒计时60s结束后 可再次发送验证码
			let promise = new Promise((resolve, reject) => {
				let setTimer = setInterval(() => {
					this.sec = this.sec - 1;
					if (this.sec <= 0) {
						this.send = false;
						resolve(setTimer);
						this.sec = 60;
					}
				}, 1000);
			});
			promise.then(setTimer => {
				clearInterval(setTimer);
			});
		},
		wxLogin() {
			uni.getProvider({
				service: "oauth",
				success: function(res) {
					console.log(res.provider);
					//支持微信、qq和微博等
					if (~res.provider.indexOf("weixin")) {
						uni.login({
							provider: "weixin",
							success: function(loginRes) {
								console.log("-------获取openid(unionid)-----");
								console.log(JSON.stringify(loginRes));
								// 获取用户信息
								uni.getUserInfo({
									provider: "weixin",
									success: function(infoRes) {
										//console.log("-------获取微信用户所有-----");
										//console.log(JSON.stringify(infoRes.userInfo));
										let list = JSON.stringify(infoRes.userInfo);

										//var a=eval(list);
										//var a = list.replace(/\"/g, "");
										//a = a.replace(/\:/g,"\:\"").replace(/\,/g,"\"\,").replace(/\}/g,"\"\}");
										//var b = "["+list+"]"
										//console.log("111111111");
										//console.log(a[0]);
										//console.log(b[0]);
										//this.openid = b[0]
										//console.log("111111111");
										let wxid = {
											wxid:"oRrdQt3hwWWB3VH2Qaa8ZJRAlY9g"
										}
										$H.post("/wxLogin", wxid).then(res => {
											console.log(res);
											store.dispatch("login", res);
											uni.showToast({
												title: "成功",
												icon: "none"
											});
											uni.navigateBack({
												delta: 1
											});
											
											
										});
									}
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.container {
	width: 750rpx;
	height: 100vh;
	margin: 0;
	padding: 20rpx 0 0 0;
	background-size: cover;
	/* background-image: linear-gradient(to bottom, #BA7ACE 0%, #8745FF 100%); */
}
</style>

<!-- <template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="ml-3 mt-3" @click="back"><text class="iconfont icon-guanbi text-main"></text></view>

		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">
			{{ status ? '手机验证码登录' : '账号密码登录' }}
		</view>

		<view class="px-2">
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" v-model="form.username" placeholder="请输入用户名" class="border-bottom p-2" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input
						type="text"
						v-model="form.password"
						placeholder="请输入密码"
						class="border-bottom p-2 flex-1"
					/>
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">
						忘记密码？
					</view>
				</view>
			</template>

			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" v-model="form.phone" placeholder="手机号" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input
						type="text"
						v-model="form.code"
						placeholder="请输入验证码"
						class="border-bottom p-2 flex-1"
					/>
					<view
						class="border-bottom flex align-center justify-center font-sm text-white"
						:class="codeTime > 0 ? 'bg-disabled' : 'bg-main'"
						style="width: 180rpx;"
						@click="getCode"
					>
						{{ codeTime > 0 ? codeTime + ' s' : '获取验证码' }}
					</view>
				</view>
			</template>
		</view>

		<view class="py-2 px-3">
			<button
				class="text-white bg-main"
				style="border-radius: 50rpx;border: 0;outline: none;"
				:disabled="disabled"
				:class="disabled ? 'bg-disabled' : 'bg-main'"
				@click="submit"
			>
				登录
			</button>
		</view>

		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-main font-sm" @click="changeStatus">{{ status ? '账号密码登录' : '验证码登陆' }}</view>
			<text class="text-muted mx-2">|</text>
			<view class="text-main font-sm">登录遇到问题</view>
		</view>

		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
			<view class="mx-2 text-light-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
		</view>

		<view class="flex align-center px-5 py-3">
			<view class="flex-1 flex align-center justify-center">
				<view
					class="iconfont icon-weixin font-xlg text-white  flex align-center justify-center rounded-circle"
					style="width: 100rpx;height: 100rpx;background-color: #65CD9F;"
				></view>
			</view>
			<view class="flex-1 flex align-center justify-center">
				<view
					class="iconfont icon-QQ font-xlg text-white flex align-center justify-center rounded-circle"
					style="width: 100rpx;height: 100rpx;background-color: #55ACF5;"
				></view>
			</view>
			<view class="flex-1 flex align-center justify-center">
				<view
					class="iconfont icon-xinlangweibo font-xlg text-white  flex align-center justify-center rounded-circle"
					style="width: 100rpx;height: 100rpx;background-color: #EC7E41;"
				></view>
			</view>
		</view>

		<view class="flex align-center justify-center text-muted mt-3">
			注册即代表同意
			<text class="text-main">《社区直播协议》</text>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
export default {
	components: {
		uniStatusBar
	},
	data() {
		return {
			status: false,
			form: {
				username: '',
				password: '',
				phone: '',
				code: ''
			},
			codeTime: 0
		};
	},
	onLoad() {},
	computed: {
		disabled() {
			if (
				(this.form.username === '' || this.form.password === '') &&
				(this.form.phone === '' || this.form.code === '')
			) {
				return true;
			}
			return false;
		}
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 初始化表单
		initForm() {
			this.form.username = '';
			this.form.password = '';
			this.form.phone = '';
			this.form.code = '';
		},
		// 切换登录方式
		changeStatus() {
			// 初始化表单
			this.initForm();
			this.status = !this.status;
		},
		// 获取验证码
		getCode() {
			// // 防止重复获取
			// if (this.codeTime > 0) {
			// 	return;
			// }
			// // 验证手机号
			// if (!this.validate()) {
			// 	return;
			// }

			this.$H.post('/sendcode', { phone: this.form.phone }).then(res => {
				// 倒计时
				this.codeTime = 60;
				let timer = setInterval(() => {
					if (this.codeTime >= 1) {
						this.codeTime--;
					} else {
						this.codeTime = 0;
						clearInterval(timer);
					}
				}, 1000);
			});
		},
		// 表单验证
		validate() {
			//手机号正则
			var mPattern = /^1[34578]\d{9}$/;
			if (!mPattern.test(this.phone)) {
				uni.showToast({
					title: '手机号格式不正确',
					icon: 'none'
				});
				return false;
			}
			// ...更多验证
			return true;
		},
		// 提交
		submit() {
			// 表单验证
			// if (!this.validate()) {
			// 	return;
			// }
			let type = '';
			if (this.status) {
				type = 'phoneLogin';
			} else {
				type = 'login';
			}
			// console.log(type);
			console.log(this.form);
			this.$H.post('/' + type, this.form).then(res => {
				console.log(res);
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
				this.$store.dispatch('login', res);
				uni.navigateBack({
					delta: 1
				});
			});
		}
	}
};
</script>

<style></style>

 -->
