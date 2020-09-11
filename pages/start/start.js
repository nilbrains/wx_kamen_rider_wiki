
let app = getApp();
Page({
  data: {
    angle: 0,
  },
  onLoad() {
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
    wx.navigateTo({
      url: '/pages/classification/classification',
    })
  },
  onShareAppMessage: function () {

  }
});
