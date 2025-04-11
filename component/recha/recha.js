// recha.js
// import reque from '../../utils/request.js';
import datas from '../../utils/data.js';
Component({
  data: {
    rechargerList: [],
    rListhtg: '',
    rechidlist: [{
      villageName: '222222',
      cwPos: '33333',
      userName: "gongxuhua",
      phoneNum: '888888888',
      crDate: '666666666'
    }]
  },
  properties: {
    rechid: {
      type: Number,
      value: ''
    }
  },
  ready(e) {

  },
  methods: {
    /***
     * 下拉刷新
     */
    startthe(ones, twos, thres) {
      var dt = this;
      if (dt.properties.rechid === 1) {
        dt.getList(ones, twos, thres);
        console.log(ones, twos, thres, "aaaaaaaaaaaaa");
      } else if (dt.properties.rechid === 2) {
        dt.gettwolist(ones, twos, thres);
        console.log(ones, twos, thres, "bbbbbbbbbbbbbb");
      }
    },
    /**上拉刷新 */
    getListtwo(starts, ends) {
      var dt = this;
        if (ends > dt.data.rListhtg.length) {
          wx.showToast({
            title: '数据已经到底了',
            icon:'loading',
            duration: 1000
          });
        } else {
          if (dt.properties.rechid===1){
            dt.getList(starts, ends, '上拉');
          } else if (dt.properties.rechid===2){
            dt.gettwolist(starts, ends, '上拉');
          }
        }
    },
    /**充电记录 */
    getList(starts, ends, thres) {
      var dt = this;
      wx.stopPullDownRefresh();
      wx.showLoading({
        title: '加载中',
      });
      reque.requesa(reque.demos.usedorder, {
        userId: wx.getStorageSync('userid')
      }, res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res, "获取充电记录");
        var resd = res.data;
        if (resd.code === 0) {
          if (resd.data == '' || resd.data == null || resd.data.length === 0) {
            console.log("充电记录记录为0");
            dt.triggerEvent('parentrun', true);
          } else {
            var amk4 = resd.data.slice(starts, ends);
            var rechargerList = dt.data.rechargerList;
            if (thres === '下拉') {
              rechargerList = [];
            }
            for (var i = 0; i < amk4.length; i++) {
              amk4[i].villageName = amk4[i].communityName;
              amk4[i].cwName = amk4[i].deviceNum + '区' + amk4[i].devicePortNum;
              amk4[i].cardNum = amk4[i].card_code;
              amk4[i].stDate = amk4[i].chargeStartTime;
              amk4[i].edDate = amk4[i].chargeEndTime;
              amk4[i].isCard = amk4[i].chargeTime+'分钟';
              rechargerList.push(amk4[i]);
            };
            console.log(rechargerList, "组合2", amk4);
            dt.triggerEvent('parentrun', false);
            dt.setData({
              rechargerList: rechargerList,
              rListhtg: resd.data
            });
          }
        } else {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          dt.triggerEvent('parentrun', true);
          console.log("code=1------", res);
        }
      })
    },
    /**报修记录 */
    gettwolist(starts, ends, thres) {
      var dt = this;
      wx.stopPullDownRefresh();
      wx.showLoading({
        title: '加载中',
      });
      reque.requesa(reque.demos.faultorder, {
        // userId: wx.getStorageSync('userid')
        userId: 137
      }, res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res, "获取报修记录");
        if (res.data.code === 0) {
          let resd = res.data.data;
          if (resd == '' || resd == null||resd.length===0) {
            dt.triggerEvent('parentrun', true);
            console.log("数据为空");
          } else {
            var amk4 = resd.slice(starts, ends);
            var rechargerList = dt.data.rechargerList;
            if (thres === '下拉') {
              rechargerList = [];
            }
            for (var i = 0; i < amk4.length; i++) {
              amk4[i].villageName = resd[i].communityName;
              amk4[i].cwName = resd[i].deviceAddr;
              amk4[i].userName = resd[i].realName;
              amk4[i].phoneNum = resd[i].phone;
              amk4[i].crDate = resd[i].createTime;
              amk4[i].repair = resd[i].deviceTypesName + resd[i].deviceCode;
              amk4[i].renotes = resd[i].deviceFaultInfo;
              rechargerList.push(amk4[i]);
            };
            console.log(rechargerList, "组合2", amk4);
            dt.triggerEvent('parentrun', false);
            dt.setData({
              rechargerList: rechargerList,
              rListhtg: resd
            });
          }
        } else {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          dt.triggerEvent('parentrun', true);
          console.log("code===1", res);
        }
      });
    }
  }
})