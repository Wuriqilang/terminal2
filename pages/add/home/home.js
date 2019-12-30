// pages/add/home/home.js
const app = getApp();
//调用日期组件
import utils from '../../../utils/util.js'
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    imgList: [],
    img: [],
    textareaAValue: '',
    picker: ['合理化建议', '改善Memo', '等级提案','CIM需求'],
    index: null

  },
  //生命周期函数
  attached() {
    //日期初始化
    this.setData({
      date: utils.formatTimeToMonth(new Date()),
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    DateChange(e) {
      this.setData({
        date: e.detail.value,
      })
    },
    PickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      })
    },
    textareaAInput(e) {
      this.setData({
        textareaAValue: e.detail.value
      })
    },
    ChooseImage() {
      wx.chooseImage({
        count: 4, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //从相册选择
        success: (res) => {
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })
          }
        }
      });
    },
    ViewImage(e) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      wx.showModal({
        title: '删除',
        content: '确定要删除该图片吗？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList
            })
          }
        }
      })
    },
    submitStart(e) {
      //console.log(e.detail.value);
      //为改善类型赋值
      e.detail.value.Type = this.data.picker[e.detail.value.type];
      e.detail.value.Context = this.data.textareaAValue;
      console.log(e.detail.value);
      //将图片进行上传
      this.upload();
      //判断是否有输入
      var that = this;
      setTimeout(function () {
        e.detail.value.imgPath = that.data.img;
        console.log(e.detail.value);
        wx.request({
          method: 'POST',
          url: app.globalData.BaseURL + '/needs/boe', //接口地址
          data: e.detail.value,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            if (res.statusCode == 200) {
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                userName: '',
                userID: '',
                textareaAValue: ''
              })
            } else {
              wx.showToast({
                title: '失败，请注意输入格式！',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log('Error' + ':' + res)
          }
        })
      }, 1000);

    },
    upload: function () {
      var that = this;
      console.log(that.data.imgList)
      //return new Promise(function(reslove, reject){
      for (var i = 0; i < that.data.imgList.length; i++) {
        console.log(app.globalData.BaseURL + '/imgUpload')
        wx.uploadFile({
          url: app.globalData.BaseURL + '/imgUpload',
          filePath: that.data.imgList[i],
          name: 'picture',
          success: function (res) {
            var imgData = JSON.parse(res.data)
            if (that.data.img.length != 0) {
              that.setData({
                img: that.data.img.concat("," + app.globalData.BaseURL + imgData.imgPath)
              })
              //reslove('ok');
            } else {
              that.setData({
                img: app.globalData.BaseURL.substr(0, app.globalData.BaseURL.length - 1) + imgData.imgPath
              })
            }
          }
        })
      }
    }


  }
})