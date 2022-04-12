const { method, V_CODE } = require("../../../utils/api")
const { request } = require("../../../utils/request")

let app = getApp()
// pages/user/code/code.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        codes: [],
        message:""
    },

    getCode() {
        console.log("app.globalData.openid == >"+ app.globalData.openid);
        this.setData({
            loading: true
        })
        setTimeout(() => {
            request(V_CODE,method.GET,{
                openid: app.globalData.openid ?? ""
            }).then(res => {
                if (res.success) {
                    this.setData({
                        codes: res.data,
                        message: res.message,
                        loading: false
                    })
                } else {
                    this.setData({
                        codes: [0,0,0,0,0,0],
                        message: "请重新获取",
                        loading: false
                    })
                }
            }).catch(() => {
                this.setData({
                    codes: [0,0,0,0,0,0],
                    message: "请重新获取",
                    loading: false
                })
            }) 
        }, 500);
    },

    cancel() {
        wx.switchTab({
          url: '/pages/drama/drama',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.getCode()
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