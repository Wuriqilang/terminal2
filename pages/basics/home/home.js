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
      url: app.globalData.BaseURL + '/resource/boe/banner',
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
      url: app.globalData.BaseURL + '/resource/boe/menu',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            menu: res.data.data
          });
        }
      }
    })
    //OIC
    wx.request({
      url: app.globalData.BaseURL + '/resource/boe/oic',
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            suggest: res.data.data
          });
        }
      }
    })
    //需求市场
    wx.request({
      url: app.globalData.BaseURL + '/resource/boe/needs',
      success: function (res) {
        if (res.data.code == 0) {
          var kb = res.data.data[0].remark;
          var kbarr = kb.split(',');
          that.setData({
            needs: res.data.data
          });
          var needsList = [];
          for (var i = 0; i < kbarr.length; i++) {
            wx.request({
              url: app.globalData.BaseURL + '/needs/boe/' + kbarr[i],
              success: function (res) {
                if (res.data.code == 0) {
                  needsList.push(res.data.data);
                }
                that.setData({
                  needsList: needsList
                });
              }
            })
          }
        }
      }
    })
    //专栏信息
    wx.request({
      url: app.globalData.BaseURL + '/resource/terminal/toptopic',
      success: function (res) {
        if (res.data.code == 0) {
          var kb = res.data.data[0].remark;
          var kbarr = kb.split(',');
          that.setData({
            toptopic: res.data.data
          });
          var toptopics = [];
          for (var i = 0; i < kbarr.length; i++) {
            wx.request({
              url: app.globalData.urls + '/cms/boe/'+kbarr[i],
              success: function (res) {
                if (res.data.code == 0) {
                  toptopics.push(res.data.data);
                }
                that.setData({
                  toptopics: toptopics
                });
              }
            })
          }
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
		tapMenu: function (e) {
			if (e.currentTarget.dataset.id != 0) {
				wx.navigateTo({
					url: '/pages/basics/' + e.currentTarget.dataset.id + '/' + e.currentTarget.dataset.id
				})
			}
		},
		tapOIC: function (e) {
			if (e.currentTarget.dataset.id != 0) {
				wx.navigateTo({
					url: '/pages/oic/' + e.currentTarget.dataset.id + '/' + e.currentTarget.dataset.id
				})
			}
		},
  }


})