//获取应用实例
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    flag: true,
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 800,
    swiperCurrent: 0,
    selectCurrent: 0,
  },
  //生命周期函数
  attached() {
    //首页广告大图
    var that =this;
    wx.request({
      url: app.globalData.BaseURL + '/resource/terminal/ad',
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            banners: res.data.data
          });
        }
      }
    })
    //首页菜单栏
    wx.request({
      url: app.globalData.BaseURL + '/resource/terminal/menu',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            menu: res.data.data
          });
        }
      }
    })
    //推荐信息
    wx.request({
      url: app.globalData.BaseURL + '/resource/terminal/suggest',
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            suggest: res.data.data
          });
        }
      }
    })
    //跳蚤市场置顶信息
    wx.request({
      url: app.globalData.BaseURL + '/resource/terminal/tiaozao',
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            tiaozao: res.data.data
          });
        }
      }
    })
  },

  methods: {
    //事件处理函数
    swiperchange: function (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
  }


})