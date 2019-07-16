//删除消息;
//获取应用实例
const app = getApp();

function DeleteMessage(s) {
	console.log(s);
	wx.request({
		method: 'POST',
		url: app.globalData.BaseURL + '/DeleteMessage',
		data:{id:s},
		header: { 'content-type': 'application/json' },
		success: function (res) {
			console.log(res);
			if (res.statusCode == 200) {
				console.log(res.data);
			}
			else {
				wx.showToast({
					title: '资产转移失败，请联系管理员！',
					icon: 'none',
					duration: 2000
				})
			}
		}
	})
}


function MessageSubmit(messageFrom,messageTo,messageContext,messageType,messageSource) {
	console.log(messageFrom + "," + messageTo+","+messageContext);
	wx.request({
		method: 'POST',
		url: app.globalData.BaseURL + 'messageSubmit',
		data: { messageFrom: messageFrom,messageTo:messageTo,messageContext:messageContext,messageType:messageType,messageSource:messageSource },
		header: { 'content-type': 'application/json' },
		success: function (res) {
			console.log(res);
			if (res.statusCode == 200) {
				console.log(res.data);
			}
			else {
				wx.showToast({
					title: '消息发送失败！',
					icon: 'none',
					duration: 2000
				})
			}
		}
	})
}

//加上自定义的方法（作用：将模块接口暴露出来），否则会报错：util.trim is not a function;
module.exports = {
	DeleteMessage: DeleteMessage,
	MessageSubmit:MessageSubmit
}