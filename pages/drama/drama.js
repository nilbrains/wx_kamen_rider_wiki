const {
  RIDER_INFO_LIST,
  method,
  INDEX_SWIPES,
  RIDER_EP
} = require("../../utils/api");
const {
  request
} = require("../../utils/request");


// pages/drama/drama.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索
    isLoading: false,
    searchValue: "",
    riders: [],
    targetRider: {},
    showPanelFlag: false,
    swipe: [],
    
    page: 1,
    pages: 0,
    formatRiderType: ["昭和", "平成", "令和"],
    newEp: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
    this.initSwipe()
    this.initNewOneData(1)
  },
  toRiderInfoPage(e) {
    wx.showLoading({
      title: '加载中',
    })
    const riderId = e.currentTarget.dataset.id
    const riders = this.data.riders
    let one = riders.filter(it => it.id == riderId)
    if (one.length > 0) one = one[0]
    console.log("nilrbains ride === > ", one);
    setTimeout(() => {
      wx.setStorageSync('you-de-show-a-rider', one)
      wx.navigateTo({
        url: '/pages/drama/info/info?id=' + one?.id,
        complete: () => {
          wx.hideLoading()
        }
      })
    }, 300)
  },
  initSwipe() {
    request(INDEX_SWIPES, method.GET).then(res => {
      if (res.success) {
        this.setData({
          swipe: res.data
        })
      }
    }).catch(res => {
      console.log("e == >" ,res);
    })
  },
  initData() {
    const page = this.data.page ?? 1
    let list = this.data.riders

    let listData = wx.getStorageSync(`rider-info-list-page-${page}`)
    console.log("listData === >", listData);

    if (listData) {
      list.push(...listData.records)
      this.setData({
        riders: list,
        pages: listData.pages
      })
    } else {
      request(RIDER_INFO_LIST, method.GET, {
        current: page,
        size: 15
      }).then(res => {
        console.log("nilbrains == list == >", res);
        let list = this.data.riders
        if (res.success) {
          wx.setStorageSync(`rider-info-list-page-${page}`, res.data)
          list.push(...res.data.records)
          this.setData({
            riders: list,
            pages: res.data.pages
          })
        }
      })

    }
  },
  itemClick(e) {
    const item = e.currentTarget.dataset.item;
    console.log(item);
    wx.setStorageSync('nil-rider-ep-page-data', item)
    wx.navigateTo({
      url: '/pages/drama/ep/ep',
    })
  },

  topage(target){
    const id = target.currentTarget.dataset?.path ?? ""
    console.log("pathid === >",id);
    wx.navigateTo({
      url: '/pages/article/article?id=' + id,
    })
  },
  initNewOneData(riderId) {

    request(RIDER_EP(riderId), method.GET, {
      current: 1,
      size: 2
    }).then(res => {
      let data = null
      if (res.success) {
        data = res.data.records
      } else {
        wx.showToast({
          title: res.message ?? '哎呀，出错啦',
          icon: 'error',
          duration: 2000
        })
      }
      this.setData({
        newEp: data ?? []
      })
    })
  },

  searchTodo(event) {

  },

  showPanel(event) {

  },

  showPanelClose() {
    this.setData({
      showPanelFlag: false
    });
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
  onReachBottom: function (e) {
    let page = this.data.page + 1
    if (page <= this.data.pages) {
      this.setData({
        page: page
      })
      this.initData()
    } else {
      page = this.data.pages
      this.setData({
        page: page
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})