// pages/Monthcards/Monthcards.js
import reque from '../../utils/request.js';
import datas from '../../utils/data.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titles: '',
    dropdowns: false,
    slockclicks: false,
    lockclick2cs: false,
    parkingList: '',
    butmoe: false,
    tickers: [],
    variable: 0,
    communityId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt = this;
    dt.prompt = dt.selectComponent("#prompt");
  },
  /**
   * 展开
   */
  amodule: function(e) {
    var dt = this;
    const id = e.currentTarget.id;
    var listcard = dt.data.parkingList;
    if (listcard[id].math == false) {
      listcard[id].math = true;
    } else {
      listcard[id].math = false;
    }
    dt.setData({
      parkingList: listcard
    });
  },
  /**
   * 下拉
   */
  dropdown: function(e) {
    var dt = this;
    var id = e.currentTarget.id;
    var parkingList = dt.data.parkingList;
    var number = parkingList[id].cardNum.length;
    if (number > 1) {
      if (parkingList[id].dropdowns == false) {
        parkingList[id].height1 = number * 120;
        parkingList[id].dropdowns = true;
      } else {
        parkingList[id].height1 = 120;
        parkingList[id].dropdowns = false;
      }
    } else {
      console.log("卡的长度没有大于1");
    }
    dt.setData({
      parkingList: parkingList
    })
  },
  /**
   * 开锁
   */
  lockclick: function(e) {
    var dt = this;
    let cwPos = e.currentTarget.dataset.cwpos;
    dt.prompt.lockclick(cwPos);
  },
  /**
   * 充电
   */
  lockclick2: function(e) {
    var dt = this;
    // console.log(e, '充电按钮');
    var id = e.currentTarget.id;
    var cwStatu = e.currentTarget.dataset.cwstatus;
    var status = e.currentTarget.dataset.status;
    if (cwStatu === 5) {
      dt.prompt.bindfaulrmine('1');
      return;
    };
    if (cwStatu === 6) {
      dt.prompt.bindfaulrmine('2');
      return;
    };
    const remaincnts = e.currentTarget.dataset.remaincnt;
    if (remaincnts <= 0) {
      dt.prompt.bindnumrmine();
      return;
    }
    if (status === 1) {
      wx.showToast({
        title: '该充电桩车位已经报修',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let cwPos = e.currentTarget.dataset.cwpos;
    wx.showToast({
      title: '充电请求中',
      icon: 'loading'
    });
    reque.requesa(reque.demos.startch, {
      devicePortId: cwPos,
      userId: wx.getStorageSync('userid')
    }, res => {
      var resd = res.data;
      if (resd.code == 0) {
        console.log(resd, "启动充电返回信息");
        if (resd.success == 'fail') {
          wx.hideToast();
          wx.showToast({
            title: resd.msg,
            icon: 'none',
            duration: 3000
          });
        } else {
          wx.hideToast();
          wx.showToast({
            title: '充电请求成功',
            icon: 'success',
            duration: 2000
          });
          var parkingList = dt.data.parkingList;
          parkingList[id].cwStatu = '充电中';
          parkingList[id].cwStatus = 4;
          dt.setData({
            lockclick2cs: true,
            parkingList: parkingList
          });
          console.log("充电开始启动定时器");
          dt.cyclehhmmss(0, id);
        }
      } else if (resd.code === 1) {
        wx.showToast({
          title: '充电端口不可用',
          icon: 'none',
          duration: 1500
        })
      };
    });
  },
  /**
   * 计时循环
   */
  cyclehhmmss(timt, id) {
    var dt = this;
    var parkingList = dt.data.parkingList;
    dt.data.tickers.push(setInterval(function() {
      timt += 1000;
      parkingList[id].times = datas.hhmmss(timt);
      dt.setData({
        parkingList: parkingList
      });
    }, 1000));
  },
  /**
   * 断电
   */
  powerFailure(e) {
    console.log(e, "断电按钮");
    var dt = this;
    let cwPoslist = {
      cwPos: e.currentTarget.dataset.cwpos,
      times: e.currentTarget.dataset.cwtimes
    }
    console.log(cwPoslist, "99999999999999");
    var id = e.currentTarget.id;
    dt.setData({
      variable: id
    });
    dt.prompt.powerFailure(cwPoslist);
  },
  /**
   * 实时监控
   */
  realtm(e) {
    wx.navigateTo({
      url: './Videom/Videom',
    })
  },
  /**
   * 报修
   */
  thewarranty(e) {
    var dt = this;
    var cwPos1 = e.currentTarget.id;
    if (cwPos1) {
      dt.prompt.thewarranty(cwPos1);
    }
  },
  /**
   * 三次点提示
   */
  bindthreetips() {
    this.prompt.bindthreetips();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onShow();
  },
  /**  
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var dt = this;
    wx.showToast({
      title: '数据加载中',
      icon: 'loading'
    });
    console.log("终结", dt.data.tickers);
    var tickers = dt.data.tickers;
    for (var u = 0; u < tickers.length; u++) {
      clearInterval(tickers[u]);
    }
    wx.showNavigationBarLoading();

    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
    var communityId = wx.getStorageSync('communityId');
    var title = wx.getStorageSync('title');
    dt.setData({
      titles: title
    });
    if (communityId != '' || communityId != undefined) {
      reque.requesa(reque.demos.commid, {
        communityId: communityId,
        userId: wx.getStorageSync('userid')
      }, res => {
        console.log(res, '查询的端口数据');
        var resd = res.data.data;
        if (res.data.success != 'fail' || resd.length > 0) {
          for (var i = 0; i < resd.length; i++) {
            resd[i].math = false;
            resd[i].dropdowns = false;
            resd[i].height1 = 120;
            resd[i].times = '00:00:00';
            resd[i].cwPos = resd[i].deviceCode + '区' + resd[i].devicePortNum;
            // resd[i].status = 0;
            resd[i].cwStatus = resd[i].devicePortStatus;
            // resd[i].cwStatus=5;
            // resd[i].cwStatus = 3;
            // resd[i].stDate = '2020-1-13 12:45:35';
            if (resd[i].devicePortUseRecord != null && resd[i].devicePortUseRecord != undefined && resd[i].devicePortUseRecord != '') {
              resd[i].stDate = resd[i].devicePortUseRecord.chargeStartTime;
            }
            resd[i].crDate = resd[i].futureEndDate;
            resd[i].expDate = resd[i].curEndDate;
            resd[i].remainCnt = 3;
            resd[i].cardNum = resd[i].cardNumList;
            var duetotime = new Date(resd[i].expDate.replace(/-/g, '/'));
            var starttime = new Date(resd[i].crDate.replace(/-/g, '/'));
            var judgmentday = (duetotime) - (starttime);
            // console.log(judgmentday/(24*60*60*1000), "计算的天数");
            resd[i].judgmentday = judgmentday / (24 * 60 * 60 * 1000);
            switch (resd[i].cwStatus) {
              case 3:
                resd[i].cwStatu = '未充电';
                break;
              case 4:
                resd[i].cwStatu = '充电中';
                resd[i].math = true;
                break;
              case 5:
                resd[i].cwStatu = '故障';
                break;
              case 6:
                resd[i].cwStatu = '维修中';
                break;
            };
          }
          dt.setData({
            parkingList: resd
          });
          for (var j = 0; j < resd.length; j++) {
            if (resd[j].cwStatus === 4) {
              var ghj2 = new Date(Date.parse(new Date()));
              var ghj = new Date(resd[j].stDate.replace(/-/g, '/'));
              // console.log("充电状态为充电中启动定时器",ghj2,ghj);
              if (ghj2 - ghj >= 0) {
                dt.cyclehhmmss((ghj2 - ghj), j);
              } else {
                console.log("时间相差为负数");
              }
            }
          }
          console.log(resd, "重组之后");
          wx.hideToast();
        } else {
          wx.showToast({
            title: '小区端口数据fail',
            icon: 'loading',
            duration: 1500
          });
        }
      })
    } else {
      wx.showToast({
        title: '小区信息数据fail',
        icon: 'loading',
        duration: 1500
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var dt = this;
    var tickers = dt.data.tickers;
    for (var u = 0; u < tickers.length; u++) {
      clearInterval(tickers[u]);
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var dt = this;
    var tickers = dt.data.tickers;
    for (var u = 0; u < tickers.length; u++) {
      clearInterval(tickers[u]);
    }
  }
})