
import { request,base_url } from "../../utils/api";
let app = getApp();
Page({
  data: {
    angle: 0,
  },
  onLoad() {
    request({
      url: `${base_url}config.json`,
      "content-type": "application/json"
    }).then(res => {
      app.globalData.config = res.data
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
