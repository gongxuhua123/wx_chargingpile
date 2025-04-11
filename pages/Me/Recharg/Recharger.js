// pages/tebSwitch/charging-record/charging-record.js
import reque from '../../../utils/request.js';
import datas from '../../../utils/data.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stas: 0,
    ends: 3,
    norecd: false,
    recode: '',
    rechid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt = this;
    dt.recha = dt.selectComponent("#recha");
    if (options.id === '1') {
      dt.setData({
        recode: '充电',
        rechid:1
      });
      dt.recha.startthe(dt.data.stas, dt.data.ends, '上拉');
      // dt.recha.getList(dt.data.stas, dt.data.ends, '上拉');
    } else if (options.id === '2') {
      dt.setData({
        recode: '报修',
        rechid:2
      });
      dt.recha.startthe();
    }
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
    var dt = this;
      dt.setData({
        stas: 0,
        ends: 3
      });
      dt.recha.startthe(0, 3, '下拉');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉");
    var dt = this;
    dt.data.stas += 3;
    dt.data.ends += 3;
    dt.recha.getListtwo(dt.data.stas, dt.data.ends,'上拉');
  },
  parentrun(e) {
    this.setData({
      norecd: e.detail
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})