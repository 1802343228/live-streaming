<template>
	<view>
		<view>
			<image src="../../static/lunbo2.jpg" class="img" style="width: 750rpx;height: 300rpx;"></image>
		</view>
		<!-- 轮播图 -->
		<!-- <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200"
		style="width: 750rpx;height: 250rpx;"
		>
		<swiper-item>
			<image src="../../static/lunbo1.jpg" style="width: 750rpx;height: 250rpx;"></image>
		</swiper-item>
		<swiper-item>
			<image src="../../static/lunbo2.jpg" style="width: 750rpx;height: 250rpx;"></image>
		</swiper-item>
		</swiper> -->
		
		<!-- 直播列表 -->
		<view class="flex flex-wrap">
		<f-list v-for="(item, index) in list" :key="index" :item="item" :index="index" @click="openLive()"></f-list>
	</view>
	</view>
</template>

<script>
	import fList from '../../components/common/f-list.vue'
	export default {
		components:{
			fList
		},
		data() {
			return {
				url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
				list:[
					{
						img:'../../static/me.jpg',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'游戏',
						popularity:30,
						view:10,
						isLive:true
					},
					{
						img:'../../static/bg.jpg',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'游戏',
						popularity:10,
						view:10,
						isLive:false
					},
					{
						img:'../../static/bg1.jpg',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'游戏',
						popularity:110,
						view:110,
						isLive:false
					},
					{
						img:'../../static/bg2.png',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'生活',
						popularity:220,
						view:220,
						isLive:true
					},
					{
						img:'../../static/bg3.png',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'生活',
						popularity:110,
						view:110,
						isLive:false
					},
					{
						img:'../../static/bg3.png',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'标题',
						popularity:1110,
						view:1110,
						isLive:false
					},
					{
						img:'../../static/bg3.png',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'游戏',
						popularity:100,
						view:110,
						isLive:false
					},
					{
						img:'../../static/bg3.png',
						url:'http://127.0.0.1:23481/live/qY2MG2pfE3hFQaa7E2lX.flv?sign=1604327903-bb15c620a97fcbee4deb6c7401a724de8',
						title:'生活',
						popularity:10,
						view:10,
						isLive:false
					}
				]
			}
		},
		methods: {
			openLive() {
				uni.navigateTo({
					url:'../live/live?url='+this.url
				})
			}
		}
	}
</script>

<style>
.list-item {
	width: 375rpx;
	height: 375rpx;
	padding: 5rpx;
	box-sizing: border-box;
	position: relative;
}
</style>
