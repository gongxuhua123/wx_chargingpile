// pages/renewal/renewal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnenew: [{
        yue: '一',
        jine: '9'
      },
      {
        yue: '二',
        jine: '18'
      },
      {
        yue: '三',
        jine: '27'
      },
      {
        yue: '四',
        jine: '36'
      },
      {
        yue: '五',
        jine: '45'
      },
      {
        yue: '六',
        jine: '54'
      },
      {
        yue: '七',
        jine: '63'
      },
      {
        yue: '八',
        jine: '72'
      },
      {
        yue: '九',
        jine: '81'
      }
    ],
    chooseas: 99,
    chooseas2: false,
    mencen: true,
    blocks: [{
      pfai: false
    }],
    pullup: false
  },
  /**
   * 选择充值金额
   */
  choosea(e) {
    var dt = this;
    console.log(e.currentTarget.id);
    let chooseas = dt.data.chooseas;
    if (chooseas == e.currentTarget.id) {
      chooseas = 99;
    } else {
      chooseas = e.currentTarget.id;
    };
    dt.setData({
      chooseas: chooseas
    });
  },
  /**
   * 确认充值
   */
  queren(e) {
    var dt = this;
    let chooseas = dt.data.chooseas;
    let pullup = dt.data.pullup;
    console.log(e, "chooseas2");
    if (pullup) {
      dt.setData({
        pullup: false
      });
      console.log(dt.data.pullup, "123");
    } else {
      dt.setData({
        pullup: true
      });
      console.log(dt.data.pullup, "465");
    }
  },
  /**
   * 确认支付
   */
  Confpayment(e) {
    var dt = this;
    wx:wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: 'prepay_id=',
      signType: '',
      paySign: 'MD5',
      success: function(res) {},
      fail: function(res) {
        console.log("支付失败");
        dt.setData({
          pullup: false
        })
      },
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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