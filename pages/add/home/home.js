// pages/add/home/home.js
const app = getApp();
//调用日期组件
import utils from '../../../utils/util.js'
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    date: '',
    yingyezhizhaobianhao: '',
  },
  //生命周期函数
  attached() {
    //日期初始化
    this.setData({
      date: utils.formatTimeToMonth(new Date()),
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    DateChange(e) {
      this.setData({
        date: e.detail.value,
      })
    },
    SubmitForecast(e) {
      var forecastInform = e.target.dataset.target;
      wx.navigateTo({
        url: "/pages/add/addPage/addPage?Nashuirenmingcheng=" + forecastInform.Nashuirenmingcheng + '&id=' + forecastInform.id + '&date=' + this.data.date
      })
    },
    yingyezhizhaobianhaoInput(e) {
      this.setData({
        yingyezhizhaobianhao: e.detail.value
      })
    },
    submitStart(e) {
      //判断是否有输入
      if (this.data.yingyezhizhaobianhao.length == 0) {
        wx.showToast({
          title: '请输入单位信息!',
          icon: 'none'
        })
      } else {
        var that = this;
        wx.request({
          url: app.globalData.BaseURL + 'forecastUser/' + this.data.yingyezhizhaobianhao,
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${app.globalData.token}`
          },
          success: res => {
            if (res.data) {
							wx.showToast({
								title: '登录中!',
								icon:'loading'
							})
							setTimeout(function () {
								wx.navigateTo({
									url: "/pages/add/addPage/addPage?Nashuirenmingcheng=" + res.data.Nashuirenmingcheng + '&id=' + res.data.id + '&date=' + that.data.date
								})
							}, 1000);

            } else {
              wx.showToast({
                title: '未找到纳税单位!',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  }
})