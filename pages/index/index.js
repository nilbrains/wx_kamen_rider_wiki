const app = getApp()
import { request,base_url } from "../../utils/api";
// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data: {
    isLoading: true,
    nowRider: {}
  },
  tovqq(e){
    // 跳转腾讯视频小程序
    // console.log(e.target.dataset.vid);
    const vid = e.target.dataset.vid;
    wx.navigateToMiniProgram({
      appId: 'wxa75efa648b60994b',
      path: 'preload_play/play/index?vid='+vid,
      success(){
        if (interstitialAd) {
          interstitialAd.show().catch((err) => {
            console.error(err)
          })
        }
      },
      fail(){
        wx.showToast({
          title: "不去看了吗？",
          icon: "none",
        });
      }
    })

  },
  adLoad() {
    console.log(' 广告加载成功')
  },
  adError(err) {
    console.log(' 广告加载失败', err)
  },
  adClose() {
    console.log(' 广告关闭')
  },
  onLoad() {
    this.initData()

    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-d93edf4f2a7f7752'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
  },
  initData(){
    request({url: `${base_url}/getNowRider`})
    .then(res => {
      // console.log(res);
      this.setData({
        nowRider: res.data,
        isLoading: false
      })
    })
  }
  
})
