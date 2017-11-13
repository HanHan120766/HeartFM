//index.js
//获取应用实例
var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
    dataSource: {},
    hotZhuboList: [],
    indicatorDots: true,
    offset: 10,
    limit: 10,
    autoplay: true,
    interval: 5000,
    duration: 800,
    circular: true,
    isHaveData: true,
    scrollHeight: 0
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    let url = 'https://yiapi.xinli001.com/fm/diantai-page.json'
    api.fetchGet(url).then(res => {
			//更新数据
      that.setData({
        dataSource:res.data,
        hotZhuboList: res.data.hotlist
      })
    })
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
    that.setData({
      isHaveData: false
    })
    api.fetchGet('https://yiapi.xinli001.com/fm/diantai-hot-list.json',data).then(res => {
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
  },
  gotoZhuboList: function () {
    wx.navigateTo({url: '../zhuboList/index'})
  }

})
