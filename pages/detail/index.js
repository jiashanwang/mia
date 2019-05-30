// pages/detail/index.js
var getServer = require("../../utils/getServer.js");
var config = require("../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid: "",
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("详情页 onload 周期函数");
        var _this = this;
        console.log(options);
        this.setData({
            userid: options.userid
        });
        var options = {
            url: config.baseUrl + "/getByPhone",
            method: "POST",
            data: {
                userid: options.userid
            }
        };
        var promise = getServer(options);
        promise.then(function (res) {
            console.log("商品详情页请求如下：");
            console.log(res);
            if (res.data.statusCode == 200) {
                _this.setData({
                    list: res.data.data
                });
            }else {
                console.log("请求失败!");
            }
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