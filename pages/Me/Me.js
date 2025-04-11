// pages/Me/Me.js
import reque from '../../utils/request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    views: [
      {
        icon: 'yizhou',
        names: '一周用量',
        hidy:false,
        arrs:3
      },
      {
        icon: 'dingdan',
        names: '订单管理',
        arrs: 3
      },
      {
        icon: 'chongdian',
        names: '充电记录',
        arrs: 3
      },
      {
        icon: 'fault',
        names: '报修记录',
        arrs: 3
      },
      {
        icon: 'ren',
        names: '绑定户主用户',
        arrs: 3
      }
    ],
    address: '',
    phoneNum: '',
    status: ''
    ,
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 我的信息详情
   */
  userDetails() {
    wx.navigateTo({
      url: './Detainfo/Detainfo',
    });
  },
  /**
   * 绑定点击事件
   */
  bindclickevent(g) {
    var dt = this;
    let url = '';
    switch (g.currentTarget.id) {
      case '0':
        var vies = dt.data.views;
        if (vies[0].hidy===false){
          vies[0].hidy = true;
          vies[0].arrs = 2;
        }else{
          vies[0].hidy = false;
          vies[0].arrs = 3;
        }
        dt.setData({
          views: vies
        });
      break;
      case '1':
        url = './Orderm/Orderm';
        break;
      case '2':
        url = './Recharg/Recharger?id=1';
        break;
      case '3':
        url = './Recharg/Recharger?id=2';
        break;
      case '4':
        url = './bhold/bhold';
        break;
    };
    wx.navigateTo({
      url: url,
    });
  },
  /**获取小区列表 */
  getNames() {
    var dt = this;
    reque.requesa(reque.demo.getName, {
      id: 1313,
      phoneNum: getApp().globalData.phoneNum,
      tableNum: getApp().globalData.tableNum,
      vType: 1
    }, res => {
      console.log(res, "获取小区列表", JSON.parse(res.data.data));
      let resd = JSON.parse(res.data.data);
      dt.setData({
        array: resd[0].data,
        status: resd[0].status
      });
    }, res => {});
  },
  showtis() {
    wx.showToast({
      icon: 'none',
      title: '请绑定充电桩，再进行小区切换',
      duration: 2000
    });
  },
  /**
   * 退出登录
   */
  logout(){
    wx.showModal({
      title: '提示',
      content: '确定清除账号信息退出吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.clearStorageSync();
          wx.clearStorage();
          wx.redirectTo({
            url: '../index/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**点击切换小区 */
  bindPickerChange(e) {
    var dt = this;
    wx.showToast({
      title: '切换中',
      icon: 'loading'
    })
    console.log(e, 'picker发送选择改变，携带值为', e.detail.value);
    reque.requesa(reque.demo.community, {
      id: 1313,
      vType: 2,
      phoneNum: getApp().globalData.phoneNum,
      tableNum: getApp().globalData.tableNum,
      villageName: dt.data.array[e.detail.value]
    }, res => {
      wx.hideToast();
      console.log(JSON.parse(res.data.data), "切换小区返回数据");
      let resd = JSON.parse(res.data.data);
      if (res.data.code == 0) {
        if (resd[0].status != 'success') {
          wx.showToast({
            title: resd[0].msg,
            icon: 'none',
            duration: 3000
          });
          return;
        } else {
          wx.showToast({
            title: resd[0].msg,
            icon: 'none',
            duration: 3000
          });
          dt.setData({
            address: dt.data.array[e.detail.value]
          });
          if (resd[0].data == null && resd[0].data.length > 0) {
            return
          };
          getApp().globalData.phoneNum = resd[0].data.phoneNum;
          getApp().globalData.villageName = dt.data.array[e.detail.value];
          getApp().globalData.tableNum = resd[0].data.tableNum;
          dt.onShow();
        }
      } else {
        wx.hideToast();
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
      }
    }, res => {
      wx.hideToast();
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var dt = this;
    dt.setData({
      phoneNum: getApp().globalData.phoneNum,
      address: getApp().globalData.villageName
    });
    // dt.getNames();
  }
});
import * as echarts from '../../component/ec-canvas/echarts';
function initChart(canvas, width, height) {
  var timesre=[];
  var number=[];
  reque.requesa(reque.demos.timesrecent, {
    // userId: wx.getStorageSync('userid')
    userId: 137
  }, res => {
    console.log("用电次数", res);
    var resd = res.data;
    if (resd.code === 0) {
      var timlist=resd.data;
      for(var i=0;i<timlist.length;i++){
        const datime = (timlist[i].dayTime).split('-');
        const datimelist = datime[1] +'/'+ datime[2];
        timesre.push(datimelist);
        number.push(timlist[i].times);
      }
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var option = {
        tooltip: {
          show: true,
          trigger: 'axis',
          position: ['72%', '0.5%']
        },
        xAxis: {
          type: 'category',
          name: '日期',
          nameTextStyle: {
            fontSize: 8
          },
          nameGap: 8,
          axisLabel: {
            margin: 12,
            fontSize: 9,
            color: '#353333'
          },
          boundaryGap: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // data: ['11/25', '11/26', '11/27', '11/28', '11/29', '11/30', '12/1']
          data: timesre
        },
        yAxis: {
          type: 'category',
          // type: 'value',
          name: '次数',
          nameTextStyle: {
            fontSize: 8
          },
          boundaryGap: false,
          data: [0, 1, 2, 3],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: ['0', '1', '2', '3'],
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: ['#c3c3c3']
            }
          }
        },
        grid: {
          left: "4.5%",
          top: "30rpx",
          width: "82%",
          height: "60%",
          containLabel: true
        },
        series: [{
          name: '充电次数',
          type: 'line',
          smooth: false,
          symbol: 'circle', //折线点设置为实心点
          symbolSize: 5, //折线点的大小
          itemStyle: {
            normal: {
              color: "#FF0000", //折线点的颜色
              lineStyle: {
                color: "#FF0000", //折线的颜色
                width: 1
              }
            }
          },
          // data: [2, 1, 3, 1, 0, 2, 1]
          data: number
        }]
      };

      chart.setOption(option);
      return chart;

    } else {
      wx.showToast({
        title: 'code为0之外',
        icon: 'none',
        duration: 2000
      })
    }
  })
}