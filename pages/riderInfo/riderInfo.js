// pages/riderInfo/riderInfo.js
import {
  request,
  base_url
} from "../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: {},
    riderid: '',
    isLoading: true
  },
  adLoad() {
    console.log('Grid 广告加载成功')
  },
  adError(err) {
    console.log('Grid 广告加载失败', err)
  },
  adClose() {
    console.log('Grid 广告关闭')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("info riderid ==> ",options.riderid);

    this.setData({
      riderid: options.riderid,
    })
  },

  // 编辑 内容 需要 去掉 10 py币
  toChangePage() {
    console.log(" 内容 == > ", this.data.contents);

    // 将 内容 保存到 storage

    wx.setStorageSync('nowChangeInfo', this.data.contents)

    wx.navigateTo({
      url: `/pages/riderChange/riderChange?riderid=${this.data.riderid}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isLoading: true
    })
    request({
      url: `${base_url}/getInfo?id=${this.data.riderid}`,
      "content-type": "application/json"
    }).then(res => {
      // console.log("classification == >", res.data);
      if (res.data.err === 0) {
        this.setData({
          contents: res.data.data,
          isLoading: false
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
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