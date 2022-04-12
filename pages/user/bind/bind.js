// pages/bind/bind.js
import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast";
import {
  BIND_ACCOUNT,
  method
} from "../../../utils/api";
import {
  request
} from "../../../utils/request";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindType: false,
    userIsBind: false,
    userInfoWx: null,
    oneData: {
      email: "",
      password: ""
    }
  },

  bindEmail(e) {
    this.setData({
      ['oneData.email']: e.detail.value
    })
  },
  bindPassword(e) {
    this.setData({
      ['oneData.password']: e.detail.value
    })
  },
  bindingAccount() {
    const email = this.data.oneData.email
    const password = this.data.oneData.password
    // 判断格式是否正确
    const emailCheck = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/
    if (!emailCheck.test(email)) {
      Toast("邮箱格式不正确")
      return
    }
    if (password.length < 6) {
      Toast("密码不能小于6位")
      return
    }


    request(BIND_ACCOUNT, method.POST, {
      openid: app.globalData.openid ?? '',
      email,
      password
    }).then(res => {
      if (res.success) {
        // Toast.success(res.message);
        wx.showToast({
          title: res.message ,
          icon: "success",
          duration: 2000
        })

        app.globalData.userInfo = res.data.userinfo;
        app.globalData.token = res.data.token;
        app.globalData.bind = true
        wx.setStorageSync('user_token', res.data.token)

        wx.navigateBack({
          delta: 0,
        })
      }else {
        wx.showToast({
          title: res.message,
          icon: "error",
          duration: 2000
        })
      }
    })
  },
  changeBindType() {
    wx.navigateTo({
      url: '/pages/user/reg/reg',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      userIsBind: app.globalData.bind ?? false,
      ['oneData.email']: app.globalData.userinfo?.email ?? ""
    })
    console.log("nilbrains == > userIsBind == > " ,this.data.userIsBind)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})