var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');

Page({
  data: {
  },
  onLoad: function (e) {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    var topictitle = that.data.topictitle;
    wx.request({
      url: app.globalData.BaseURL + '/articleDetail/boe/'+e.articleID,
      data: {
      },
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            article: res.data.data,
            articleTitle: res.data.data.Title,
            articleZuozhe:res.data.data.Zuozhe,
            TitleImage:res.data.data.TitleImage
          });
          WxParse.wxParse('article', 'html', res.data.data.Context, that, 5);

        }
      }
    })

  },
  onShareAppMessage: function (e) {
    return {
      title: this.data.topictitle,
      path: 'pages/topic/index?id=' + this.data.topid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


})