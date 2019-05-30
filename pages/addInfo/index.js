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
        var options = {
            url:config.baseUrl + "/saveInfo",
            method:"POST",
            data:data,
        };
        var promise = getServer(options);
        promise.then(function (res){
            console.log("提交事件的返回值为：");
            console.log(res);
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
        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo;
                console.log("onLoad 获取用户数据");
                console.log(res.userInfo);
                this.setData({
                    userInfo: res.userInfo,
                })
            }
        });
        // wx.login({
        //     success: res => {
        //         // ------ 获取凭证 ------
        //         var code = res.code;
        //         console.log(code);
        //         var APPID = "wx7efa2624e024a128";
        //         var SECRET = "5e934ad57f4a67f155ab751929ca540e";
        //         var url = "https://api.weixin.qq.com/sns/jscode2session?appid='+APPID+'&secret='+SECRET+'&js_code='+code+'&grant_type=authorization_code'";
        //         if (code) {
        //             // console.log('获取用户登录凭证：' + code);
        //             // ------ 发送凭证 ------
        //             wx.request({
        //                 url: url,
        //                 data: {},
        //                 method: 'GET',
        //                 header: {
        //                     'content-type': 'application/json'
        //                 },
        //                 success: function (res) {
        //                     console.log(res);
        //                     if (res.statusCode == 200) {
        //                         console.log("获取到的openid为：" + res.data);
        //                         console.log(res.data);
        //                         // that.globalData.openid = res.data
        //                         wx.setStorageSync('openid', res.data)
        //                     } else {
        //                         console.log(res.errMsg)
        //                     }
        //                 },
        //             })
        //         } else {
        //             console.log('获取用户登录失败：' + res.errMsg);
        //         }
        //     }
        // })
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