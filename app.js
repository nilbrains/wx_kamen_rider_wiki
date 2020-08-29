import { request,base_url } from "./utils/api";
App({
  towxml:require('/towxml/index'),

  onLaunch: function () {
    let that = this;
    // 登录
    wx.login({
      success: res => {
        request({url:`${base_url}/wechatLogin`,data:{code:res.code}})
        .then(res=>{
          console.log(res.data);
          if (res.data.err == 0) {
            that.globalData.userData = res.data.data;
          } else {
            wx.showModal({
              title:'提示',
              content:res.data.msg,
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
  },
  globalData: {
    userInfo: null,
    config:{},
    userData:{}
  }
})