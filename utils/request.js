// request.js
const url = "https://chargeapts.surejoytek.com/";
// https://chargeapts.surejoytek.com/
// https://minipro.utools.club/
const demo = {
  noscn: `${url}loginByNoScan`, //非扫码进入
  byscn: `${url}loginByScan`, //扫码进入
  posFirs: `${url}community/posFirst`, //定位小区 获取区域
  posSecond: `${url}community/posSecond`, //根据区域 获取小区列表
  posThird: `${url}community/posThird`, //确定选择小区
  code: `${url}code`, //获取手机验证码
  getName: `${url}community/getName`, //获取小区列表  
  charge: `${url}charge/list`, //充电记录   
  orderlist: `${url}order/list`, //订单列表
  detail: `${url}user/detail`, //我的详细信息
  community: `${url}community/switchCommuntity`, //切换小区
  monthsca: `${url}index`, //月卡车位
  info: `${url}info`, //开锁  报修 绑定户主  保修记录
  powerOn: `${url}charge/powerOn`, //充电
  powerOff: `${url}charge/powerOff`, //断电
  register: `${url}user/register` //注册
};
const demos = {
  logins: `${url}weChat/weChatLogin`, //登录方法
  commun: `${url}weChat/getCommunityInfoByUserId`, //获取用户小区信息
  commid: `${url}weChat/getCardInfoByUserIdCommunityId`, //获取车位端口信息
  opendor: `${url}weChat/doorSetDoorOpen`, //开门
  stopcha: `${url}weChat/chargePortStop`, //结束充电
  startch: `${url}weChat/chargePortStart`, //开始充电
  buyorder: `${url}weChat/chargeBuyOrder`, //充值记录
  faultorder: `${url}weChat/chargeFaultOrder`, //维修记录
  timesrecent: `${url}weChat/chargeTimesRecent`, //用电次数
  usedorder: `${url}weChat/chargeUsedOrder`, //用电记录
  addMini: `${url}faultDevice/addMini`, //用户报修
}

function userlogin(tableNum) {
  var dt = this;
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      let apiLogin = null;
      let datas = {};
      if (tableNum == null) {
        apiLogin = dt.demo.noscn;
        datas = {
          id: 1310,
          code: res.code
        };
        console.log('非扫码', dt.demo.noscn);
      } else {
        apiLogin = dt.demo.byscn;
        datas = {
          id: 1311,
          code: res.code,
          tableNum: tableNum
        };
        console.log('扫码');
      };
      dt.requesa(apiLogin, datas, function (ress) {
        var datas = JSON.parse(ress.data.data);
        console.log(ress, "登录方法返回数据", datas);
        if (ress.data.code === 0) {
          getApp().globalData.openid = datas[0].openid || null;
          if (ress.data.data != '') {
            if (datas[0].data) {
              getApp().globalData.tableNum = datas[0].data.tableNum || null;
              getApp().globalData.phoneNum = datas[0].data.phoneNum || null;
              const vile = datas[0].data.villageName || '';
              const village = vile.split(",");
              getApp().globalData.villageName = village[0] || null;
            };
          } else {
            wx.showToast({
              title: '没有接收到数据',
              icon: 'loading',
              duration: 1500
            })
          }
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 3000
          });
        }
      }, function (resf) {
        console.log("接入失败");
      });
    }
  })
}

function requesa(url, data, suces, fail, token) {
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'X-Access-Token': wx.getStorageSync('token')
    },
    data: data,
    method: 'POST',
    success: suces,
    fail: (res) => {
      wx.hideToast();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      wx.showToast({
        title: '等待服务启动',
        icon: 'loading',
        duration: 2000
      })
    },
  })
};

function requesb(url, data, suces, fail) {
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    success: suces,
    fail: fail,
  })
};
module.exports = {
  demo: demo,
  demos: demos,
  userlogin: userlogin,
  requesa: requesa,
  requesb: requesb
}