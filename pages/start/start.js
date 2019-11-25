//login.js
//获取应用实例
var app = getApp();
function countdown(that) {
  var second = that.data.second;
    if (second == 0) {
      wx.redirectTo({
        url: '/pages/index/index'
      })
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)

}
Page({
  data: {
    second: 4
  },

  home: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  tapBanner: function (e) {
      wx.redirectTo({
        url: "/pages/index/index"
      })
  },
  onLoad: function () {
    var that = this;
    countdown(that);
    wx.request({
      url: app.globalData.BaseURL + '/resource/boe/start',
      data: {
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            start: res.data.data
          });
        }
      }
    })

  }
});