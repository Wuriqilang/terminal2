// pages/add/needs/needs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    needsList:[],
    showIndex:0,
    suggestID:"",
    textareaAValue: '',
    toggleDelay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //需求列表
    var that =  this;
    wx.request({
      url: app.globalData.BaseURL + '/needsList/boe',
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            needsList: res.data.data
          });
        }
      }
    })
  },
  toggle(e) {
    console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton
    })
    setTimeout(function () {
      that.setData({
        animation: ''
      })
    }, 1000)
  },
  toggleDelay() {
    var that = this;
    that.setData({
      toggleDelay: true
    })
    setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 1000)
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },
  showModal(e) {
    this.setData({
      suggestID:e.currentTarget.dataset.id,
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  toArticle(e){
    console.log(e.currentTarget.dataset.id);
    wx.showToast({
      title: '功能开发中',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})