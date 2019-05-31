// pages/addInfo/index.js
var getServer = require("../../utils/getServer.js");
var config = require("../../utils/util.js");
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: "", // 微信名
        phone: 0, // 手机号
        phoneStatus: -1, // 手机号初始值 1:不能为空，2：格式不对，
        userInfo:{}
    },
    /**
     * 提交事件
     */
    formSubmit(e) {
        var _this = this;
        var params = e.detail;
        var reg1 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/; // 手机号匹配
        if(reg1.test(params.phone)){
            this.setData({
                phoneStatus:2
            });
            return;
        }else if (params.phone){
            this.setData({
                phoneStatus: 1
            });
            return;
        };
        var data  = e.detail.value;
        data.username = this.data.userInfo.nickName;
        // data.username = "蓝天";
        var options = {
            url:config.baseUrl + "/saveInfo",
            method:"POST",
            data:data,
        };
        var promise = getServer(options);
        promise.then(function (res){
           if(res.data.statusCode == 200){
               wx.showToast({
                   title: '成功',
                   icon: 'success',
                   duration: 2000
               });
               
            };
        },function (err){
            console.log(err);
        })
    },
    /**
     * 表单重置事件
     */
    formReset() {
        console.log('form发生了reset事件');
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户信息
        var _this = this;
        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo;
                console.log(res.userInfo);
                wx.setStorage({key:'userInfo', data:res.userInfo});
                _this.setData({
                    userInfo: res.userInfo,
                })
            }
        });
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