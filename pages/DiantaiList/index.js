//index.js
//获取应用实例
var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
    isGetGoodData: true,
    scrollHeight: 0,
    tag: '',
    offset: 0,
    rows: 15,
    limit: 15,
    dataSource: [],
    category_id: 0,
    type: -1//0:轮播图  1：category 2：心理课  3：fm
  },

  onLoad: function (options) {
    var tags = options.tag
    var type = options.type
    var id = options.id
    this.setData({
      tag: tags,
      type: type,
      category_id: id
    })
    wx.setNavigationBarTitle({
      title: tags
    });    
    this.getDataSource()
  },
  onShow () {
    wx.getSystemInfo( {
        success: ( res ) => {
            let top = 84 * res.windowWidth / 750
            this.setData({
                scrollHeight: res.windowHeight
            })
        }
    })
  },  

  getDataSource: function() {
    var that = this
    var url = ''
    var data = {}
    if (that.data.type == 0) {
      url = 'https://bapi.xinli001.com/fm2/broadcast_list.json'
      data = {
        rows: that.data.rows,
        offset: that.data.offset,
        key: 'c0d28ec0954084b4426223366293d190',
        is_teacher: 0,
        tag: that.data.tag
      }
    }else if (that.data.type == 1) {
      url = 'https://yiapi.xinli001.com/fm/category-jiemu-list.json'
      data = {
        category_id: that.data.category_id,
        key: 'c0d28ec0954084b4426223366293d190',
        offset: that.data.offset,
        limit: that.data.limit
      }
    }else if (that.data.type == 2) {
      url = 'https://bapi.xinli001.com/fm2/broadcast_list.json'
      data = {
        key: 'c0d28ec0954084b4426223366293d190',
        offset: that.data.offset,
        is_teacher: 1,
        rows: that.data.rows
      }      
    }else if (that.data.type == 3) {
      url = 'https://bapi.xinli001.com/fm2/broadcast_list.json'
      data = {
        key: 'c0d28ec0954084b4426223366293d190',
        offset: that.data.offset,
        is_teacher: 0,
        rows: that.data.rows
      }      
    }
    that.setData({
      isGetGoodData: false
    })    
    api.fetchGet(url, data).then(res => {
      if (res.data.length >= that.data.rows) {
        that.setData({
          isGetGoodData: true
        })
      }
      console.log(res)
      that.setData({
        dataSource: that.data.dataSource.concat(res.data)
      })    
    })
  },
  getMoreData: function(e) {
    var that = this
    if (that.data.isGetGoodData) {
      that.setData({
        offset: that.data.dataSource.length
      })
      that.getDataSource()
    }
  },
  gotoPlay: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '../HeartPlay/index?id='+id})
  }  
})









