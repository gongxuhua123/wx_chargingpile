// head.js
Component({
  data:{
    heights:0
  },
  properties:{
    headstxt:{
      type:String,
      value:''
    },
    displas:{
      type:String,
      value:''
    }
  },
  ready(e){
    var dt = this;
    dt.head = dt.selectComponent("#head");
    var dt = this;
    wx.getSystemInfo({
      success: function (res) {
        dt.setData({
          heights: res.statusBarHeight
        });
      },
    });
  },
  methods:{
    returns(){
      wx.navigateBack({
        delta: 1
      })
    },
    returntwo() {
      wx.redirectTo({
        url: '/pages/Me/Orderm/Orderm'
      })
    },
  }
})