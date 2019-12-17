//login.js
//获取应用实例
var app = getApp();
function countdown(that) {
  var second = that.data.second;
  console.log(getCurrentPages()[getCurrentPages().length-1].route)
  if (second == 0 && getCurrentPages()[getCurrentPages().length - 1].route!='pages/index/index') {
      wx.redirectTo({
        url: '/pages/index/index'
      })
      return;
  } else if (getCurrentPages()[getCurrentPages().length - 1].route == 'pages/index/index'){
    return;
  }
  else{
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      });
      countdown(that);
    }, 1000)
  }


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