// pages/study/home/home.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    topicList: []
  },
  attached(){
    var that = this;
    wx.request({
      url: app.globalData.BaseURL + '/topicList/boe',
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            topicList: res.data.data
          });
        }
      }
    })
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    toArticle(e) {
      console.log(e.currentTarget.dataset.id);
      if (e.currentTarget.dataset.id == '') {
        wx.showToast({
          title: '暂无成果分享',
          icon: "none"
        })
        return;
      }
      let articleInfo = '';
      //根据id获取文章信息
      wx.request({
        url: app.globalData.BaseURL + '/articleDetail/boe/' + e.currentTarget.dataset.id,
        data: {
        },
        success: function (res) {
          if (res.data.code == 0) {
            articleInfo = res.data.data;
            console.log(articleInfo);
            if (articleInfo.type == 'file') {
              wx.request({
                url: app.globalData.BaseURL + '/articleDetail/boe/' + articleInfo.id,
                data: {
                },
                success: function (res) {
                  if (res.data.code == 0) {
                    wx.showToast({
                      title: '读取文件中',
                      icon: 'none'
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
            } else if (articleInfo.type == 'html') {
              wx.navigateTo({
                url: '/pages/topics/articleDetailH5/articleDetailH5?articleID=' + articleInfo.id
              })
            }
          }
        }
      })
    },

  }
})
