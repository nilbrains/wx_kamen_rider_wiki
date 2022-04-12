import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
import {
  method,
  YI_SAY
} from "../../utils/api";
import {
  request
} from "../../utils/request";
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userIsBind: false,
    userInfo: null,
    flagCache: 0,
    notice: "",
    appId: "wx8abaf00ee8c3202e",
    extraData: {},
    yisay: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yisay: "hello !!!"
    })
  },
  onShow() {
    const extraData = {
      id: "372933",
      customData: {
        customInfo: app.globalData.userInfo?.name ?? ""
      }
    }
    this.setData({
      userIsBind: app.globalData.bind ?? false,
      userInfo: app.globalData.userInfo ?? null,
      extraData
    })
  },

  toBindIn() {
    if (this.data.userIsBind) {
      // Notify({
      //   type: "success",
      //   message: "已经绑定过账号了",
      //   duration: 1000,
      // });
      wx.navigateTo({
        url: "/pages/user/info/info",
      });
    } else {
      wx.navigateTo({
        url: "/pages/user/bind/bind",
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
                  message: "清空缓存成功\n请重新进入小程序",
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