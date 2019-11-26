// pages/oic/oic-lot/oic-lot.js

var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		LOTID:'',
		CSTID:'',
		LOT_STATE:'',
		lotHistory:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	getData(e){
		var that = this;
		let input = e.detail.value;
		if (input.length != 8 && input.length != 10){
			return;
		}else{
			if (input.length==10){
				wx.request({
					url: app.globalData.BaseURL + '/lots/lot/' + e.detail.value,
					data: {},
					success: (res) => {
						if (res.data.code == 0) {
							that.setData({
								LOTID:res.data.data.LOT_ID,
								CSTID: res.data.data.CST_ID,
								LOT_STATE: res.data.data.LOT_STATE,
								lotHistory: res.data.HISTORY
							})
						}
					}
				})
			}else{
				wx.request({
					url: app.globalData.BaseURL + '/lots/cst/' + e.detail.value,
					data: {},
					success: (res) => {
						if (res.data.code == 0) {
							console.log(res.data);
							that.setData({
								LOTID: res.data.data.LOT_ID,
								CSTID: res.data.data.CST_ID,
								LOT_STATE: res.data.data.LOT_STATE,
								lotHistory: res.data.data.HISTORY
							})
						}
					}
				})
			}
		}
	}
})