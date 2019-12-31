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
    toggleDelay: false, 
    modalName:"",
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //需求列表
    this.needList();
  },
  needList(){
    var that = this;
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
    let id = e.currentTarget.dataset.id;
    wx.request({
      method:'PUT',
      url: app.globalData.BaseURL + '/needsStar/boe/' + id,
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            comments: res.data.data
          });
        }
      }
    })
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton
    })
    setTimeout(function () {
      that.setData({
        animation: ''
      },
      that.needList()//数据更新
    )
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
      commentID:e.currentTarget.dataset.id,
      modalName: e.currentTarget.dataset.target
    })
  },
  showModal2(e) {
    //获取评论列表
    var that = this;
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.request({
      url: app.globalData.BaseURL + '/comments/boe/'+id,
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            comments: res.data.data
          });
        }
      }
    })
    this.setData({
      id: e.currentTarget.dataset.id,
      modalName: e.currentTarget.dataset.target
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },


  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  submitComment(){
    let id = this.data.commentID
    let comment = {
      From : 'CIM'+' admin',
      Context:this.data.textareaAValue,
      Type:'needs'
    }
    var that = this;
    wx.request({
      method: 'POST',
      url: app.globalData.BaseURL + '/comments/boe/' + id,
      data: comment,
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          wx.showToast({
            title: '提交成功！'
          })
          that.hideModal();
          that.setData({
            textareaAValue:''
          })
          that.needList();
        }
      }
    })
  },
  toArticle(e){
    console.log(e.currentTarget.dataset.id);
    if(e.currentTarget.dataset.id == ''){
      wx.showToast({
        title: '暂无成果分享',
        icon:"none"
      })
      return;
    }
    let articleInfo='';
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})