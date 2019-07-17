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
    //首页幻灯片
    var that =this;
    wx.request({
      url: app.globalData.BaseURL + '/banner/list',
      data: {
        type: 'home'
      },
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            banners: res.data.data
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