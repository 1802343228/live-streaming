<template>
	<view class="content">
		<tab></tab>
	</view>
</template>

<script>
	import tab from '../../components/common/tab.vue';
	export default {
		components:{
			tab
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			uni.hideTabBar();
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		background: #5a5b;
	}

</style>
