const app = getApp();
Page({
	options: {
		addGlobalClass: true,
	},
	/**
	 * 页面的初始数据
	 */
	data: {
		motto: 'Hi 开发者！',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		userID: ''
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	//methods: {
	onLoad: function () {
		console.log('im coming');
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	formBindSubmit(e) {
		var userID = e.detail.value.userID;
		var password = e.detail.value.password;
		var that = this;
		if (userID == "" || password == "") {
			wx.showToast({
				title: "输入不能为空",
				icon: 'error',
				image: "/images/tabbar/about.png",
				duration: 1000
			})
			return;
		} else {
			wx.request({
				method: 'POST',
				url: app.globalData.BaseURL + 'Login',
				data: e.detail.value,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
				success: function (res) {
          console.log(res);
					if (res.data.success) {
						//存储用户信息 用于用户登陆状态维护
            console.log(res.data.data);
						app.globalData.user = res.data.data.userID;
            //存储token
            app.globalData.token=res.data.token;
						wx.showToast({
							title: '登录成功！',
							icon: 'loading',
							duration: 1500
						})
						setTimeout(() => {
							wx.navigateTo({
								url: '/pages/index/index?page=0'
							})
						}, 1000)
					}else{
						wx.showToast({
							title: '输入有误！',
							icon: 'none',
							duration: 2000
						})
					}
				},
				fail: function (res) {
					console.log('Error' + ':' + res)
				}
			})
		}


	},
  notManager(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
}
)