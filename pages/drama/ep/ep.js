import {
  COMMENT_SUBMIT,
  method
} from "../../../utils/api"
import {
  request
} from "../../../utils/request"

// pages/drama/ep/ep.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ep: {},
    showComment: false,
    message: "",
    comments: [],

    page: 1,
    pages: 0,
    autosize: {
      maxHeight: 200,
      minHeight: 100
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ep = wx.getStorageSync('nil-rider-ep-page-data')
    if (options.id) {
      request(`/rider/ep/${options.id}`,method.GET).then(res => {
        if (res.success) {
          ep = res.data
        }
      }).finally(() => {
        this.setData({
          ep
        })
        this.initComments()
      })
    }else {
      this.setData({
        ep
      })
      
      this.initComments()
    }
  },
  initComments() {
    let ep = {}
    if (this.data.ep) {
      ep = this.data.ep
    } else {
      ep = wx.getStorageSync('nil-rider-ep-page-data')
    }
    const page = this.data.page ?? 1
    request(COMMENT_SUBMIT, method.GET, {
      forId: ep.id,
      forType: "ep",
      current: page,
      size: 10
    }).then(res => {
      console.log("nilbrains == list == >", res);
      let list = this.data.comments
      if (res.success) {
        list.push(...res.data.records)
        this.setData({
          comments: list,
          pages: res.data.pages
        })
      }
    })

  },
  showBigImage() {
    /**
     * @type {string}
     */
    let pic = this.data.ep.pic
    if (/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(pic)) {
      let _ = pic.split("")
      _.pop()
      pic = _.join("")
      wx.previewImage({
        urls: [`${pic}1`, `${pic}2`, `${pic}3`],
      })
    }
  },
  gotoplay() {
    const vid = this.data.ep.playUrl
    if (vid == "" || vid == null) {
      wx.showToast({
        title: '播放地址不存在',
        icon: "error"
      })
      return
    }
    if (/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(vid)) {
      wx.setClipboardData({
        data: vid,
        success: () => {
          wx.showToast({
            title: '链接复制成功,去浏览器观看',
            icon: "none"
          })
        },
        fail: () => {
          wx.showToast({
            title: '链接复制失败',
            icon: "none"
          })
        }
      })
      return;
    }
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

  showCommentBox() {
    this.setData({
      showComment: true
    })
  },
  hideCommentBox() {
    this.setData({
      showComment: false
    })
  },
  onCommentChange(event) {
    this.setData({
      message: event.detail
    })
  },
  submitComment() {
    if (this.data.message.trim() === "") {
      wx.showToast({
        title: "多写几个字吧!",
        icon: "none"
      })
      return
    }
    request(COMMENT_SUBMIT, method.POST, {
      content: this.data.message,
      forId: this.data.ep.id,
      forType: "ep"
    }).then(res => {
      if (res.success) {
        wx.showToast({
          title: '评论成功,审核中',
          icon: "success"
        })
        this.hideCommentBox()
      } else {
        wx.showToast({
          title: res.message ?? '评论失败',
          icon: "error"
        })
        if (res.code === 20024) {
          wx.navigateTo({
            url: '/pages/user/bind/bind',
          })
        }
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
      this.initComments()
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
    const promise = new Promise(resolve => {
      wx.showLoading({
        title: '生成图片中',
      })
      setTimeout(() => {
        wx.hideLoading()
        resolve({
          title: this.data.ep.titleCn ?? this.data.ep.title,
          path: '/page/drama/ep/ep?id=' + this.data.ep.id,
          imageUrl: this.data.ep.pic
        })
      }, 1000)
    })
    return {
      promise
    }
  },
  onShareTimeline() {
    return {
      title: this.data.ep.titleCn ?? this.data.ep.title,
      query: 'id=' + this.data.ep.id,
      imageUrl: this.data.ep.pic
    }
  }
})