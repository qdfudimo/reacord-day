<script>
export default {
	data() {
		return {};
	},
	globalData: {
		userInfo: null,

		// 当前设备是否为 iPhone X
		isIPX: false,

		checkIsIPhoneX: function () {
			const that = this;
			uni.getSystemInfo({
				success: (e) => {
					console.log(e);
					that.statusBar = e.statusBarHeight; //状态栏高度

					let custom = uni.getMenuButtonBoundingClientRect(); //菜单按钮

					that.custom = custom;
					console.log(custom);
					that.customBar = custom.bottom + custom.top - e.statusBarHeight; //计算得到定义的状态栏高度
				}
			});
		},

		statusBar: '',
		custom: '',
		customBar: ''
	},
	onLaunch() {
		// 判断设备是否为 iPhone X
		this.globalData.checkIsIPhoneX(); // 展示本地存储能力
		const logs = uni.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		uni.setStorageSync('logs', logs); // 登录

		uni.login({
			success: (res) => {
				// console.log(res);
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		});
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>
 
<style>
/*每个页面公共css */
@import './app.css';
</style>
