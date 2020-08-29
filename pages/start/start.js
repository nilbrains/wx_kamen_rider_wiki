
import { request,base_url } from "../../utils/api";
let app = getApp();
Page({
  data: {
    angle: 0,
  },
  onLoad() {
    request({
      url: `${base_url}/getConfig`,
      "content-type": "application/json"
    }).then(res => {
      let kkk = {}
      res.data.forEach(item=>{
          kkk[item.key] = item.value
      })
      app.globalData.config = kkk
    })
  },
  onReady() {
    var that = this;
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);

      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }

      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  goToIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onShareAppMessage: function () {

  }
});
