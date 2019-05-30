//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: '自用省钱 分享赚钱',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        console.log("图片点击事件");
        wx.navigateTo({
            url: '../addInfo/index'
        });
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            console.log("app.globalData.userInfo");
            console.log(app.globalData.userInfo);
            wx.setStorage({
                key: 'userInfo',
                data: app.globalData.userInfo,
            });
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
                // motto:"您好 " + app.globalData.userInfo.nickName

            })
        } else if (this.data.canIUse) {
            console.log("2")
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log("res.userinfo");
                console.log(res.userInfo);
                wx.setStorage({
                    key: 'userInfo',
                    data: res.userInfo,
                });
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                    // motto: "您好 " + app.globalData.userInfo.nickName
                })
            };

            // 获取用户信息
            //   this.getUserInfo();
        } else {
            console.log("3")
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    console.log("res.userInfo33");
                    app.globalData.userInfo = res.userInfo
                    wx.setStorage({
                        key: 'userInfo',
                        data: res.userInfo,
                    });
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                        // motto: "您好 " + app.globalData.userInfo.nickName
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            // motto: "您好 " + app.globalData.userInfo.nickName
        })
    }
})