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
      url: app.globalData.BaseURL + '/resource/boe/toptopic',
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
              url: app.globalData.BaseURL + '/articlesHot/boe/'+kbarr[i],
              success: function (res) {
                console.log(res.data)
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
					url: '/pages/' + e.currentTarget.dataset.id
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
    tapToptic:function(e){
      if (e.currentTarget.dataset.id != 0 && e.currentTarget.dataset.type=='file') {
        wx.request({
          url: app.globalData.BaseURL + '/articleDetail/boe/' + e.currentTarget.dataset.id,
          data: {
          },
          success: function (res) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '读取文件中',
                icon:'none'
              })
              var fileUrl = res.data.data.Context;
              console.log(fileUrl)
              wx.downloadFile({
                url: fileUrl,
                success: function (res) {
                  console.log(res)
                  var filePath = res.tempFilePath
                  wx.openDocument({
                    filePath: filePath,
                    success: function (res) {
                      console.log('打开文档成功')
                    }

                  })
                }
              })
            }
          }
        })
      } else if (e.currentTarget.dataset.id != 0 && e.currentTarget.dataset.type=='html') {
        wx.navigateTo({
          url: '/pages/topics/articleDetailH5/articleDetailH5?articleID=' + e.currentTarget.dataset.id
        })
      }
    },
    tapNeeds(){
      wx.navigateTo({
        url: '/pages/add/needs/needs'
      })
    }
  }
})