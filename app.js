import { method, WXAPPLOGIN } from "./utils/api"
import { request } from "./utils/request"

// app.js
App({
  towxml:require('/towxml/index'),

  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("nilbrains = res = >",res);
        request(WXAPPLOGIN,method.POST,{
          code: res.code
        }).then(res => {
          console.log("nilbrains = request = res = >",res);
          if (res.success) {
            this.globalData.bind = res.data.bind ?? false
            this.globalData.token = res.data.token ?? ""
            this.globalData.userInfo = res.data.user ?? null
            this.globalData.openid  = res.data.openid ?? ""
            wx.setStorageSync('user_token', this.globalData.token)
          }else{
            wx.showToast({
              title: res.message ?? '哎呀，出错啦',
              icon: 'error',
              duration: 2000
            })
          }
        }) 
      }
    })
  },
  globalData: {
    userInfo: null,
    bind: false,
    token: "",
    openid: "",
    version: "2.52.0"
  }
})
