<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200"
		style="width: 750rpx;height: 250rpx;"
		>
		<swiper-item>
			<image src="../../static/lunbo1.jpg" style="width: 750rpx;height: 250rpx;"></image>
		</swiper-item>
		<swiper-item>
			<image src="../../static/lunbo2.jpg" style="width: 750rpx;height: 250rpx;"></image>
		</swiper-item>
		</swiper>
		
		<!-- 直播列表 -->
		<view class="flex flex-wrap">
			<view class="list-item" v-for="i in 10" :key="i" @click="openLive">
				<image src="../../static/me.jpg"
				style="width: 365rpx;height: 365rpx;"
				class="rounded"
				mode="aspectFill"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			openLive() {
				uni.navigateTo({
					url:'../live/live'
				})
			}
		}
	}
</script>

<style>
.list-item{
    width: 375rpx;
    height: 375rpx;
    padding: 5rpx;
    box-sizing: border-box;
    position: relative;
  }
</style>
