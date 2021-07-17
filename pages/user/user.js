// pages/user/user.js

import { request, base_url } from "../../utils/api";
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
let app = getApp();

// 在页面中定义激励视频广告
let videoAd = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    isSginIn: false,
    pyb: 0,
    days: 0,
    flagCache: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flag = this.isToday(app.globalData.userData.sgin_today);
    console.log(flag, app.globalData.userData);

    this.setData({
      pyb: app.globalData.userData.pyb || 0,
      days: app.globalData.userData.days || 0,
      isSginIn: flag,
      notice: app.globalData.config.notice || ""
    });
    
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: "adunit-753c8495c3bb620e",
      });
      videoAd.onLoad(() => {});
      videoAd.onError((err) => {});
      videoAd.onClose((res) => {
        wx.showToast({
          title: "谢谢",
          icon: "none",
        });
      });
    }
  },
  showad() {
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd
          .load()
          .then(() => videoAd.show())
          .catch((err) => {
            console.log("激励视频 广告显示失败");
          });
      });
    }
  },
  isToday(str) {
    var d = new Date();
    var y = d.getFullYear(); // 2014
    var m =
      d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1 + ""; // 7,月份从0开始的，注意
    var d = d.getDate() < 10 ? "0" + d.getDate() : d.getDate() + ""; // 9
    var date_str = y + "-" + m + "-" + d;
    return str == date_str;
  },
  toSginIn() {
    // console.log(app.globalData.userData.id);

    if (this.isToday(app.globalData.userData.sgin_today)) {
      wx.showToast({
        title: "今天已签到",
        icon: "none",
      });
      return;
    }
    request({
      url: `${base_url}/wechatSginIn`,
      data: {
        userid: app.globalData.userData.id,
      },
    }).then((res) => {
      app.globalData.userData = res.data;
      wx.showToast({
        title: "签到成功",
        icon: "none",
      });
      this.setData({
        isSginIn: true,
        pyb: app.globalData.userData.pyb,
        days: app.globalData.userData.days,
      });
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  callback() {
    wx.navigateTo({
      url: "/pages/callback/callback",
    });
  },
  aboutus() {
    wx.navigateTo({
      url: "/pages/about/about",
    });
  },
  cleardisk() {
    let flag = this.data.flagCache;
    console.log(flag);

    if (flag < 1) {
      flag++;
      Notify({
        type: "warning",
        message: "确定清空分类缓存吗 \n 那么再点一次",
        duration: 1000,
      });
    } else {
      flag = 0;
      wx.showLoading({
        title: "清除中....",
      });
      setTimeout(() => {
        wx.clearStorage({
          success: (res) => {
            wx.hideLoading({
              success: (res) => {
                Notify({
                  type: "primary",
                  message: "清空分类缓存成功\n请重新进入小程序",
                });
              },
            });
          },
        });
      }, 1500);
    }
    this.setData({
      flagCache: flag,
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
