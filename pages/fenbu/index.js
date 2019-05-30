// pages/fenbu/index.js
import * as echarts from '../../ec-canvas/echarts';
let chartLine;
var getServer = require("../../utils/getServer.js");
var config = require("../../utils/util.js");
const app = getApp();
var globalChart;
var initDatas;
/**
 * 获取Echarts 画图所需要的参数 柱形图
 */
// getOption: function (xData, data_cur, data_his) {
function getOption(xData, data) {
    var option = {
        xAxis: {
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data: data,
            type: 'line'
        }]
    };
    return option;
};
function initChart(canvas, width, height) {
    console.log("init chart 函数");
    console.log(width);
    console.log(height);
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);
    var xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var data = [820, 932, 901, 934, 1290, 1330, 1320];
    console.log(initDatas);
    // initDatas.dataAmount = [932, 901];
    // initDatas.xData = ['Tue', 'Wed'];
    console.log(initDatas.dataAmount);
    setTimeout(function () {
        var option = getOption(initDatas.xData, initDatas.dataAmount);
        chart.setOption(option);
        globalChart = chart;
        return chart;
    }, 1000);

}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [{
            name: "amount",
            value: "金额",
            checked: "true"
        },
        {
            name: "number",
            value: "笔数"
        }
        ],
        status: "amount", //  默认显示金额
        backgroundStatus: 1, // 1：今日 2：本周 3：本月 4：全年,
        list: [],
        ec: {
            onInit: initChart
        },
        initDatas: {}
    },
    /**
     * 单选框的点击事件
     */
    radioChange: function (res) {
        this.setData({
            status: res.detail.value
        });
        var _this = this;
        var id = this.data.backgroundStatus;
        var status = res.detail.value;
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
        var options = {
            url: config.baseUrl + "/queryByDateType",
            method: "POST",
            data: {
                status: status,
                dateType: id
            }
        };
        var promise = getServer(options);
        promise.then(function (results) {
            if (results.data.statusCode == 200) {
                // 请求成功
                _this.setData({
                    list: results.data.data
                });
                var list = results.data.data;
                var xData = [];
                var dataAmount = [];
                var dataNumber = [];
                var data;
                for (var i = 0; i < list.length; i++) {
                    xData.push(list[i].username);
                    dataAmount.push(list[i].totalPrice);
                    dataNumber.push(list[i].number);
                };
                if (_this.data.status == "amount") {
                    data = dataAmount;
                } else {
                    data = dataNumber;
                };
                console.log("当前单选类型为：");
                console.log(xData);
                console.log(data);
                globalChart.setOption({
                    xAxis: {
                        data: xData
                    },
                    series: [{
                        data: data
                    }]
                });
            } else {
                // 失败
                console.log("请求失败");
            }
        })
    },
    /**
     * 日期类型的点击事件
     */
    dateClick: function (e, id, status) {
        var _this = this;
        var id = id || Number(e.target.dataset.id);
        var status = status || this.data.status;
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
        var options = {
            url: config.baseUrl + "/queryByDateType",
            method: "POST",
            data: {
                status: status,
                dateType: id
            }
        };
        var promise = getServer(options);
        promise.then(function (results) {
            if (results.data.statusCode == 200) {
                // 请求成功
                _this.setData({
                    list: results.data.data
                });
                var list = results.data.data;
                var xData = [];
                var dataAmount = [];
                var dataNumber = [];
                var data;
                for (var i = 0; i < list.length; i++) {
                    xData.push(list[i].username);
                    dataAmount.push(list[i].totalPrice);
                    dataNumber.push(list[i].number);
                };
                if (_this.data.status == "amount") {
                    data = dataAmount;
                } else {
                    data = dataNumber;
                };

                console.log("日期点击事件为:");
                console.log(xData);
                console.log(data);
                var option = getOption(xData, data);
                console.log(option);
                initDatas = {
                    xData: xData,
                    data:data
                };
                // _this.data.ec.onInit();
                
                // globalChart.setOption(option);
                // xData = ["zhagn","liis","wuagnwu"];
                // data = [92.3,83.5, 77.8];
                globalChart.setOption({
                    xAxis: {
                        data: xData
                    },
                    series: [{
                        data: data
                    }]
                });
            } else {
                // 失败
                console.log("请求失败");
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        var status = this.data.status;
        var id = 1; // 默认展示今天的
        var params = {
            status: status,
            dateType: id
        };

        var options = {
            url: config.baseUrl + "/queryByDateType",
            method: "POST",
            data: params,
        };
        var promise = getServer(options);
        promise.then(function (results) {
            console.log("请求成功返回数据为：");
            if (results.data.statusCode == 200) {
                console.log(results)
                console.log(results.data.data);
                var list = results.data.data;
                var xData = [];
                var dataAmount = [];
                var dataNumber = [];
                for (var i = 0; i < list.length; i++) {
                    xData.push(list[i].username);
                    dataAmount.push(list[i].totalPrice);
                    dataNumber.push(list[i].number);
                };
                initDatas = {
                    xData: xData,
                    dataAmount: dataAmount,
                    dataNumber: dataNumber
                };

                _this.setData({
                    initDatas: {
                        xData: xData,
                        dataAmount: dataAmount,
                        dataNumber: dataNumber
                    }
                });
                // wx.setStorage({
                //     key: 'xData',
                //     data: xData,
                // });
                // wx.setStorage({
                //     key: 'dataAmount',
                //     data: dataAmount,
                // });
                // wx.setStorage({
                //     key: 'dataNumber',
                //     data: 'dataNumber',
                // })
                // _this.setData({
                //     columHidden: true
                // });
            } else {
                // 失败
                console.log("请求失败");
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