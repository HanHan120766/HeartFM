//index.js
//获取应用实例
var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
    dataSource: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 800,
    circular: true
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    let url = 'https://yiapi.xinli001.com/fm/home-list.json?key=046b6a2a43dc6ff6e770255f57328f89'
    api.fetchGet(url).then(res => {
			//更新数据
      that.setData({
        dataSource:res.data
      })
    })
  },
  onSwiper: function(e) {
    var type = e.currentTarget.dataset.type
    var title = e.currentTarget.dataset.title
    if (type == 'tag') {
      wx.navigateTo({url: '../DiantaiList/index?tag='+title+'&type=0&id=-1'})
    }

  },
  onCategory: function(e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    wx.navigateTo({url: '../DiantaiList/index?tag='+name+'&type=1&id='+id})
  },
  onMoreLesson: function(e) {
     wx.navigateTo({url: '../DiantaiList/index?tag=更多心理课&type=2&id=-1'})
  },
  onMoreFM: function(e) {
    wx.navigateTo({url: '../DiantaiList/index?tag=更多FM&type=3&id=-1'})
  },
  gotoPlay: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '../HeartPlay/index?id='+id})
  },
  gotoZhubo: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '../zhuboDetail/index?zhubo_id='+id})
  }

})
