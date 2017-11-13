
var api = require('../../utils/api.js')
Page({
  data: {
    dataSource: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 800,
    circular: true,
    discoverData: [
      {
        title: '心情',
        content: [
          {
            name: '烦躁',
            img: '../../images/discover/emotion1.png'
          },{
            name: '悲伤',
            img: '../../images/discover/emotion2.png'
          },{
            name: '孤独',
            img: '../../images/discover/emotion3.png'
          },{
            name: '已弃疗',
            img: '../../images/discover/emotion4.png'
          },{
            name: '减压',
            img: '../../images/discover/emotion5.png'
          },{
            name: '无奈',
            img: '../../images/discover/emotion6.png'
          },{
            name: '快来',
            img: '../../images/discover/emotion7.png'
          },{
            name: '感动',
            img: '../../images/discover/emotion8.png'
          },{
            name: '迷茫',
            img: '../../images/discover/emotion9.png'
          }
        ]
      },{
        title: '场景',
        content: [
          {
            name: '睡前',
            img: '../../images/discover/scene1.png'
          },{
            name: '旅行',
            img: '../../images/discover/scene2.png'
          },{
            name: '散步',
            img: '../../images/discover/scene3.png'
          },{
            name: '坐车',
            img: '../../images/discover/scene4.png'
          },{
            name: '独处',
            img: '../../images/discover/scene5.png'
          },{
            name: '失恋',
            img: '../../images/discover/scene6.png'
          },{
            name: '失眠',
            img: '../../images/discover/scene7.png'
          },{
            name: '随便',
            img: '../../images/discover/scene8.png'
          },{
            name: '无聊',
            img: '../../images/discover/scene9.png'
          }
        ]
      }
    ]
  },
  onLoad: function () {
    var that = this
    let url = 'https://bapi.xinli001.com/fm2/hot_tag_list.json/?flag=4&rows=3&offset=0'
    api.fetchGet(url).then(res => {
			//更新数据
      that.setData({
        dataSource:res.data
      })
    })
  },

  onSwiper: function(e) {
    var title = e.currentTarget.dataset.title
    wx.navigateTo({url: '../DiantaiList/index?tag='+title+'&type=0&id=-1'})
  },
  gotoList: function (e) {
    var title = e.currentTarget.dataset.name
    wx.navigateTo({url: '../DiantaiList/index?tag='+title+'&type=0&id=-1'})
  }

})
