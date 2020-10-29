<template>
	<view>
		<view>
			<image src="../../static/Dingtalk_20201028180805.jpg" class="img" style="width: 750rpx;height: 300rpx;"></image>
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
				list:[
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					},
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					},
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					},
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					},
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					},
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					},
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					},
					{
						img:'../../static/me.jpg',
						title:'标题',
						popularity:0,
						view:0
					}
				]
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
.list-item {
	width: 375rpx;
	height: 375rpx;
	padding: 5rpx;
	box-sizing: border-box;
	position: relative;
}
</style>
