// export const BASE_API = "http://192.168.0.108:8080";
export const BASE_API = "https://data.nilbrains.com";

export function request(url, method, data , flag = false) {
  let http = BASE_API + url;
  if (flag) {
    http = url
  }
  let token = wx.getStorageSync("user_token");
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: http,
      method: method,
      data: data,
      timeout: 5000 ,
      header: {
        'content-type': method == 'GET' ? 'application/x-www-form-urlencoded' : 'application/json' ,
        'auth': token ?? ''
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == '200') {
          resolve(res.data);
        } else {
          wx.showToast({
            title: res.data?.message ?? '哎呀，出了个错',
            icon: "error",
            duration: 2000
          })
          reject(res);
        }
      },
      fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '哎呀，出了个错',
          icon: "error",
          duration: 2000
        })
        reject(err);
      }
    })
  })
}