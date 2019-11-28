// pages/service/service.js
var util = require('../../../utils/service.js')

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
    InputBottom: 50,
    Input:"",
    chats: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    InputFocus(e) {
      this.setData({
        InputBottom: e.detail.height+50
      })
    },
    InputBlur(e) {
      this.setData({
        InputBottom: 50,
        Input:e.detail.value
      })
    },
    tapSubmit(e){
      var chats = this.data.chats;
      let input = this.data.Input;
      let userChat = {
        character:'user',
        context:input,
        date: new Date().toLocaleTimeString()
      }
      chats.push(userChat);
      this.setData({
        chats:chats
      })
      this.service(input);
    },
    service(input){
      wx.request({
        url: 'http://api.qingyunke.com/api.php?key=free&appid=0&msg=' + input,
        data: {},
        success: (res) => {
          if (res.data.result == 0) {
            console.log(res.data)
            var chats = this.data.chats;
            //解析用户输入返回相应数据
            let output = res.data.content;
            let robotChat = {
              character: 'robot',
              context: output,
              date: new Date().toLocaleTimeString()
            }
            chats.push(robotChat);
            this.setData({
              chats: chats
            })
          }
        }
      })
    }
  }
})
