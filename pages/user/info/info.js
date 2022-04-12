import {
  method,
  MODIFY_USER_DATA
} from "../../../utils/api"
import {
  request
} from "../../../utils/request"
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'
// pages/user/info/info.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    wxUserInfo: {},
    show: false,
    changeUserNameData: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUserProfile(show,successTodo) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if (!this.data.hasUserInfo) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            wxUserInfo: res.userInfo,
            hasUserInfo: true,
            changeUserNameData: res.userInfo.nickName,
            show: show
          })
          successTodo && successTodo()
        },
        fail: () => {
          this.setData({
            hasUserInfo: true,
            changeUserNameData: this.data.userinfo.name,
            show: show
          })
        }
      })
    } else {
      this.setData({
        show: show
      })
      successTodo && successTodo()
    }
  },
  changeUserNameDataChange(e) {
    this.setData({
      changeUserNameData: e.detail
    })
  },
  changeUserName() {
    this.getUserProfile(true)

  },
  onClose() {
    this.setData({
      show: false
    });
  },
  /**
   * 
   * @param {'name' | 'head' | 'account' } type 
   */
  changeUserData(type) {
    request(MODIFY_USER_DATA, method.POST, {
      name: this.data.changeUserNameData ?? '',
      head: this.data.wxUserInfo.avatarUrl ?? ''
    }).then(res => {
      wx.showToast({
        title: res.message,
        icon: res.success ? "success" : "error",
        duration: 2000
      })
      if (res.success) {
        const name = type == 'name' ? this.data.changeUserNameData : this.data.userinfo.name
        const head = type == 'head' ? this.data.wxUserInfo.avatarUrl : this.data.userinfo.head
        app.globalData.userInfo.name = name
        app.globalData.userInfo.head = head
        this.setData({
          ['userinfo.name']: name,
          ['userinfo.head']: head,
          show: false
        })
      }
    })
  },
  changeHead(e) {
    console.log(e);
    this.getUserProfile(false,() => {
      Dialog.confirm({
        title: '提示',
        message: '确定要修改头像吗?',
      })
        .then(() => {
          this.changeUserData("head")
        })
        .catch(() => {
        });
    })
  },
  onOK() {
    this.changeUserData("name")
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userinfo: app.globalData?.userInfo ?? {}
    })
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