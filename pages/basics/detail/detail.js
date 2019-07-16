// pages/basics/detail/detail.js
const app =  getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//==========初始化==================
		//日期初始化
		console.log(options);
		this.setData({
			id: options.id,
			date: options.date,
			forecastID:options.forecastID,
			Nashuirenmingcheng: options.Nashuirenmingcheng
		})
		//获取用户信息
		var that = this;
		wx.request({
			url: app.globalData.BaseURL + 'forecastUserDetail/' + this.data.id,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Bearer ${app.globalData.token}`
			},
			success: res => {
				this.setData({
					forecastUser:res.data
				})
				wx.request({
					url: app.globalData.BaseURL + 'forecastInformDetail/' + that.data.forecastID,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': `Bearer ${app.globalData.token}`
					},
					success: res => {
						console.log(res.data)
						this.setData({
							forecastInform: res.data
						})
					}
				})
			}
		})


	},


	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})