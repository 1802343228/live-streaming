<template>
	<view style="position: fixed;bottom: 120rpx;left: 0;right: 0;">
		<scroll-view scroll-y="true" style="width: 520rpx;height: 300rpx;" scroll-with-animation class="pl-3"
		:scroll-into-view="scrollInToView"
		>
		<view :id="'danmu'+item.id"
		class="flex justify-start align-start rounded p-2 mb-2"
		style="background-color: rgba(255,255,255,0.125);"
		v-for="(item,index) in list" :key="index"
		>
		<text class="font-md text-danger">{{item.name}}:</text>
		<text class="font-md text-white">{{item.content}}</text>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				scrollInToView:'',//滚动到哪个元素到view试图
				list:[],//弹幕数组
				randomTalk:[
					{
						name:"啊啊啊啊啊好可爱"
					},
					{
						name:"233333333"
					},
					{
						name:"主播也太好看了8"
					},
					{
						name:"awsl"
					},
					{
						name:"？？？？？？"
					},
					{
						name:"永远滴神！！"
					},
					{
						name:"倾家荡产给主播送火箭"
					},
					{
						name:"晚安，打工人"
					},
					{
						name:"主播玩明日方舟吗"
					},
					{
						name:"wslwslwsl我死了八百遍"
					},
					
					{
						name:"呼叫张三"
					},
				]
			}
		},
		mounted() {
			let id = 1
			let len = this.randomTalk.length
			setInterval(() => {
				this.list.push({
					id:id,
					name:'观众'+id,
					content:this.randomTalk[Math.floor(Math.random()*len+1)-1].name
				})
				//置于底部
				this.toBottom()
				id++
			},2000)
		},
		methods:{
			send(data) {
				this.list.push(data)
				//置于底部
				this.toBottom()
			},
			toBottom() {
				setTimeout(() => {
					let len = this.list.length
					if(len > 0 && this.list[len-1]){
						this.scrollInToView = 'danmu'+this.list[len-1].id
					}
				},200)
			}
		},
	}
</script>

<style>
</style>
