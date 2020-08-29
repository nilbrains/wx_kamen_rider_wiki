//index.js
//获取应用实例
const app = getApp()
import {
  request,
  base_url
} from "../../utils/api";
Page({
  data: {
    articleList: [],
    isLoading: true,
    topImages: []
  },
  onLoad: function () {
    request({
        url: base_url + "/artList",
        "content-type": "application/json"
      })
      .then(res => {
        console.log("articleList==>", res.data);
        if (res.data instanceof Array) {
          this.setData({
            articleList: res.data,
            isLoading: false,
            topImages: JSON.parse(app.globalData.config.topPic)
          })
        }
      })
  },
  toArticleInfoPage(e) {
    let articleId = e.currentTarget.dataset.articleid;
    // console.log("articleId == >", articleId);
    wx.navigateTo({
      url: `/pages/articleInfo/articleInfo?articleid=${articleId}`,
    })
  },
  onShareAppMessage: function () {

  }
})