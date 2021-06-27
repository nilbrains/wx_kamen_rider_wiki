// export const base_url = "https://nilbrains.utools.club/"
// export const base_url = "https://jmqs.nilbrains.com/"
export const base_url = "http://apitest.nilbrains.com/rider/index"
// export const base_url = "https://api.nilbrains.com/rider/index"

export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      fail: (error) => {
        reject(error);
      },
      success: (res) => {
        resolve(res);
      },
    })
  }) 
}