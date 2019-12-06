// pages/task/home/home.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取应用实例
    paddingCount: 0,
    alreadyCount: 0,
    alertCount: 0,
    iconList: [{
      icon: 'list',
      color: 'white',
      badge: 0,
      name: '进行中',
      type: 2,
      url: 'detail'
    }, {
      icon: 'check',
      color: 'white',
      badge: 0,
      name: '已完成',
      type: 1,
      url: 'detail'
    }, {
      icon: 'notice',
      color: 'white',
      badge: 0,
      name: '提醒',
      type: 3,
      url: 'detail'
    }, 
    // {
    //   icon: 'comment',
    //   color: 'white',
    //   badge: 0,
    //   name: '通知',
    //   url: 'notice'
    // }, 
    ],
    dayStyle: [],
    dataList: [],
    msg:'CIM课同事尽快完成绩效信息填报工作'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // 获取消息信息
    this.refresh();

  },

  dayClick: function(event) {
    wx.navigateTo({
      url: '/pages/task/detail/detail?dataObj=' + JSON.stringify(event.detail),
    })
  },
  //前一个月
  prev: function(event) {
    var tempData = this.data.dataList;
    var dayData = new Array();
    for (var i = 0; i < tempData.length; i++) {
      if (new Date(tempData[i].TaskDate).getMonth() + 1 == event.detail.currentMonth && new Date(tempData[i].TaskDate).getFullYear() == event.detail.currentYear) {
        //将内容数据转换为对象
        dayData.push({
          month: 'current',
          day: new Date(tempData[i].TaskDate).getDate(),
          color: 'white',
          background: '#DC143C'
        })
      }
    }
    this.setData({
      dayStyle: dayData
    })
  },
  //下一个月
  next: function(event) {
    var tempData = this.data.dataList;
    var dayData = new Array();
    for (var i = 0; i < tempData.length; i++) {
      if (new Date(tempData[i].TaskData).getMonth() + 1 == event.detail.currentMonth && new Date(tempData[i].TaskData).getFullYear() == event.detail.currentYear) {
        //将内容数据转换为对象
        dayData.push({
          month: 'current',
          day: new Date(tempData[i].TaskData).getDate(),
          color: 'white',
          background: '#DC143C'
        })
      }
    }
    this.setData({
      dayStyle: dayData
    })
  },
  //选择月份
  dateChange: function(event) {
    var tempData = this.data.dataList;
    var dayData = new Array();
    for (var i = 0; i < tempData.length; i++) {
      if (new Date(tempData[i].TaskData).getMonth() + 1 == event.detail.currentMonth && new Date(tempData[i].TaskData).getFullYear() == event.detail.currentYear) {
        //将内容数据转换为对象
        dayData.push({
          month: 'current',
          day: new Date(tempData[i].TaskData).getDate(),
          color: 'white',
          background: '#DC143C'
        })
      }
    }
    this.setData({
      dayStyle: dayData
    })
  },
  refresh() {
    let that = this;
    // 获取消息信息
    wx.request({
      url: app.globalData.BaseURL + '/task/boe/' + 'admin',
      //真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${app.globalData.token}`
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == 'No Token' || res.data == 'token过期') {
          wx.showToast({
            title: '登陆超时，请重新登陆',
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        } else {
          var dayData = new Array();
          var completedCount = 0;
          var paddingCount = 0;
          var alertCount = 0;
          for (var i = 0; i < res.data.data.length; i++) {
            if (new Date(res.data.data[i].TaskDate).getMonth() == new Date().getMonth()) {
              //将内容数据转换为对象
              dayData.push({
                month: 'current',
                day: new Date(res.data.data[i].TaskDate).getDate(),
                color: 'white',
                background: '#DC143C'
              })
            }
            if (res.data.data[i].TaskComplete) {
              completedCount++;
            } else {
              paddingCount++;
              if (res.data.data[i].TaskMargin <= res.data.data[i].TaskAlert) {
                alertCount++;
              }
            }
          }

          let paddingCountBadge = `iconList[0].badge`;
          let alreadyCountBadge = `iconList[1].badge`;
          let alertCountBadge = `iconList[2].badge`;

          that.setData({
            dayStyle: dayData,
            dataList: res.data.data,
            [paddingCountBadge]: paddingCount,
            [alreadyCountBadge]: completedCount,
            [alertCountBadge]: alertCount,
          })
          if (alertCount > 0) {
            wx.showToast({
              title: '有' + alertCount + '项任务提醒',
              image: '/images/tabbar/about.png'
            })
          }
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})