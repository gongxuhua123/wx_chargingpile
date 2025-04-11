// phone.js
import reque from "../../../utils/request.js";
var ctx;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneIcon: 'phone_icon', // 手机号图标
    passwordIcon: 'password_icon', // 密码图标
    randomcodeimg: 'shield', //随机码
    // input 右边按钮
    rightBtn: true,
    judge2: 0, // 判断显示的图标
    judge3: 0,
    judge4: 0,
    msg: '', // 手机消息提示
    codeMsg: '', // 验证码提示
    randcodeMsg: '', //随机码提示
    rightBtn: false, // input 右边按钮
    btnValue: '获取验证码', // 获取验证码
    phoneNum: '',
    content: '',
    randomtext: '', //随机数
    randomunm: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var dt = this;
    dt.head = dt.selectComponent("#head");
    drawPic(dt);

  },
  bindgetuserinfo(res){

           console.log(res);
  },
  bindgetuserinfos(res){
    console.log(res);
  },
  onShow() {

  },
  // 验证每一项
  formInput(e) {
    var dt = this;
    const value = e.detail.value;
    switch (e.currentTarget.dataset.item) {
      case 'phone':
        if (value.length === 0) {
          dt.setData({
            phoneIcon: 'phone_icon'
          });
        } else if (value.length > 0) {
          dt.setData({
            phoneIcon: 'phone_icon_s'
          });
        }
        if (value.length === 11) {
          dt.setData({
            phoneNum: value,
            judge2: 1,
            msg: ''
          });
          if (dt.data.randomunm != '') {
            dt.setData({
              rightBtn: true
            });
          }
        } else {
          dt.setData({
            judge2: 0,
            phoneNum: '',
            msg: '',
            rightBtn: false
          });
        }
        break;
      case 'code':
        if (value.length === 0) {
          dt.setData({
            passwordIcon: 'password_icon'
          });
        } else if (value.length > 0) {
          dt.setData({
            passwordIcon: 'password_icon_s'
          });
        }
        if (value.length === 6) {
          dt.setData({
            content: value,
            judge3: 1,
          });
        } else {
          dt.setData({
            judge3: '',
            content: ''
          });
        }
        break;
      case 'randomcode':
        if (value.length === 0) {
          dt.setData({
            randomcodeimg: 'shield'
          });
        } else if (value.length > 0) {
          dt.setData({
            randomcodeimg: 'shieldclik'
          });
        }
        if (value.length === 4) {
          dt.setData({
            judge4: 1,
            randomunm: value,
            randcodeMsg: ''
          });
          if (dt.data.phoneNum != '') {
            dt.setData({
              rightBtn: true
            });
          }
        } else {
          dt.setData({
            judge4: 0,
            randomunm: '',
            rightBtn: false,
            randcodeMsg: ''
          });
        }
        break;
    };
  },
  // 获取验证码
  getCodeClick() {
    var dt = this;
    const value = dt.data.phoneNum;
    const randomunm = dt.data.randomunm;
    const parmes = {
      id: 1301,
      phoneNum: dt.data.phoneNum,
      tableNum: getApp().globalData.tableNum,
      weChatId: getApp().globalData.openid
    }
    console.log(dt.data.phoneNum, "++", getApp().globalData.tableNum, getApp().globalData.openid);
    const mobilePhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[35678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!mobilePhone.test(value)) {
      dt.setData({
        msg: '请输入正确的手机号',
        judge2: 2
      });
      return;
    } else if (randomunm != dt.data.randomtext) {
      drawPic(dt);
      dt.setData({
        randcodeMsg: '请输入正确的随机验证码',
        judge4: 2
      })
    } else {
      wx.showLoading({
        title: '正在发送...',
      });
      dt.tiosp = setTimeout(
        function() {
          wx.hideLoading();
        }, 1500
      );
      // reque.requesa(reque.demo.code, parmes, (res => {
      //   console.log(JSON.parse(res.data.data), "手机号获取验证码", res);
      //   wx.hideLoading();
      //   // 成功是0  失败是1
      //   switch (res.data.code) {
      //     case 1:
      //       dt.setData({
      //         codeMsg: '验证码获取失败',
      //       });
      //       break;
      //     case 0:
      //       let sencod = 60;
      //       dt.timer(sencod);
      //       dt.setData({
      //         judge3: 0,
      //       });
      //       wx.showToast({
      //         title: '验证码已发送',
      //         icon: 'success',
      //         duration: 2000
      //       });
      //       break;
      //   }
      // }), (res => {
      //   wx.hideLoading();
      // }));
    }
  },
  // 倒计时
  timer(second) {
    var dt = this;
    let promise = new Promise((resolve, reject) => {
      dt.data.tims = setInterval(() => {
        second -= 1;
        dt.setData({
          btnValue: '重新获取' + second + 's',
          rightBtn: false
        });
        if (second <= 0) {
          dt.setData({
            btnValue: '获取验证码',
            rightBtn: true
          });
          resolve();
        }
      }, 1000);
    });
    promise.then(() => {
      clearInterval(dt.data.tims)
    });
  },
  //调用验证函数
  formSubmit: function(e) {
    var dt = this;
    console.log(e, "表单");
    const params = e.detail.value;
    const mobilePhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[35678]|18[0-9]|14[57])[0-9]{8}$/;
    if (params.phoneNum === '' || params.phoneNum.length != 11 || !mobilePhone.test(params.phoneNum)) {
      wx.showToast({
        title: '请填写完正确的手机号',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (params.content === '' || params.content.length != 6) {
      wx.showToast({
        title: '请填写完验证码',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else {
      console.log("登录方111");
      reque.requesb(reque.demos.logins, {
        loginId: params.phoneNum,
        passWord: params.content
      }, res => {
        console.log(res,"登录方法");
        if (res.data.code === 0) {
          wx.showToast({
            title: '登录成功',
            duration: 1500
          });
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('userid', res.data.data.userInfo.id);
          reque.requesa(reque.demos.commun, {
            userId: res.data.data.userInfo.id
          }, ress => {
            console.log("小区信息",ress);
            if (ress.data.code === 0) {
              var resh = ress.data.data;
              wx.setStorageSync('communityId', resh[0].id);
              wx.setStorageSync('title', resh[0].communityName);
              dt.timeout = setTimeout(function () {
                wx.switchTab({
                  url: '../../Monthcards/Monthcards',
                });
                clearTimeout(dt.timeout);
              }, 1500);
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500
              })
            }
          }, ress => { })
        } else if (res.data.code === 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration: 1500
          })
        }
      }, res => {
        console.log(res,"55555aaaaaaaa");
        wx.showToast({
          title: '服务器访问失败！',
          icon:'none',
          duration: 1500
        })
      });
    }
  },
  // 提示随机码和手机号
  verrandomcode(e) {
    wx.showToast({
      title: '请输入手机号和随机码!',
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var dt = this;
    clearInterval(dt.data.tims);
    console.log("页面卸载", dt.data.tims);
  },
  cilckchange: function() {
    var dt = this;
    drawPic(dt);
  },
  mobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  }
})

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
/**生成一个随机色**/
function randomColor(min, max) {
  var r = randomNum(min, max);
  var g = randomNum(min, max);
  var b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

/**绘制验证码图片**/
function drawPic(that) {
   ctx = wx.createCanvasContext('canvas');
  /**绘制背景色**/
  ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
  ctx.fillRect(0, 0, 90, 28)
  /**绘制文字**/
  var arr;
  var randomtext = '';
  var str = 'ABCEFGHJKLMNPQRSTWXY12345678abcdefghkmnprstwxy';
  for (var i = 0; i < 4; i++) {
    var txt = str[randomNum(0, str.length)];
    ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
    ctx.font = randomNum(20, 26) + 'px SimHei'; //随机生成字体大小
    var x = 5 + i * 20;
    var y = randomNum(20, 25);
    var deg = randomNum(-20, 20);
    //修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate(deg * Math.PI / 180);
    ctx.fillText(txt, 5, 0);
    randomtext = randomtext + txt;
    //恢复坐标原点和旋转角度
    ctx.rotate(-deg * Math.PI / 180);
    ctx.translate(-x, -y);
  }
  /**绘制干扰线**/
  for (var i = 0; i < 4; i++) {
    ctx.strokeStyle = randomColor(40, 180);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, 90), randomNum(0, 28));
    ctx.lineTo(randomNum(0, 90), randomNum(0, 28));
    ctx.stroke();
  }
  /**绘制干扰点**/
  for (var i = 0; i < 20; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, 90), randomNum(0, 28), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.draw(false, function() {
    that.setData({
      randomtext: randomtext
    })
  });
}