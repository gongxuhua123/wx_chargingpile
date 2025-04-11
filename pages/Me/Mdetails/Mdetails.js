// pages/Me/Mdetails/Mdetails.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    headstxt: '',
    Mlist: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt = this;
    var lists = JSON.parse(options.query);
    var heads = '';
    if (lists.recSta == 0 || lists.recSta == 1) {
      heads = '月卡详情页';
    } else {
      heads = '共享详情页';
    }
    dt.setData({
      Mlist: lists,
      headstxt: heads
    });
    console.log(dt.data.Mlist, heads, "6666");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {

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