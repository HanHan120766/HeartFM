//index.js
//获取应用实例
var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
    hotZhuboList: [],
    offset: 0,
    limit: 10,

    isHaveData: true,
    scrollHeight: 0
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.getDiantaiList()
  },

  onShow () {
    wx.getSystemInfo( {
      success: ( res ) => {
        this.setData({
            scrollHeight: res.windowHeight
        })
      }
    })
  },

  getDiantaiList: function () {
    let that = this
    let data = {
      offset: that.data.offset,
      limit: that.data.limit
    }
    api.fetchGet('https://yiapi.xinli001.com/fm/diantai-new-list.json',data).then(res => {
      if (res.data.length >= that.data.limit) {
        that.setData({
          isHaveData: true
        })
      }
			//更新数据
      that.setData({
        hotZhuboList: that.data.hotZhuboList.concat(res.data)
      })
    })
  },

  getMoreData: function () {
    let that = this
    if (that.data.isHaveData) {
      that.setData({
        offset: that.data.hotZhuboList.length
      })
      that.getDiantaiList()
    }
  },

  onSwiper: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '../zhuboDetail/index?zhubo_id='+id})
  },
  gotoZhubo: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '../zhuboDetail/index?zhubo_id='+id})
  }

})
