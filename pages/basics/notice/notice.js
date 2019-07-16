var utils = require('../../../utils/util.js')
//获取应用实例
const app = getApp();
//调用方法组
var query = require('../../../utils/query.js');


Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    TabCur: 0,
    scrollLeft: 0,
    index: null,
    picker: ['所有人', '管理员',],
    textareaAValue: '',
    porperty: '',
    img: []
  },
  //组件创建时，获取数据
  onLoad() {
    let that = this;
    // 获取消息信息
    wx.request({
      url: app.globalData.BaseURL + 'message/forecast/admin', //真实的接口地址
      data: {},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        }
        else {
          console.log(res.data);
          var messageData = res.data;
          that.setData({
            Message: res.data //设置数据
          })

        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  formBindSubmit(e) {
    console.log(e.detail.value);
    //为部门重新赋值
    e.detail.value.messageTo = this.data.picker[e.detail.value.messageTo];
    var messageTo = 'admin';
    if (e.detail.value.messageTo == '所有人') {
      messageTo = 'all';
    }
    var that = this;
    setTimeout(function () {
      query.MessageSubmit('admin', messageTo, e.detail.value.messageContext, '通知','forecast')
    }, 1000);
    wx.showToast({
      title: '公告发布成功!',
    }, 2000)
    
    // 获取消息信息
    wx.request({
      url: app.globalData.BaseURL + 'message/forecast/admin', //真实的接口地址
      data: {},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data);
        var messageData = res.data;
        that.setData({
          Message: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    setTimeout(function(){
      that.setData({
        TabCur: 0
      })
    },1000)
	}, 
	showModal(e) {
		this.setData({
			modalName: e.currentTarget.dataset.target
		})
	},
	hideModal(e) {
		this.setData({
			modalName: null
		})
	},
	smsToAll(e){
		var messageType = 0;
		this.SetMessage(messageType);
	},
	smsToPadding(e) {
		var messageType = 1;
		this.SetMessage(messageType);
	},
	smsToTest(e) {
		var messageType = 2;
		this.SetMessage(messageType);
	},
	SetMessage(messageType){
		var that = this;
		wx.request({
			method: 'POST',
			url: app.globalData.BaseURL + 'forecastSMS',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Bearer ${app.globalData.token}`
			},
			data:
			{
				date: utils.formatTimeToMonth(new Date()),
				messageType: messageType,
				testPhone: that.data.testPhone
			},
			success: function (res) {
				console.log(res);
				if (res.statusCode == 200) {
					wx.showToast({
						title: res.data.code,
						icon: 'success',
						duration: 2000
					})
					setTimeout(() => {
						that.hideModal(); //隐藏modal框
					}, 1000)

				} else {
					wx.showToast({
						title: '删除失败！',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
		this.hideModal();
	},
	testPhoneInput(e){
		this.setData({
			testPhone:e.detail.value
		})
	},
  methods: {
    onShareAppMessage() {
      return {
        title: 'ColorUI-高颜值的小程序UI组件库',
        imageUrl: 'https://image.weilanwl.com/color2.0/share2215.jpg',
        path: '/pages/basics/home/home'
      }
    },
  },
})