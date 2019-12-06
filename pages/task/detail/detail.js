// pages/basics/detail/detail.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [],
    title: '',
    date: '2019-01-01',
    tempurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.dataObj!=null){
      var tempDate = JSON.parse(options.dataObj);
      var date = tempDate.year + '-' + tempDate.month + '-' + tempDate.day;
      this.setData({
        title: date,
        tempurl: app.globalData.BaseURL + '/task/boe/admin/' + date,
      })
    }
    else{
      //获取传入的日期数据
      var type = options.type;
      switch (type) {
        case '0':
          {
            this.setData({
              tempurl: app.globalData.BaseURL + '/task/boe/' + 'admin',
              title: "全部任务"
            })
          }
          break;
        case '1':
          {
            this.setData({
              tempurl: app.globalData.BaseURL + '/taskAlready/boe/' + 'admin',
              title: "已完成"
            })
          }
          break;
        case '2':
          {
            this.setData({
              tempurl: app.globalData.BaseURL + '/taskPadding/boe/' + 'admin',
              title: '进行中'
            })
          }
          break;
        case '3':
          {
            this.setData({
              tempurl: app.globalData.BaseURL + '/taskAlert/boe/' + 'admin',
              title: '进行中'
            })
          }
          break;
      }
    }

    console.log(this.data.tempurl);
    var that = this;
    wx.request({
      url: that.data.tempurl,
      //真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${app.globalData.token}`
      },
      success: function (res) {
        //console.log(res);
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        } else {
          console.log(res.data)
          that.setData({
            taskList: res.data.data
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },
  showModal(e) {
    this.setData({
      modalType: '绩效修改',
      modalData: e.target.dataset.target,
    })
  },
  hideModal(e) {
    this.setData({
      modalType: null,
      modalData: null
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  deleteMartisClock(e) {
    //判断用户
    var that = this;
    wx.showModal({
      title: '提醒',
      content: '确定要删除该绩效信息吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          wx.request({
            method: 'POST',
            url: app.globalData.BaseURL + 'martisClock/martisClockDelete',
            data: {
              id: e.target.dataset.target.id
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: res.data.result,
                  icon: 'success',
                  duration: 2000
                })

              } else {
                wx.showToast({
                  title: '操作失败，请联系管理员',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
        that.refresh();
      }
    })

  },
  submitModal(e) {
    //为部门重新赋值
    var that = this;
    var modalData = e.detail.value;
    console.log(modalData);
    wx.request({
      method: 'POST',
      url: app.globalData.BaseURL + 'martisClock/martisClockChange', //接口地址
      data: modalData,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res);
        if (res.statusCode == 200) {
          wx.showToast({
            title: res.data.result,
            icon: 'success',
            duration: 2000
          })
          wx.request({
            url: that.data.tempurl,
            //真实的接口地址
            data: {},
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              //console.log(res);
              if (res.data == 'No Session') {
                wx.navigateTo({
                  url: '/pages/welcome/home/home',
                })
              } else {
                that.setData({
                  martisClockList: res.data
                })
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
        else {
          wx.showToast({
            title: '失败，请注意输入格式！',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log('Error' + ':' + res)
      }
    })
    this.setData({
      modalType: null,
      modalName: null
    })
  },

  refresh() {
    var that = this;
    wx.request({
      url: that.data.tempurl,
      //真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        } else {
          that.setData({
            martisClockList: res.data
          })
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
  onShareAppMessage: function () {

  }
})