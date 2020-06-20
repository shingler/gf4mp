// pages/shelf/detail.js
Page({

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var app = getApp()
        var that = this
        var intro_data
        //获取游戏信息
        wx.request({
            url: app.globalData.rest.prod.detail + options["id"] + "/",
            dataType: "json",
            success: function(res) {
                res.data.cover = JSON.parse(res.data.cover.replace(/\'/g, "\""))
                res.data.thumb = JSON.parse(res.data.thumb.replace(/\'/g, "\""))
                if (res.data.mp_cover.length == 0) {
                  res.data.mp_cover = res.data.cover
                }
                if (res.data.mp_thumb.length == 0) {
                  res.data.mp_thumb = res.data.thumb
                }
                //过滤掉html标签
                res.data.intro = res.data.intro.replace(/<br>/ig, "\n\n")
                res.data.intro = res.data.intro.replace(/<\/?[^>]*>/g, '')
                console.log(res.data.mp_thumb.length)
                console.log(res.data.mp_cover[0])
                that.setData({
                    background: res.data.mp_thumb.length>0 ?
                      res.data.mp_thumb :
                      [res.data.mp_cover_detail[0]],
                    info: res.data
                })
                // console.log(that.data.info.subjects)
            }
        })
        //获取评分信息
        wx.request({
          url: app.globalData.rest.prod.magzine + "?gameId=" + options["id"],
          dataType: "json",
          success: function(res) {
            // console.log(res)
            that.setData({
              magzine: res.data
            })
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

    },
    onShareAppMessage() {
        return {
          title: 'swiper',
          path: 'page/component/pages/swiper/swiper'
        }
      },
    
      data: {
        background: [],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 4000,
        duration: 100,
        icon: {
          "switch": "/images/icon/switch.png",
          "ps4": "/images/icon/ps4.png",
          "metacritic": "/images/icon/metacritic.png",
          "Famitsu": "/images/icon/famitsu.png",
          "gamespot": "/images/icon/gamespot.png"
        }
      },
      
})