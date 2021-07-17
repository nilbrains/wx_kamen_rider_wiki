// app.js
import { request,base_url, base_url_json } from "./utils/api";
var plugin = requirePlugin("chatbot");
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        request({url:`${base_url}/wechatLogin`,data:{code:res.code}})
        .then(res=>{
          console.log(res);
          if (res.err == 0) {
            this.globalData.userData = res.data;
            plugin.init({
              appid: "yA06BiQTyC06r4Ccl4JlcsKrfGeEHe", 
              openid: res.data.openid,
              anonymous: true, 
              success: () => {}, //非必填
              fail: (error) => {}, //非必填
            });
          } else {
            wx.showModal({
              title:'提示',
              content:res.msg,
              showCancel:false
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    request({
      url: `${base_url_json}/json/now.json?t=${new Date().getTime()}`
    })
    .then(res => {
      this.globalData.config = res
    })

  },
  globalData: {
    userInfo: null,
    userData:{},
    config: {}
  }
})
