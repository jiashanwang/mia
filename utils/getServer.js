var getServer = function(option) {

    var promise = new Promise((resolve, reject) => {
        wx.request({
            // url: 'http://localhost:3000/saveInfo',
            url: option.url,
            // data: data,
            data:option.data,
            // method: "POST",
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
// var query = function (options){

// }
module.exports = getServer;