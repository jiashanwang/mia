// pages/my/index.js
// 获取应用实例
var getServer = require("../../utils/getServer.js");
var config = require("../../utils/util.js");
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo:"",
        userData:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户信息
        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo;
                this.setData({
                    userInfo: res.userInfo,
                });
                // 获取订单金额以及粉丝数量
                this.getAll(res.userInfo);
            }
        });
    },
    /**
     * 获取所有用户信息
     */
    getAll:function (userInfo){
        var _this = this;
        console.log(userInfo);
        var options = {
            url: config.baseUrl + "/getAll",
            method: "POST",
            data:{domainId:userInfo.nickName}
        };
        var promise = getServer(options);
        promise.then(function (results) {
            if(results.data.statusCode == 200){
                _this.setData({
                    userData:results.data.data
                });
            }
        })
    },
    previewImage:function (e){
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current]
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})