// miniprogram/pages/shelf.js
var app = getApp()
var page = 1
var keyword = ""
var noMore = false

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadMore: true,
    noMore: false,
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.get_shelf_list(that, "")
    this.setData({
      search: this.search.bind(this)
    })
  },

  //监听输入处理搜索请求
  search_shelf: function(e) {
    var keyword = e.detail.value;
    // console.log(keyword);
    var that = this;

    //先清空数据
    this.setData({
      search_result: [],
      result: []
    });
    
    this.get_shelf_list(that, keyword, 1);
  },
  //处理搜索栏请空
  search_clear: function(e) {
    this.setData({
      result: []
    });
    this.get_shelf_list(this, "", 1);
  },
  //search方法（promise）
  search: function(keyword) {
    console.log(keyword)
    return new Promise((resolve, reject) => {
      var req_url = app.globalData.rest.prod.list
      req_url += "?keyword=" + keyword
      
      wx.request({
        url: req_url,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var item = 0
          var covers = ""
          var data_list = []
          for (item in res.data.results) {
            data_list.push({
              text: res.data.results[item].titleCh,
              value: res.data.results[item].gameId
            })
            // if (res.data.results[item]["mp_cover"].length == 0) {
            //   covers = res.data.results[item]["cover"].replace(/\'/g, "\"")
            //   res.data.results[item]["mp_cover"] = JSON.parse(covers)
            // }
          }
          resolve(data_list)
        },
        fail(err) {
          console.log(err)
          noMore = true
          that.setData({
            noMore: true
          })
        }
      })
    })
  },
  //结果点击事件
  selectResult: function (e) {
    var game_id = e.detail.item.value
    wx.navigateTo({
      url: '/pages/shelf/detail/detail?id=' + game_id,
    })
  },
  
  //获取游戏数据
  get_shelf_list: function (that, keyword, page = 1) {
    console.log(keyword)
    var req_url = app.globalData.rest.prod.list
    req_url += "?page=" + page
    if (keyword.length > 0) {
      req_url += "&keyword=" + keyword
    }
    wx.request({
      url: req_url,
      method: 'GET',
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var item = 0
        var covers = ""
        for (item in res.data.results) {
          if (res.data.results[item]["mp_cover"].length == 0) {
            covers = res.data.results[item]["cover"].replace(/\'/g, "\"")
            res.data.results[item]["mp_cover"] = JSON.parse(covers)
          }
        }
        var data_list = []
        if (that.data.result) {
          data_list = that.data.result
          for (item in res.data.results) {
            data_list.push(res.data.results[item])
          }
        } else {
          data_list = res.data.results
        }
        console.log(data_list)
        that.setData({
          result: data_list,
          loadMore: false
        })
      },
      fail(res) {
        noMore = true
        that.setData({
          noMore: true
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("page="+page+", keyword="+keyword)
    this.setData({
      loadMore: true
    })
    if (noMore == false) {
      page++
      var that = this
      this.get_shelf_list(that, keyword, page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  /**
   * 跳转到对应的位置
   */
  go_detail: function (event) {
    var game_id = event.currentTarget.dataset.gid
    // console.log(game_id)
    wx.navigateTo({
      url: '/pages/shelf/detail/detail?id=' + game_id,
    })
  }
})