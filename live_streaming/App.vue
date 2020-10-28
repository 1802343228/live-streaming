<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		uni.onTabBarMidButtonTap(() => {
			console.log("点击了中间按钮");
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	/* 引入自定义图标 */
	@import url("./common/icon.css");
	/* 自定义样式库 */
	@import url("./common/free.css");
	/* 引入公共样式 */
	@import url("./common/common.css");
</style>
