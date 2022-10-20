<script>
import { request } from "@/utils/request";
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
					that.statusBar = e.statusBarHeight; //状态栏高度
					let custom = uni.getMenuButtonBoundingClientRect(); //菜单按钮
					that.custom = custom;
					that.customBar = custom.bottom + custom.top - e.statusBarHeight; //计算得到定义的状态栏高度
				}
			});
		},

		statusBar: '',
		custom: '',
		customBar: '',
		arrImg: [],
		colorArr: [],
		randomImg: []
	},
	onLaunch() {
		// 判断设备是否为 iPhone X
		this.globalData.checkIsIPhoneX(); // 展示本地存储能力
		request("requestImgUrl",).then(({ result = {} }) => {
			if (result.code === 0) {
				this.globalData.arrImg = result.data
				this.globalData.colorArr = result.colorArr
				this.globalData.randomImg = result.randomImg
			}
		}).catch(error => {
			console.log(error);
		})
		// 更新版本提示
		if (uni.canIUse('getUpdateManager')) {
			const updateManager = uni.getUpdateManager()
			updateManager.onCheckForUpdate(function (res) {
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function () {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，请重启应用',
							showCancel: false,
							success: function (res) {
								if (res.confirm) {
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function () {
						uni.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
							showCancel: false,
						})
					})
				}
			})
		} else {
			uni.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
				showCancel: false,
			})
		}
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
