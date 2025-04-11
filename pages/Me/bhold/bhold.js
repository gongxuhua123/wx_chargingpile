// pages/Me/bhold/bhold.js'
import datas from '../../../utils/data.js';
import reque from '../../../utils/request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tickers: [],
    skigab: true,
    array: '',
    phones: '',
    sprid: '',
    sprid2: '',
    sprid3: '',
    sprid4: '',
    times: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dt = this;
    dt.prompt = dt.selectComponent("#prompt");
    var dt = this;
    reque.requesa(reque.demo.info, {
      id: 1317,
      // phoneNum: '15021714353',
      // tableNum: '000901180001'
      phoneNum: getApp().globalData.phoneNum,
      tableNum: getApp().globalData.tableNum
    }, res => {
      if (res.data.code === 0) {
        let resd = JSON.parse(res.data.data) || null;
        if (resd[0].status === 'success') {
          console.log(resd, "绑定户主获取小区列表", res);
          dt.setData({
            array: resd[0].data
          });
        } else {
          console.log('code=0,staus=fail');
        }
      } else {
        console.log('code=1绑定户主获取小区', );
      }
      dt.setData({

      });
    }, res => {});
  },
  /**
   * 选择户主小区
   */
  bindrChange(e) {
    var dt = this;
    dt.prompt.address();
  },
  /**
   * 验证户主手机号获取
   */
  housphon(e) {
    this.setData({
      phoneh: e.detail.value
    })
  },
  /**
   * 获取户主姓名
   */
  housname(e) {
    this.setData({
      nameh: e.detail.value
    })
  },
  /**
   * 获取验证码
   */
  getvericode() {
    var dt = this;
    wx.showToast({
      title: '验证码发送中',
      icon: 'loading'
    });
    if (dt.data.phoneh != '' && (/^1(3|4|5|6|7|8|9)\d{9}$/).test(dt.data.phoneh) && (/^[\u4E00-\u9FA5]{2,4}$/).test(dt.data.nameh) && dt.data.sprid4) {
      reque.requesa(reque.demo.info, {
        id: 1318,
        phoneNum: getApp().globalData.phoneNum,
        tableNum: getApp().globalData.tableNum,

        huzhuData: {
          villageName: dt.data.sprid4,
          villageAddr: dt.data.sprid + ',' + dt.data.sprid2 + ',' + dt.data.sprid3,
          phoneNum: dt.data.phoneh,
          userName: dt.data.nameh
        },
        vType: 1
      }, res => {
        wx.hideToast();
        if (res.data.code === 0) {
          dt.timingsixty();
          wx.showToast({
            title: '验证码发送成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '验证码发送失败',
            icon: 'none',
            duration: 1500
          });
        }
        console.log(res, "获取验证码");
        // let resd = JSON.parse(res.data.data);

      }, res => {});
    } else {
      wx.hideToast();
      wx.showToast({
        title: '请填写完整正确的户主信息再获取验证码！',
        icon: 'none',
        duration: 1500,
      })
    }
  },
  /**
   * 计时60S
   */
  timingsixty() {
    var dt = this;
    var times = 60;
    dt.data.timbh = setInterval(function() {
      times -= 1;
      if (times <= 0) {
        dt.setData({
          times: ''
        });
        clearInterval(dt.data.timbh);
      } else {
        dt.setData({
          times: times
        })
      };
    }, 1000)
  },
  /**
   * 提交信息
   */
  formSubmit(e) {
    var dt = this;
    console.log(e, "提交信息");
    var dars = e.detail.value;
    var code = dars.code;
    if (e.detail.target.id === '1') {
      wx.showToast({
        title: '验证码发送中',
        icon: 'loading'
      });
      code = '验证码';
    }

    if (dars.names != '' && dars.cards != '' && dars.phones != '' && dars.tabnumber != '' && dars.nameh != '' && dars.phoneh != '' && code != '') {
      if ((/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/).test(dars.cards)) {
        if ((/^1(3|4|5|6|7|8|9)\d{9}$/).test(dars.phones) && (/^1(3|4|5|6|7|8|9)\d{9}$/).test(dars.phoneh)) {
          if ((/^[\u4E00-\u9FA5]{2,4}$/).test(dars.names) && (/^[\u4E00-\u9FA5]{2,4}$/).test(dars.nameh)) {
            reque.requesa(reque.demo.info, {
              id: 1318,
              phoneNum: getApp().globalData.phoneNum,
              tableNum: getApp().globalData.tableNum,
              fushuData: {
                phoneNum: dars.phones,
                IDCardNum: dars.cards,
                userName: dars.names,
                weChatId: getApp().globalData.openid
              },
              huzhuData: {
                villageName: dt.data.sprid4,
                villageAddr: dt.data.sprid + ',' + dt.data.sprid2 + ',' + dt.data.sprid3,
                phoneNum: dars.phoneh,
                userName: dars.nameh,
                content: dars.code
              },
              vType: e.detail.target.id
            }, res => {
              console.log(res, "绑定户主用户和发送验证码");
              // let resd = JSON.parse(res.data.data);
              if (e.detail.target.id === '1') {
                wx.hideToast();
                if (res.data.code === 0) {
                  dt.timingsixty();
                  wx.showToast({
                    title: '验证码发送成功',
                    icon: 'success',
                    duration: 2000
                  });
                } else {
                  wx.showToast({
                    title: '验证码发送失败',
                    icon: 'none',
                    duration: 1500
                  });
                }
              } else {
                console.log("绑定");
                if (res.data.code === 1) {
                  wx.showToast({
                    title: JSON.parse(res.data.data)[0].msg,
                    icon: 'none',
                    duration: 1500,
                  });
                } else {
                  wx.showToast({
                    title: '成功绑定户主用户',
                    icon: 'success',
                    duration: 2000,
                  });
                  dt.data.ruo = setTimeout(function() {
                    clearTimeout(dt.data.ruo);
                    wx.switchTab({
                      url: '/pages/Monthcards/Monthcards'
                    })
                  }, 2000);
                }
              }
            }, res => {
              console.log(res, "接口");
            });
          } else {
            wx: wx.showToast({
              title: '姓名为汉字格式！',
              icon: 'none',
              duration: 2000,
            })
          }
        } else {
          wx: wx.showToast({
            title: '手机号码不正确！',
            icon: 'none',
            duration: 2000,
          })
        }
      } else {
        wx: wx.showToast({
          title: '身份证格式不正确！',
          icon: 'none',
          duration: 2000,
        })
      }
    } else {
      if (e.detail.target.id === '1') {
        wx.hideToast();
        wx.showToast({
          title: '请填写完整正确的信息再获取验证码！',
          icon: 'none',
          duration: 1500,
        })
      } else {
        wx: wx.showToast({
          title: '请填写完整的信息再提交！',
          icon: 'none',
          duration: 2000,
        })
      }
    }
  },
  /**
   * 地址返回信息
   */
  bindsecity(e) {
    var dt = this;
    console.log("aaa", e, e.detail);
    dt.setData({
      sprid: e.detail.sprid,
      sprid2: e.detail.sprid2,
      sprid3: e.detail.sprid3,
      sprid4: e.detail.sprid4
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var dt = this;
    clearInterval(dt.data.timbh);
    console.log("页面隐藏");
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var dt = this;
    clearInterval(dt.data.timbh);
    console.log("页面卸载");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var dt = this;
    dt.setData({
      phones: getApp().globalData.phoneNum
    })
  }
})