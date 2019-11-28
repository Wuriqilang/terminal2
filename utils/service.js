function resolve(str) {
  var result = '功能开发中！'
  wx.request({
    url: 'http://api.qingyunke.com/api.php?key=free&appid=0&msg=' + str,
    data:{},
    success:(res)=>{
      if (res.data.result == 0) {
        console.log(res.data)
        result= res.data.content;
        return result;
      }
    }
  })
}

module.exports ={
  resolve: resolve,
}