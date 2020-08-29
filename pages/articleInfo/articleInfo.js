// pages/articleInfo/articleInfo.js
var app = getApp()
import {
  request,
  base_url
} from "../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    isLoading: true
  },
  //声明一个数据请求方法
  getText: (url, callback) => {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (typeof callback === 'function') {
          callback(res);
        };
      }
    });
  },
  onLoad: function (options) {
    const _ts = this;
    _ts.getText(`${base_url}/showArticle?id=${options.articleid }`, res => {
      let obj = app.towxml(res.data, 'markdown', {
        // theme:'dark',
        events: {
          tap: e => {
            // console.log('tap', e.target.dataset);
            if (!e.target.dataset.hasOwnProperty('tag')) {
              // console.log(123132132);
              return;
            }
            if (e.target.dataset.data.tag === 'img') {
              wx.previewImage({
                urls: [e.target.dataset.data.attr.src],
              })
            }
          },
          change: e => {
            // console.log('todo', e);
          }
        }
      });

      _ts.setData({
        article: obj,
        isLoading: false
      });
    });

  },
  onReady() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShareAppMessage: function () {

  }
})