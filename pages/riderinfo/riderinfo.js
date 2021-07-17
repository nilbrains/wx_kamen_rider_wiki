// pages/riderInfo/riderInfo.js
import { request, base_url } from "../../utils/api";
let interstitialAd = null;
let riderid = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contents: {},
    riderss: {},
    isLoading: true,
  },
  adLoad() {
    console.log("Grid 广告加载成功");
  },
  adError(err) {
    console.log("Grid 广告加载失败", err);
  },
  adClose() {
    console.log("Grid 广告关闭");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: "adunit-d93edf4f2a7f7752",
      });
      interstitialAd.onLoad(() => {});
      interstitialAd.onError((err) => {});
      interstitialAd.onClose(() => {});
    }
    
    riderid = options.riderid
    this.initData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  initData() {
    request({
      url: `${base_url}/getInfo?id=${riderid}`,
      "content-type": "application/json",
    }).then((res) => {
      // console.log("classification == >", res.data);
      if (res.err === 0) {
        const hostory = wx.getStorageSync("hostory");
        const data = hostory.data;
    
        const rider = data.filter((item) => item.id == riderid)[0];
        this.setData({
          contents: res.data,
          riderss: rider,
          isLoading: false,
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
      }
    });
  },

  tovqq(e) {
    const vid = e.target.dataset.vid;
    wx.navigateToMiniProgram({
      appId: "wxa75efa648b60994b",
      path: "preload_play/play/index?vid=" + vid,
      success() {
        if (interstitialAd) {
          interstitialAd.show().catch((err) => {
            console.error(err);
          });
        }
      },
      fail() {
        wx.showToast({
          title: "不去看了吗？",
          icon: "none",
        });
      },
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
