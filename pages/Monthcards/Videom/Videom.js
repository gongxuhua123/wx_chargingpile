Page({

  /**
   * 页面的初始数据
   */
  data: {
    headstxt: '索捷智充',
    titles: '福泽小区',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt=this;
    // console.log("gcj02  wgs84");
    // wx.getLocation({
    //   type: 'gcj02',
    //   isHighAccuracy:true,
    //   altitude:true,
    //   success(res) {
    //     console.log(res, "getLocation")
    //   },
    //   fail(res){
    //     console.log("失败",res);
    //   }
    // });

    // wx.chooseLocation({
    //   latitude:'31.135479329427085',
    //   longitude:'121.50062527126737',
    //   success(res) {
    //     console.log(res, "chooseLocation")
    //   }
    // });
  //  dt.getsaoma();
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  // error(e) {
  // console.error('live-player error:', e.detail.errMsg)
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 获取小程序吗
   */
  getsaoma(){
     wx.request({
       url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe8f5a5e238189c80&secret=1ea1a2062583d2d12bb8aea05c3eb01d',
      data: '',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res,"aaa");
         wx.request({
           url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.access_token,
          data: {
            scene:'0800000001',
            path:'/'
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (resf) {
            console.log(resf,"二维啊");
          },
        })
      },
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})