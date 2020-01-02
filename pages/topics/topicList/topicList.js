// pages/topics/topicList/topicList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //需求列表
    var that = this;
    wx.request({
      url: app.globalData.BaseURL + '/TestList/boe',
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            testList: res.data.data
          });
        }
      }
    })
  },

  toTest(e) {
    console.log(e);
    if (e.currentTarget.dataset.item.Context == '') {
      wx.showToast({
        title: '尚未生成试卷',
        icon: "none"
      })
      return;
    }
    let TestInfo = e.currentTarget.dataset.item;
    if(TestInfo.type=='link'){
      wx.navigateTo({
        url: '/pages/webView/webView?url=https://ks.youkaoshi.cn/doexam/NRg4ywvM90.html&title=' + TestInfo.Title,
      })
    }
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})