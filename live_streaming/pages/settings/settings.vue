<template>
	<view>
		<view class="top flex align-center justify-center">
			<text class="text-white" style="position: absolute;left: 50rpx;top: 60rpx;"><</text>
			<text class="text-white">设置</text>
		</view>
		<f-list-item title="账户与安全"></f-list-item>
		<f-list-item title="资源编辑"></f-list-item>
		<f-list-item title="清除缓存"></f-list-item>
		<f-list-item title="意见反馈"></f-list-item>
		<f-list-item title="关于直播"></f-list-item>
		<button class="rounded-circle align-center m-auto bg-main text-white" style="width: 90%;" @click="logout(e)">退出登录</button>
	</view>
</template>

<script>
	import fListItem from "@/components/common/f-list-item.vue";
	export default {
		components: {
			fListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			logout(e) {
				this.$store.dispatch('logout').then(res => {
					uni.navigateBack({
						delta:1
					});
				});
				
			},
		}
	}
</script>

<style>
.top {
	width: 750rpx;
	height: 150rpx;
	background-color: #8745FF;
}
</style>
