//app.js
import reque from "/utils/request.js";
App({
  onLaunch: function(options) {
    var dt=this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              dt.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (dt.userInfoReadyCallback) {
                dt.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    // 获取更新信息
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate, "请求完新版本信息的回调")
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });
    updateManager.onUpdateFailed(function (res) {
      console.log(res,"新版本跟新失败");
      // 新版本下载失败
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    tableNum: null,
    phoneNum: null,
    villageName: null,
    syst:null,
    screenHeight:0
  }

  // {
  //   "pagePath": "pages/Sharedpark/Sharedpark",
  //   "text": "共享车位",
  //   "color": "#3E4857",
  //   "selectedColor": "#57DDBA",
  //   "backgroundColor": "#ffffff",
  //   "iconPath": "imag/cc1.png",
  //   "selectedIconPath": "imag/cc2.png"
  // },
  // pages/index/index?scene=000901180002
})