import {
  request,
  base_url
} from "../../utils/api";
Page({
  data: {
    tabs: [],
    contents: [],
    activeTab: 0,
    isLoading: true,
    tabSwiperHeight: 0
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
    request({
      url: base_url + "/classList",
      "content-type": "application/json"
    }).then(res => {
      // console.log("classification == >", res.data);
      this.setData({
        tabs: res.data.tabs,
        contents: res.data.contents,
        isLoading: false
      })
      this.tabsSwiperHeight();
    })
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
    
  },
  showImg(e){
    let curCon = this.data.contents[this.data.activeTab];
    let imgs = curCon.map(item=>item.pic);
    wx.previewImage({
      current:e.currentTarget.dataset.ridersrc,
      urls: imgs,
    })
  },
  toRiderInfoPage(e) {
    let riderId = e.currentTarget.dataset.riderid;
    let haveInfo = e.currentTarget.dataset.haveinfo;
    // console.log("riderid == >", riderId);
    // console.log("haveInfo == >", haveInfo);

    if (haveInfo === 0) {
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