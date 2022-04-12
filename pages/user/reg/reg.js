// pages/bind/bind.js
import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast";
import {
    BIND_ACCOUNT,
    CREATE_USER,
    SEND_MAIL_CODE,
    method
} from "../../../utils/api";
import {
    request
} from "../../../utils/request";
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bindType: false,
        userIsBind: false,
        userInfoWx: null,
        oneData: {
            email: "",
            password: "",
            code: "",
            rePassword: ""
        },
        snedStr: "发送验证码",
        sendDisable: false
    },

    bindEmail(e) {
        this.setData({
            ['oneData.email']: e.detail.value
        })
    },
    bindEmailCode(e) {
        this.setData({
            ['oneData.code']: e.detail.value
        })
    },
    bindPassword(e) {
        this.setData({
            ['oneData.password']: e.detail.value
        })
    },
    bindRePassword(e) {
        this.setData({
            ['oneData.rePassword']: e.detail.value
        })
    },

    sendCode() {
        const mailEx = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
        const email = this.data.oneData.email
        if (email.length === 0) {
            Toast("邮箱不能为空")
            return;
        }
        if (!mailEx.test(email)) {
            Toast("邮箱格式不符合")
            return;
        }
        request(SEND_MAIL_CODE, method.GET, {
                mail: email ?? "",
            })
            .then((res) => {
                if (res.success) {
                    Toast(res.message)
                    this.setData({
                        sendDisable: true,
                    })
                    this.countDown();
                } else {
                    Toast(res.message)
                }
            })
    },
    countDown() {
        let time = 60;
        let sendTimer = setInterval(() => {
            time--;
            if (time < 0) {
                clearInterval(sendTimer);
                sendMailStr.value = "发送验证码";
                sendMailDisable.value = false;
                this.setData({
                    snedStr: "发送验证码",
                    sendDisable: false,
                })
            } else {
                this.setData({
                    snedStr: `还有${time}s`,
                })
            }
        }, 1000);
    },
    createAccount() {
        const email = this.data.oneData.email
        const password = this.data.oneData.password
        const code = this.data.oneData.code
        const rePassword = this.data.oneData.rePassword
        // 判断格式是否正确
        const emailCheck = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/
        if (!emailCheck.test(email)) {
            Toast("邮箱格式不正确")
            return
        }
        if (code.length == "") {
            Toast("验证码不能为空")
            return
        }
        if (password.length < 6) {
            Toast("密码不能小于6位")
            return
        }
        if (password !== rePassword) {
            Toast("两次密码不一致")
            return
        }
        request(CREATE_USER, method.POST, {
            email,
            password,
            rePassword,
            code,
            name: email.split("@")[0]
        }).then(res => {
            if (res.success) {
                // Toast.success(res.message);
                wx.showToast({
                    title: "注册成功，请登录",
                    icon: "success",
                    duration: 2000,
                    success:() => {
                        wx.navigateBack()
                    }
                })
            } else {
                wx.showToast({
                    title: res.message ?? '哎呀，出了个错',
                    icon: "error",
                    duration: 2000
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            userIsBind: app.globalData.bind ?? false,
            ['oneData.email']: app.globalData.userinfo?.email ?? ""
        })
        console.log("nilbrains == > userIsBind == > ", this.data.userIsBind)
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