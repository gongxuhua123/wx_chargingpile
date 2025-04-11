// prompt.js
import reque from '../../utils/request.js';
// import datas from '../../utils/data.js';
Component({
  data: {
    failure: false, //报修信息发送
    failurenum: 3,
    therepairs: false, //报修显示确定
    slockclicks: false, //开锁成功
    powerges: false, //确定是否断电
    numcharge: false, //提示充电次数上限
    thefault: false, //故障点击
    maintfault: '1',
    poweucces: false, //断电成功提示
    powerparking: '',
    ordermtype: false, //订单管理选择类型
    threetips: false, //三次充电提示
    ordermtypel: [{
        id: '01',
        name: '全部'
      },
      {
        id: '02',
        name: '月卡'
      },
      {
        id: '03',
        name: '共享'
      }
    ],
    selectcity: false, //绑定户主
    sprid: '请选择',
    sprid2: '请选择',
    sprid3: '请选择',
    sprid4: '请选择',
    spridbl: 1,
    isIphoneX: false,
    cwPos1: '',
    tohidea: false, //充电桩端口为0时候，暂废弃,
    powenumber: '断电时间'
  },
  properties: {
    selcitylist: {
      type: Object,
      value: ''
    }
  },
  ready(e) {

  },
  methods: {
    filterViewMove() {

    },
    /**
     * 报修确定
     */
    wadetere() {
      var dt = this;
      clearInterval(dt.data.thewar);
      dt.setData({
        failure: false,
        failurenum: 3
      });
    },
    /**
     * 报修
     */
    thewarranty(e) {
      var dt = this;
      dt.setData({
        therepairs: true,
        cwPos1: e
      });

    },
    /**
     * 是否确定报修
     */
    pdeterminebaoxiu(e) {
      var dt = this;
      dt.setData({
        therepairs: false
      });
      console.log(dt.data.cwPos1, "aaaaaaaaaaaa");
      wx.showToast({
        title: '报修请求中',
        icon: 'loading'
      })
      if (dt.data.cwPos1) {
        reque.requesa(reque.demos.addMini, {
          pilePortIds: dt.data.cwPos1,
          deviceIds: "",
          recordJSON: {}
        }, res => {
          wx.hideToast();
          // var resd = JSON.parse(res.data.data) || null;
          console.log("报修", res);
          if (res.data.success === true) {
            if (res.data.code === 0) {
              dt.setData({
                failure: true
              });
              dt.triggerEvent('parentrun');
              dt.data.thewar = setInterval(function () {
                dt.setData({
                  failurenum: dt.data.failurenum -= 1
                });
                if (dt.data.failurenum <= 0) {
                  dt.setData({
                    failure: false,
                    failurenum: 3
                  });
                  clearInterval(dt.data.thewar);
                }
              }, 1000);
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              });
            }
          } else {
            wx.showToast({
              title: '报修失败!',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    },
    pcancelbaoxi() {
      this.setData({
        therepairs: false
      })
    },
    formSubmit(e) {
      console.log(e, "提交的信息");
    },
    /**
     * 充电提示显示报修
     */
    bindfaulrmine(numbe) {
      var dt = this;
      dt.setData({
        maintfault: numbe,
        thefault: true
      });
    },
    /**
     * 充电提示隐藏报修
     */
    thefaultcancel() {
      this.setData({
        thefault: false
      });
    },
    /**
     * 开锁
     */
    lockclick(cwPos) {
      var dt = this;
      console.log('开锁按钮信息', cwPos);
      wx.showToast({
        title: '开锁中',
        icon: 'loading'
      })
      reque.requesa(reque.demos.opendor, {
        devicePortId: cwPos,
        userId: wx.getStorageSync('userid')
      }, res => {
        console.log(res, "获取到开锁信息", );
        wx.hideToast();
        var resd = res.data;
        if (resd.code === 1) {
          wx.hideToast();
          let msg = JSON.parse(resd.msg);
          if (msg.success === true) {
            dt.data.opl = setTimeout(function () {
              dt.setData({
                slockclicks: false
              });
              clearTimeout(dt.data.opl);
            }, 2000);
            dt.setData({
              slockclicks: true,
            });
          } else {
            wx.showToast({
              title: '设备离线',
              icon: 'none',
              duration: 2000
            });
          }
        } else {
          wx.hideToast();
          wx.showToast({
            title: '开锁失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    /**
     * 展开断电请求
     */
    powerFailure(cwPoslist) {
      var dt = this;
      dt.setData({
        powerges: true,
        powerparking: cwPoslist
      })
    },
    /**
     * 断电确定
     */
    pdetermine() {
      var dt = this;
      wx.showToast({
        title: '断电请求中',
        icon: 'loading'
      });
      console.log(dt.data.powerparking);
      if (dt.data.powerparking) {
        reque.requesa(reque.demos.stopcha, {
          devicePortId: (dt.data.powerparking).cwPos,
          userId: wx.getStorageSync('userid')
        }, res => {
          console.log("断电返回数据", res);
          var resd = res.data;
          if (resd.code === 0) {
            wx.hideToast();
            dt.setData({
              powerges: false,
              poweucces: true
            });
            var tbg = new Date(Date.parse(new Date()));
            var rbg = new Date((dt.data.powerparking).times.replace(/-/g, '/'));
            if (tbg - rbg >= 0) {
              dt.setData({
                powenumber: datas.hhmmss2((tbg - rbg)) || 0
              });
            } else {
              console.log("时间相差为负数");
            }
            dt.data.powsucs = setTimeout(function () {
              dt.setData({
                poweucces: false
              });
              dt.triggerEvent('parentrun');
              clearTimeout(dt.data.powsucs);
            }, 3000);
          } else if (resd.code === 1) {
            wx.hideToast();
            dt.setData({
              powerges: false
            });
            wx.showToast({
              title: '已经提前结束',
              icon: 'none',
              duration: 1500
            })
          } else {
            wx.hideToast();
            dt.setData({
              powerges: false
            });
            wx.showToast({
              title: resd.msg,
              icon: 'none',
              duration: 1500
            })
          }
        });
      } else {
        wx.hideToast();
        wx.showToast({
          title: '充电桩信息获取失败',
          icon: 'none',
          duration: 1500
        });
      }
    },
    /**
     * 断电取消
     */
    pcancel() {
      this.setData({
        powerges: false
      })
    },
    /**
     * 断电成功隐藏时长
     */
    bindpocancel() {
      this.setData({
        poweucces: false
      });
    },
    /**
     * 上限次数显示
     */
    bindnumrmine() {
      this.setData({
        numcharge: true
      });
    },
    /**
     * 上限次数隐藏
     */
    bindnumcancel() {
      this.setData({
        numcharge: false
      });
    },
    /**
     * 全部类型选择
     */
    alltypesof() {
      var dt = this;
      if (dt.data.ordermtype == false) {
        dt.setData({
          ordermtype: true
        });
        dt.triggerEvent('parentrun', true);
      };
    },
    /**
     * 取消选择
     */
    quxiaoxuanze(e) {
      var dt = this;
      dt.setData({
        ordermtype: false
      });
      dt.triggerEvent('parentrun', false);
    },
    /**
     * 确定选择类型
     */
    clicksele(e) {
      var dt = this;
      dt.setData({
        lexing: e.target.id,
        ordermtype: false
      });
      dt.triggerEvent('parentrun', false);
    },
    /**
     * 绑定户主地址选择
     */
    chooselcity(e) {
      var dt = this;
      // console.log(e,"选择的地址");
      wx.showToast({
        title: '选择中',
        icon: 'loading'
      })
      let sprid = dt.data.selprovi[e.currentTarget.id];
      let spridbl = e.currentTarget.dataset.spridbl;
      let selprovi = [];
      let obj = dt.properties.selcitylist[sprid];
      if (sprid != '') {
        switch (spridbl) {
          case 1:
            wx.hideToast();
            Object.keys(obj).forEach(function (key, i, v) {
              selprovi.push(key);
            });
            dt.setData({
              sprid: sprid,
              spridbl: 2,
              selprovi: selprovi
            });
            break;
          case 2:
            wx.hideToast();
            obj = dt.properties.selcitylist[dt.data.sprid][sprid];
            Object.keys(obj).forEach(function (key, i, v) {
              selprovi.push(key);
            });
            dt.setData({
              sprid2: sprid,
              spridbl: 3,
              selprovi: selprovi
            });
            break;
          case 3:
            wx.hideToast();
            selprovi = dt.properties.selcitylist[dt.data.sprid][dt.data.sprid2][sprid]
            dt.setData({
              sprid3: sprid,
              spridbl: 4,
              selprovi: selprovi
            });
            break;
          case 4:
            wx.hideToast();
            dt.setData({
              sprid4: sprid,
              spridbl: 4,
              selprovi: ''
            });
            break;
        };
      }
    },
    chooselcity6() {
      var dt = this;
      var selprovi = [];
      var obj = dt.data.selcitylist[dt.data.sprid];
      Object.keys(obj).forEach(function (key, i, v) {
        selprovi.push(key);
      });
      dt.setData({
        sprid2: '请选择',
        sprid3: '请选择',
        sprid4: '请选择',
        spridbl: 2,
        sprid3bol: false,
        sprid4bol: false,
        selprovi: selprovi
      });
    },
    chooselcity7() {
      var dt = this;
      var selprovi = [];
      var obj = dt.data.selcitylist[dt.data.sprid][dt.data.sprid2];
      Object.keys(obj).forEach(function (key, i, v) {
        selprovi.push(key);
      });
      dt.setData({
        sprid3: '请选择',
        sprid4: '请选择',
        spridbl: 3,
        sprid4bol: false,
        selprovi: selprovi
      });
    },
    chooselcity8() {
      var dt = this;
      var obj = dt.data.selcitylist[dt.data.sprid][dt.data.sprid2][dt.data.sprid3];
      dt.setData({
        sprid4: '请选择',
        spridbl: 4,
        selprovi: obj
      });
    },
    /**
     * 打开选择地址
     */
    address() {
      var dt = this;
      var obj = dt.properties.selcitylist;
      var selprovi = [];
      Object.keys(obj).forEach(function (key, i, v) {
        selprovi.push(key);
      });
      dt.setData({
        selectcity: true,
        selprovi: selprovi
      })
    },
    unddress(e) {
      var dt = this;
      let id = '0';
      if (e != undefined) {
        id = e.currentTarget.id;
      }
      let selectcity = true;
      let selprovi = [];
      if (id === '1') {
        let obj = dt.properties.selcitylist;
        Object.keys(obj).forEach(function (key, i, v) {
          selprovi.push(key);
        });
      } else {
        selectcity = false;
      }
      dt.setData({
        selectcity: selectcity,
        sprid: '请选择',
        sprid2: '请选择',
        sprid3: '请选择',
        sprid4: '请选择',
        spridbl: 1,
        selprovi: selprovi
      })
    },
    onddress() {
      var dt = this;
      console.log(dt.data.sprid, dt.data.sprid2, dt.data.sprid3, dt.data.sprid4, "unicode选择的地址信息");
      if (dt.data.sprid != '请选择' && dt.data.sprid2 != '请选择' && dt.data.sprid3 != '请选择' && dt.data.sprid4 != '请选择') {
        let vight = {
          'sprid': dt.data.sprid,
          'sprid2': dt.data.sprid2,
          'sprid3': dt.data.sprid3,
          'sprid4': dt.data.sprid4
        };
        dt.unddress();
        dt.triggerEvent('bindsecity', vight);
      } else {
        wx.showToast({
          title: '请选择完整小区信息,再确认',
          icon: 'none',
          duration: 1500
        });
      }
    },
    /**
     * 三次提示
     */
    bindthreetips() {
      var dt = this;
      if (dt.data.threetips === false) {
        dt.setData({
          threetips: true
        })
      } else {
        dt.setData({
          threetips: false
        })
      }
    }
  }
})