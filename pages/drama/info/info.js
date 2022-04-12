const {
  RIDER_INFO,
  method,
  RIDER_EP
} = require("../../../utils/api");
const {
  request
} = require("../../../utils/request");

// pages/drama/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    riderInfo: {},
    showRiderIntro: "1",
    formatRiderType: ["昭和", "平成", "令和"],

    pages: 0,
    page: 1,

    eps: [],
    who: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cjcode =  wx.getLaunchOptionsSync()
    console.log("cjcode === > ",cjcode);
    let nuShowAd =  false
    if (cjcode?.scene == 1154) {
      nuShowAd = true
    }
    console.log("options.id == > ", options.id);
    const riderID = options.id
    const riderInfo = wx.getStorageSync('you-de-show-a-rider')
    console.log("riderInfo === >", riderInfo);
    this.setData({
      who: riderID,
      nuShowAd
    })
    if (riderInfo) {
      // stroge 中 存在 
      if (riderInfo.id == riderID) {
        // 一致
        this.setData({
          riderInfo: riderInfo,
        })
      } else {
        // 发请求
        this.initRiderInfo(riderID)
      }
    } else {
      // 发请求
      this.initRiderInfo(riderID)
    }
    this.initRiderEp(riderID)

  },
  initRiderEp(who) {
    let list = this.data.eps
    const page = this.data.page ?? 1
    let listData = wx.getStorageSync(`rider-ep-list-page-${page}`)
    if (listData) {
      list.push(...listData.records)
      // if (!this.data.nuShowAd) {
      //   list.push({showAd: true})
      // }
      this.setData({
        eps: list,
        pages: listData.pages
      })
    } else {
      request(RIDER_EP(who), method.GET, {
        current: page,
        size: 6
      }).then(res => {
        console.log("nilbrains == list == >", res);
        // let list = this.data.eps
        if (res.success) {
          list.push(...res.data.records)
          // if (!this.data.nuShowAd) {
          //   list.push({showAd: true})
          // }
          wx.setStorageSync(`rider-ep-list-page-${page}`, res.data)
          this.setData({
            eps: list,
            pages: res.data.pages
          })
        }
      })
    }

  },
  initRiderInfo(who) {
    request(RIDER_INFO(who), method.GET, {}).then(res => {
      if (res.success) {
        wx.setStorageSync('you-de-show-a-rider', res.data ?? {})
        this.setData({
          riderInfo: res.data ?? {},
        })
      } else {
        wx.showToast({
          title: res.message ?? '哎呀，出了个错',
          icon: "error",
          duration: 2000
        })
      }
    })
  },


  onChangeShowRiderIntro(event) {
    this.setData({
      showRiderIntro: event.detail,
    });
  },



  itemClick(e) {
    const item = e.currentTarget.dataset.item;
    console.log(item);
    wx.setStorageSync('nil-rider-ep-page-data', item)
    wx.navigateTo({
      url: '/pages/drama/ep/ep',
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let page = this.data.pages
    for (let index = 0; index <= page; index++) {
      wx.removeStorageSync(`rider-ep-list-page-${index + 1}`)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let page = this.data.pages
    for (let index = 0; index <= page; index++) {
      wx.removeStorageSync(`rider-ep-list-page-${index + 1}`)
    }
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
    let page = this.data.page + 1
    if (page <= this.data.pages) {
      this.setData({
        page: page
      })
      this.initRiderEp(this.data.who) 
    } else {
      page = this.data.pages
      this.setData({
        page: page
      })
    }
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: this.data.riderInfo.riderNameCn ??  this.data.riderInfo.riderName 
        })
      }, 2000)
    })
    return {
      title: this.data.riderInfo.riderNameCn ??  this.data.riderInfo.riderName ,
      path: '/page/drama/info/info?id=' + this.data.who,
      promise 
    }
  },
  onShareTimeline() {
    return {
      title: this.data.riderInfo.riderNameCn ??  this.data.riderInfo.riderName ,
      query: 'id=' + this.data.who,
      imageUrl : this.data.riderInfo.riderPic ?? ""
    }
  }
})