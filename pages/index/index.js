//index.js
//获取应用实例
import reque from '../../utils/request.js';
Page({
  data: {
    number: 3,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    var dt = this;
    const res = wx.getStorageSync('token');
    dt.timeouy = setTimeout(function() {
      if (res === undefined || res === '') {
        wx.redirectTo({
          url: '../login/phone/phone',
        })
      } else {
        wx.switchTab({
          url: '../Monthcards/Monthcards',
        })
      };
      clearTimeout(dt.data.timeouy);
    }, 2000);
  },
  saoma() {
    wx.scanCode({
      success(res) {
        console.log(res, "扫码信息");
        // pages/index/index?scene=000901180001
        const tableNum = decodeURIComponent(res.path).split("=")[1] || null;
        if (tableNum) {
          console.log("扫到二维码", tableNum);
          getApp().globalData.tableNum = tableNum;
          reque.userlogin(tableNum);
          setTimeout(function() {
            if (getApp().globalData.tableNum == null && getApp().globalData.phoneNum == null) {
              console.log("没有获取到小区位置和手机号");
              wx.redirectTo({
                url: '/pages/login/lddress/lddress',
              });
            } else if (getApp().globalData.tableNum != null && getApp().globalData.phoneNum == null) {
              console.log("获取到小区位置,没有手机号");
              wx.redirectTo({
                url: '/pages/login/phone/phone',
              });
            } else if (getApp().globalData.tableNum != null && getApp().globalData.phoneNum != null) {
              console.log("获取到小区位置和手机号");
              wx.switchTab({
                url: '/pages/Monthcards/Monthcards'
              })
            };
          }, 3000);
        } else {
          wx.showToast({
            title: '没有扫到二维码',
          })
        }
      }
    })
  }
})