import {
  request,
  base_url
} from "../../utils/api";
import {
  history
} from "../../utils/history";
Page({
  data: {
    tabs: [],
    contents: [],
    activeTab: 0,
    isLoading: true,
    tabSwiperHeight: 0,
    show:false
  },
  tabsSwiperHeight() {
    // tab 组件内的swiper高度自适应问题
    let index = this.data.activeTab;
    let queryDom = wx.createSelectorQuery();
    let winHeight = wx.getSystemInfoSync().windowHeight;
    queryDom.select('.tab-content-' + index).boundingClientRect().exec(rect => {
      this.setData({
        tabSwiperHeight: rect[0].height < winHeight ? winHeight : rect[0].height
      })
    })
  },
  onLoad() {
    let that = this;

    const clazzinfo = wx.getStorageSync('classification');

    // console.log(!clazzinfo);

    if (!clazzinfo) {
      that.getClazzInfo();
    } else {
      // console.log(Date.now(),clazzinfo.time,Date.now()-clazzinfo.time , Date.now()-clazzinfo.time > 1000*60*60)
      if (Date.now() - clazzinfo.time > 1000 * 60 * 60) {
        that.getClazzInfo();
      } else {
        this.setData({
          tabs: clazzinfo.data.tabs,
          contents: clazzinfo.data.contents,
          isLoading: false
        })
        that.tabsSwiperHeight();
      }
    }

  },
  getClazzInfo() {
    wx.setStorageSync('classification', {
      time: Date.now(),
      data: history
    })
    this.setData({
      tabs: history.tabs,
      contents: history.contents,
      isLoading: false
    })
    this.tabsSwiperHeight();
  },
  onTabCLick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    
    this.tabsSwiperHeight();
    setTimeout(()=>{
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      }
    },300)

  },
  toRiderInfoPage(e) {
    let riderId = e.currentTarget.dataset.riderid;
    let haveInfo = e.currentTarget.dataset.haveinfo;
    // console.log("riderid == >", riderId);
    console.log("haveInfo == >", haveInfo);

    if (haveInfo === "0" || haveInfo === 0) {
      console.log(12313213);

      wx.showModal({
        title: '提示',
        content: '非常抱歉暂时没有相关内容\n欢迎提交内容',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: `/pages/riderInfo/riderInfo?riderid=${riderId}`,
      })
    }
  },
  onShareAppMessage: function () {

  }
})