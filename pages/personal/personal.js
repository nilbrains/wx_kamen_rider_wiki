const {
  request,
  base_url
} = require("../../utils/api");
import Notify from '../../components/vant/notify/notify';
// pages/personal/personal.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    version: "V1.2.3",
    isSginIn: false,
    pyb: 0,
    days: 0,
    flagCache:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flag = this.isToday(app.globalData.userData.sgin_today);
    console.log(flag,app.globalData.userData.sgin_today);
    
    this.setData({
      pyb: app.globalData.userData.pyb,
      days: app.globalData.userData.days,
      isSginIn: flag
    })
  },
  isToday(str) {
    var d = new Date();
    var y = d.getFullYear(); // 2014
    var m = d.getMonth()<10?"0"+(d.getMonth()+1):(d.getMonth()+1)+""; // 7,月份从0开始的，注意
    var d = d.getDate()<10?"0"+d.getDate():d.getDate()+""; // 9
    var date_str = y + '-' + m + '-' + d;
    return str == date_str;
  },
  toSginIn() {
    // console.log(app.globalData.userData.id);

    if (this.isToday(app.globalData.userData.sgin_today)) {
      wx.showToast({
        title: '今天已签到',
        icon:'none'
      })
      return;
    }
    request({
        url: `${base_url}/wechatSginIn`,
        data: {
          userid: app.globalData.userData.id
        }
      })
      .then(res => {
        app.globalData.userData = res.data.data;
        wx.showToast({
          title: '签到成功',
          icon:'none'
        })
        this.setData({
          isSginIn: true,
          pyb: app.globalData.userData.pyb,
          days: app.globalData.userData.days,
        })
      })
  },
  clearCache(){
    let flag = this.data.flagCache;
    console.log(flag);

    if (flag<1) {
      flag ++;
      Notify({ type: 'warning', message: '确定清空分类缓存吗 \n 那么再点一次' ,duration:1000 })
    }else{
      flag = 0;
      wx.showLoading({
        title: '清除中....',
      })
      setTimeout(() => {
        wx.setStorageSync('classification',"");
        wx.hideLoading({
          success: (res) => {
            Notify({ type: 'primary', message: '清空分类缓存成功\n请重新进入小程序' })
          },
        })
      }, 1500);
    }
    this.setData({
      flagCache:flag
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})