var getServer = function(option) {

    var promise = new Promise((resolve, reject) => {
        wx.request({
            url: option.url,
            data:option.data,
            method:option.method,
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            dataType: "json",
            success: function(res) {
                resolve(res);
            },
            fail: function(err) {
                reject(err);
            }
        })
    });
    return promise;
};
module.exports = getServer;