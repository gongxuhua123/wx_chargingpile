// pages/Me/Orderm/Orderm.js
import reque from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordermtype: false,
    mencen: false,
    lexing: '0',
    years: null,
    months: null,
    typeList: [],
    dingdanjil: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt = this;
    dt.setData({
      years: new Date().getFullYear(),
      months: new Date().getMonth() + 1,
    });
    dt.prompt = dt.selectComponent("#prompt");
    dt.getList();
  },
  totransmitdata(e){
    var dt=this;
    console.log(e,"cdcdcdcd");
    dt.setData({
      ordermtype:e.detail
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 
   */
  getList() {
    var dt = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    console.log(dt.data.months, dt.data.years,"时间");
    const obj = {
      id: 1307,
      month: dt.data.months,
      tableNum: getApp().globalData.tableNum,
      phoneNum: getApp().globalData.phoneNum,
      year: dt.data.years,
    };
    reque.requesa(reque.demos.buyorder, {
      userId: wx.getStorageSync('userid')
    }, res => {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      console.log("获取订单列表", res);
      // if (resd[0].status == "fail") {
      //   wx.showToast({
      //     title: resd[0].msg,
      //     icon: 'none',
      //     duration: 2000
      //   });
      //   dt.setData({
      //     dingdanjil: true,
      //     years: dt.data.years,
      //     months: dt.data.months,
      //     typeList: resd[0].data
      //   })
      // } else {
      //   dt.setData({
      //     typeList: resd[0].data,
      //     dingdanjil: false
      //   });
      // }
    });
  },
  /**
   * 全部交易类型
   */
  alltypesof(e) {
    var dt = this;
    dt.prompt.alltypesof();
  },
  /**
   * 时间选择器
   */
  bindDateChange: function(e) {
    var dt = this;
    var dat = e.detail.value.split("-");
    dt.setData({
      years: dat[0],
      months: dat[1]
    });
    dt.getList();
    console.log('时间选择器', e, dat, dt.data.year, dt.data.moth);
  },
  /**
   * 
   */
  bindDatecolumn(e){
    console.log('时间选择器222', e,);
  },
  goDetailsPage(e) {
    console.log(e, "订单详情");
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/Me/Mdetails/Mdetails?query=' + JSON.stringify(item),
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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