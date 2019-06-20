// pages/all/index.js
var getServer = require("../../utils/getServer.js");
var config = require("../../utils/util.js");
// var query = require("../../")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [
            { name: "amount", value: "金额", checked: "true" },
            { name: "number", value: "笔数" }
        ],
        searchPath:"../../images/search1.png",
        status: "amount", //  默认显示金额
        backgroundStatus: 1, // 1：今日 2：本周 3：本月 4：全年,
        list: [],
        currUserName:"",
        userInfo:{},
        inputValue:""
    },
    /**
     * 金额和笔数的切换事件
     */
    radioChange: function (e) {
        this.setData({
            status: e.detail.value
        });
    },
    /**
     * 获取搜索输入框的值
     */
    bindKeyInput: function (e) {
        console.log(e.detail.value);
        this.setData({
            inputValue: e.detail.value
        })
    },
    /**
     * 日期类型切换的工具方法
     */
    changeDateType:function (id){
        switch (id) {
            case 1:
                this.setData({
                    backgroundStatus: 1
                });
                break;
            case 2:
                this.setData({
                    backgroundStatus: 2
                });
                break;
            case 3:
                this.setData({
                    backgroundStatus: 3
                });
                break;
            case 4:
                this.setData({
                    backgroundStatus: 4
                });
                break;
        };
    },
    /**
     * 根据日期类型获取用户数据
     */
    getQueryByDateType:function (id,status){
        var _this = this;
        var domain = _this.data.currUserName;
        var options = {
            url: config.baseUrl + "/queryByDateType",
            method: "POST",
            data: {
                status: status,
                dateType: id,
                domainId: domain,
                wxName: _this.data.inputValue
            }
        };
        var promise = getServer(options);
        promise.then(function (results) {
            if (results.data.statusCode == 200) {
                // 请求成功
                _this.setData({
                    list: results.data.data
                });
            } else {
                // 失败
                console.log("请求失败");
            }
        })
    },
    /**
     * 微信名称的模糊搜索
     */
    wxnameClick:function (e){
        var id = this.data.backgroundStatus;
        var status = this.data.status;
        this.getQueryByDateType(id,status);
    },
    /**
     * 日期类型的点击事件
     */
    dateClick: function (e) {
        var id = Number(e.target.dataset.id);
        var status = this.data.status;
        this.changeDateType(id);
        this.getQueryByDateType(id,status);
    },
    /**
     * 每条数据的点击事件
     */
    onDetails: function (e) {
        var currentUserid = e.currentTarget.dataset.userid;
        wx.navigateTo({
            url: '../detail/index?userid=' + currentUserid,
            success: function () {
                "跳转成功"
            },
            fail: function () {
                console.log("跳转失败")
            }
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
        var _this = this;
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                console.log(res);
                console.log("getStorage回调里面的方法为：00");
                var domain = res.data.nickName;
                _this.setData({
                    currUserName:domain
                });
                var status = _this.data.status;
                console.log(domain);
                var id = 1; // 默认展示今天的
                var params = {
                    status: status,
                    dateType: id,
                    domainId: domain,
                    wxName:_this.data.inputValue
                };
                var options = {
                    url: config.baseUrl + "/queryByDateType",
                    method: "POST",
                    data: params,
                };
                var promise = getServer(options);
                promise.then(function (results) {
                    if (results.data.statusCode == 200 && results.data.length !=0) {
                        // 请求成功
                        _this.setData({
                            list: results.data.data.splice(0, 8)
                        });
                        var list = results.data.data;
                        var xData = [];
                        var dataAmount = [];
                        var dataNumber = [];
                        for (var i = 0; i < list.length; i++) {
                            xData.push(list[i].username);
                            dataAmount.push(list[i].totalPrice);
                            dataNumber.push(list[i].number);
                        };
                        wx.setStorage({
                            key: 'xData',
                            data: xData,
                        });
                        wx.setStorage({
                            key: 'dataAmount',
                            data: dataAmount,
                        });
                        wx.setStorage({
                            key: 'dataNumber',
                            data: 'dataNumber',
                        })
                    } else {
                        // 失败
                        console.log("暂无数据");
                    }
                })
            },
        });
    
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