const app = getApp()
import { request,base_url } from "../../utils/api";
Page({
  data: {
    isLoading: true,
    nowRider: {}
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
