var api = require('../../utils/api.js')
Page({
  data: {
    dataSource: {},
    scrollHeight: 0,
    offset: 0,
    limit: 10,
    dataList: [],
    isHaveData: true,
    options: {}
  },
  onLoad: function (options) {
    let that = this

    that.setData({
      options: options
    })
    let url = 'https://yiapi.xinli001.com/fm/diantai-detai.json?id=' + options.zhubo_id
    api.fetchGet(url).then(res => {
			//更新数据
      that.setData({
        dataSource:res.data
      })
    })
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
      diantai_id: that.data.options.zhubo_id,
      limit: that.data.limit
    }
    that.setData({
      isHaveData: false
    })
    api.fetchGet('https://yiapi.xinli001.com/fm/diantai-jiemu-list.json',data).then(res => {
      if (res.data.length >= that.data.limit) {
        that.setData({
          isHaveData: true
        })
      }
			//更新数据
      that.setData({
        dataList: that.data.dataList.concat(res.data)
      })
    })
  },
  getMoreData: function () {
    let that = this
    if (that.data.isHaveData) {
      that.setData({
        offset: that.data.dataList.length
      })
      that.getDiantaiList()
    }
  },
  gotoPlay: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '../HeartPlay/index?id='+id})
  },

})
