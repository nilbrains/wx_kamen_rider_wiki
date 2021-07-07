let history = []
import {
  request,
  base_url,
  base_url_json
} from "../../utils/api";
import { compareDate, getDay } from "../../utils/util";
// pages/drama/drama.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索
    isLoading:true,
    searchValue:"",
    riders:[],
    targetRider: {},
    showPanelFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hostory = wx.getStorageSync('hostory')
    console.log(hostory.date);
    if(compareDate(hostory.date,new Date())){
      console.log(1);
      history = hostory.data
      this.setData({
        riders: hostory.data,
        isLoading: false
      })
    }else{
      console.log(2);
      this.initData()
    }
  },
  toRiderInfoPage(e) {
    let riderId = e.currentTarget.dataset.riderid;
    request({
      url: `${base_url}/haveInfo?id=${riderId}`,
      "content-type": "application/json",
    }).then(res => {
      console.log(res);
      if (res.err === "0" || res.err === 0) {
        wx.navigateTo({
          url: `/pages/riderinfo/riderinfo?riderid=${riderId}`,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '非常抱歉暂时没有相关内容'
        })
      }
      this.setData({
        showPanelFlag: false
      })
    })
  },
  initData(){
    request({url: `${base_url_json}/json/history.json`})
    .then(res => {
      // console.log(res);
      history = res

      wx.setStorageSync('hostory', {
        date: getDay(7),
        data: res
      })

      this.setData({
        riders: history,
        isLoading: false
      })
    })
  },
  searchTodo(event){
    // console.log(event.detail.trim());
    const s = event.detail.trim()
    let riders = [];
    if (s != "") {
      riders = history.filter(item => {
        return (item.name.toLowerCase()).indexOf(s.toLowerCase()) > -1;
      })
    } else {
      riders = history
    }

    this.setData({
      riders
    })
  },

  showPanel(event){
    const rider_id = event.target.dataset.id;
    console.log(rider_id);

    const targetRider = history.filter(item => item.id == rider_id)[0]

    console.log(targetRider);


    this.setData({
      targetRider,
      showPanelFlag: true
    })
  },



  showPanelClose() {
    this.setData({ showPanelFlag: false });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})