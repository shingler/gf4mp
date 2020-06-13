// miniprogram/pages/shelf/magzine/magzine.js
var app = getApp()
Page({

    data: {
        nbFrontColor: '#000000',
        nbBackgroundColor: '#ffffff',
        origin_show: 'hidden'
      },
    onLoad: function(options) {
        var id = options["id"]
        var that = this
        var magzine_info, shelf_info
        // var app = getApp()

        this.setData({
            nbTitle: '新标题',
            nbLoading: true,
            nbFrontColor: '#ffffff',
            nbBackgroundColor: '#000000',
        })

        magzine_info = this.getMagzineScore(id, that)

    },
    //获取媒体评分
    getMagzineScore: function(id, that) {
        wx.request({
            url: app.globalData.rest.prod.magzine + id + "/",
            dataType: "json",
            success: function(res) {
                that.setData({
                    info: res.data
                })
            }
        })
    },
    //显示原文
    show_origin: function() {
        console.log(this.data)
        this.setData({
            origin_show: this.data.origin_show=="hidden"?'show':"hidden"
        })
    },

})