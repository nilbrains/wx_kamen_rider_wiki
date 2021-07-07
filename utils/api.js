// export const base_url = "http://apitest.nilbrains.com/rider/index"
export const base_url = "https://api.nilbrains.com/rider/index"
export const base_url_json = "https://jmqs.nilbrains.com/file"

export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      fail: (error) => {
        reject(error);
      },
      success: (res) => {
        resolve(res.data);
      },
    })
  }) 
}