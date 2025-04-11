// lddress.js
import reque from "../../../utils/request.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: null,
    regionDataCity: [],
    regionDataCounty: [],
    index: null, //省
    cityIndex: null, //市
    countyIndex: null, //区
    regionData: [],
    residentialArray: [], // 小区列表
    residentialArray2: [],
    residentialIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt = this;
    dt.head = dt.selectComponent("#head");
    reque.requesa(reque.demo.posFirs, {
      id: 1312,
      openid: getApp().globalData.openid,
      // openid: 'oF10K42VGHalLyvhb5Jlu48Gl530',
      vType: 1
    }, res => {
      console.log(res, "获取区域列表");
      if (res.data.code === 0) {
        console.log(JSON.parse(res.data.data));
        const resd = JSON.parse(res.data.data)[0];
        if (resd.status === 'success') {
          let arry = [];
          for (const items in resd.data) {
            arry.push(items);
          }
          dt.setData({
            regionData: arry,
            datas: resd.data
          });
        } else {
          wx.showToast({
            title: resd.msg + getApp().globalData.openid,
            icon: 'none',
            duration: 1500
          })
        }
      } else {
        console.log('code=1----------', res);
      }
    }, res => {
      console.log("获取区域列表失败", res);
    });
  },

  // 省
  bindPickerIndex(e) {
    var dt = this;
    let arry = [];
    let key = dt.data.regionData[e.detail.value];
    for (const items in dt.data.datas[key]) {
      arry.push(items);
    };
    dt.setData({
      index: e.detail.value,
      regionDataCity: arry
    });
  },
  // 市
  bindPickerCityIndex(e) {
    var dt = this;
    let key = dt.data.regionData[e.detail.value];
    let county = dt.data.datas[key][dt.data.regionDataCity[e.detail.value]];
    dt.setData({
      cityIndex: e.detail.value,
      regionDataCounty: county
    });
  },
  // 县
  bindPickerCountyIndex(e) {
    var dt = this;
    dt.setData({
      countyIndex: e.detail.value
    });
    let add = "";
    add = add + dt.data.regionData[dt.data.index];
    add = add + dt.data.regionDataCity[dt.data.cityIndex];
    add = add + dt.data.regionDataCounty[dt.data.countyIndex];
    console.log('县/区', "编号", add)
    reque.requesa(reque.demo.posSecond, {
      id: 1312,
      openid: getApp().globalData.openid,
      // openid: 'oF10K42VGHalLyvhb5Jlu48Gl530',
      vType: 2,
      villageAddr: add
    }, res => {
      console.log(res, "获取小区列表");
      if (res.data.code === 0) {
        console.log(JSON.parse(res.data.data));
        const resd = JSON.parse(res.data.data)[0];
        if (resd.status === 'success') {
          let arry = [];
          for (var a = 0; a < resd.data.length; a++) {
            const village = resd.data[a].split(",");
            arry.push(village[1]);
          }
          dt.setData({
            residentialArray: arry,
            residentialArray2: resd.data
          });
        } else {
          wx.showToast({
            title: resd.msg,
            icon: 'none',
            duration: 1500
          })
        }
      } else {
        console.log('code=1----------', res);
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }
    }, res => {
      console.log("获取小区列表", res);
    });
  },
  // 小区
  bindPickerResidentialIndex(e) {
    this.setData({
      residentialIndex: e.detail.value
    });
  },
  // 确定按钮跳转登录注册页面
  determine() {
    var dt = this;
    let add = "";
    add = add + dt.data.regionData[dt.data.index];
    add = add + dt.data.regionDataCity[dt.data.cityIndex];
    add = add + dt.data.regionDataCounty[dt.data.countyIndex];
    let villageName = dt.data.residentialArray2[dt.data.residentialIndex];
    getApp().globalData.villageName = dt.data.residentialArray[dt.data.residentialIndex];
    console.log(add, villageName, "1111111111");
    if (add != '' && villageName != undefined) {
      reque.requesa(reque.demo.posThird, {
        id: 1312,
        openid: getApp().globalData.openid,
        // openid: 'oF10K42VGHalLyvhb5Jlu48Gl530',
        vType: 3,
        villageAddr: add,
        villageName: villageName //小区标识
      }, res => {
        let resa = JSON.parse(res.data.data)[0];
        getApp().globalData.tableNum = resa.tableNum;
        console.log("小区", JSON.parse(res.data.data), res);
        if (resa.status != "success") {
          wx.showToast({
            title: resa.msg,
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: resa.msg,
            icon: 'none',
            duration: 1500
          })
        }
        let pageUrl = '/pages/login/phone/phone';
        if (resa.data !== null && resa.data !== "" && resa.data !== undefined) {
          pageUrl = '/pages/Monthcards/Monthcards'
        }
        wx.redirectTo({
          url: pageUrl
        });
      }, res => {});
    } else {
      wx.showToast({
        title: '请选择完整的信息',
        icon: 'none',
        duration: 1500
      })
    }
  }
})