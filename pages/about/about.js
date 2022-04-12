// pages/about/about.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        version: "",
        time: new Date().getFullYear()
    },

    showZLLY() {
        Dialog.alert({
            title: "资料来源",
            message: '资料大部分来自官网或者百度搜集\n如果涉及版权内容，请联系我们',
        }).then(() => {
            // on close
        });
    },
    showKFZ() {
        // Dialog.alert({
        //     title: "开发者",
        //     message: '你好呀\n我是 何云沐 ',
        // }).then(() => {
        //     // on close
        // });

        wx.navigateTo({
            url: '/pages/article/article?id=aboutme',
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        const config = wx.getAccountInfoSync().miniProgram

        this.setData({
            version: config.version || app.globalData.version
        })
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
})