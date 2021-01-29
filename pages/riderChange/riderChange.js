// pages/riderChange/riderChange.js
import {
  request,
  base_url
} from "../../utils/api";
let app = getApp();
let videoAd = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    riderInfo: {},
    newRiderInfo: {},
    isSaveLoading: false,
    add: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let riderid = options.riderid;

    console.log("riderChange Page - > riderid == > ", riderid);

    let method = options.m;

    let isAdd = false;
    let oldRiderInfo = {}

    if (method == 'add') {
      oldRiderInfo = {
        rider_name: options.name,
        rider_id: riderid,
        content: "",
        episode: "",
        platform: "",
        platform_link: ""
      }
      isAdd = true
    }else{
      oldRiderInfo = wx.getStorageSync('nowChangeInfo')
      isAdd = false
    }
    console.log("riderChange Page - > oldRiderInfo == > ", oldRiderInfo);

    this.setData({
      add: isAdd,
      riderInfo: oldRiderInfo,
      newRiderInfo: oldRiderInfo,
    })

    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-753c8495c3bb620e'
      })
      videoAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      videoAd.onError((err) => {
        console.log('onError event emit', err)
      })
    }

  },

  changeEpisode(event) {
    console.log(event.detail);

    let newRiderInfo = this.data.newRiderInfo;

    newRiderInfo.episode = event.detail

    this.setData({
      newRiderInfo
    })

  },
  changePlatform(event) {
    console.log(event.detail);
    let newRiderInfo = this.data.newRiderInfo;

    newRiderInfo.platform = event.detail

    this.setData({
      newRiderInfo
    })
  },
  changePlatformLink(event) {
    console.log(event.detail);
    let newRiderInfo = this.data.newRiderInfo;

    newRiderInfo.platform_link = event.detail

    this.setData({
      newRiderInfo
    })
  },
  changeContent(event) {
    console.log(event.detail);
    let newRiderInfo = this.data.newRiderInfo;

    newRiderInfo.content = event.detail

    this.setData({
      newRiderInfo
    })
  },
  saveData() {
    const that = this;
    this.setData({
      isSaveLoading: true
    })
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }

    videoAd.onClose(res => {
      // 用户点击了【关闭广告】按钮
      if (res && res.isEnded) {

        request({
          url: `${base_url}/changeInfo`,
          "content-type": "application/json",
          data: {
            userid: app.globalData.userData.id,
            changeData: that.data.newRiderInfo
          },
          method: 'post'
        }).then(res => {

          console.log(res.data);

          if (res.data.err === 0) {
            wx.showToast({
              title: '修改成功',
            })
          } else {
            wx.showToast({
              title: es.data.msg,
            })
          }

          this.setData({
            isSaveLoading: false
          })
        })
      } else {
        wx.showToast({
          title: '您已退出',
        })
        this.setData({
          isSaveLoading: false
        })
      }
    })

  },

  saveInfoData(){
    const that = this;
    this.setData({
      isSaveLoading: true
    })
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }

    videoAd.onClose(res => {
      // 用户点击了【关闭广告】按钮
      if (res && res.isEnded) {

        request({
          url: `${base_url}/addInfo`,
          "content-type": "application/json",
          data: {
            userid: app.globalData.userData.id,
            changeData: that.data.newRiderInfo
          },
          method: 'post'
        }).then(res => {

          console.log(res.data);

          if (res.data.err === 0) {
            wx.showToast({
              title: '添加成功',
            })
          } else {
            wx.showToast({
              title: es.data.msg,
            })
          }

          this.setData({
            isSaveLoading: false
          })
        })
      } else {
        wx.showToast({
          title: '您已退出',
        })
        this.setData({
          isSaveLoading: false
        })
      }
    })
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
    // 故事讲述的是帝骑穿越到各个假面骑士的世界去战斗的故事。空我、亚极陀、龙骑、555、剑、响鬼、甲斗王、电王、月骑、亚马逊、暗日、暗日生化体等假面骑士均会出现，这也是本剧的卖点之一。
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