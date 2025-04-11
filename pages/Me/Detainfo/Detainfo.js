// pages/Me/Detainfo/Detainfo.js
import reque from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: false,
    detalist: [],
    dyu: [{
      IDCardNum: '"310101199011111514"',
      cw_list: [{
          cardNum: ['62198662563', '62198662563', '62198662563'],
          crDate: "2019-11-11",
          cwPos: 'B区02',
          expDate: "2019-12-10",
          isOwn: 1
        },
        {
          cardNum: ['62198662565', '62198662563'],
          crDate: "2019-11-11",
          cwPos: 'B区03',
          expDate: "2019-12-10",
          isOwn: 0
        }
      ],
      houseName: '2号',
      phoneNum: '"13240666795"',
      userName: '龚旭华'
    }]
  },
  /**
   * 续费
   */
  xufei() {
    wx.navigateTo({
      url: '../Renewal/Renewal',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt = this;
    dt.getDetail();
  },
  getDetail() {
    var dt = this;
    wx.showLoading({
      title: '加载中',
    });
    reque.requesa(reque.demo.detail, {
      id: 1306,
      phoneNum: getApp().globalData.phoneNum,
      tableNum: getApp().globalData.tableNum,
    }, res => {
      wx.hideLoading();
      console.log("获取我的详细信息", res);
      if (res.data.code === 0) {
        console.log(JSON.parse(res.data.data));
        let resd = JSON.parse(res.data.data);
        if (resd[0].status === 'success') {
          for (var i = 0; i < (resd[0].cw_list).length; i++) {
            let cwPos = resd[0].cw_list[i].cwPos.replace(',', '区');
            resd[0].cw_list[i].cwPos = cwPos;
          }
          dt.setData({
            detalist: resd,
            record: false
          })
        } else {
          wx.showToast({
            title: resd[0].msg,
            icon: 'none',
            duration: 1500
          });
          dt.setData({
            record: true
          })
        }
      } else {
        dt.setData({
          record: true
        })
        console.log('code=1-----', res);
      }
    }, res => {
      wx.hideLoading();
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
    this.getDetail();
  }
})