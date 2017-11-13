//index.js
//获取应用实例
var api = require('../../utils/api.js')
var animation
var app = getApp()
var num = 0
var rotate = 0;
Page({
  data: {
    dataSource: {},
    viewHeight: 0,
    viewWidth: 0,
    transform: '', //旋转动画属性
    rotateFlag: true, // 控制专辑图片旋转
    percent: 0,//加载进度  0~100%
    sliderValue: 0,//当前播放进度
    leftTime: 0,//已播放时间
    rightTime: 0,//一共的时间
    options: {}
  },

  onLoad: function (options) {
    this.setData({
        options: options
    })
  },

  onShow: function () {
    var that = this
    //获取系统宽高
    wx.getSystemInfo( {
        success: ( res ) => {
            that.setData({
                viewHeight: res.windowHeight,
                viewWidth: res.windowWidth
            })
        }
    })
    var id = that.data.options.id
    var datas = wx.getStorageSync('data')

    //如果进来的id==当前正在播放的   那么不在请求数据  继续原来的播放
    if (id == datas.id) {
      that.setData({
        dataSource: datas
      })

      wx.setNavigationBarTitle({
        title: datas.title
      });
      that.getBackgroundAudioPlayerInfo()
      that.myRotate();
      return
    }

    //获取数据
    let url = 'https://yiapi.xinli001.com/fm/broadcast-detail-old.json'
    let data = {
      key: 'c0d28ec0954084b4426223366293d190',
      id: id
    }
    api.fetchGet(url, data).then(res => {
			//更新数据
      that.setData({
        dataSource:res.data
      })
      wx.setStorageSync('data', res.data)//存数据
      wx.setNavigationBarTitle({
        title: res.data.title
      });
      //开始播放  旋转
      that.backgroundPlayMusic();
      that.myRotate();
      //启动播放监听
      setTimeout(() => {
        that.getBackgroundAudioPlayerInfo()
      }, 300);

    })
  },

  //循环监听播放信息
  getBackgroundAudioPlayerInfo: function() {
    var that = this
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        if (res.status == 1) {
          that.setData({
            rotateFlag: true,
          });
          that.setData({
            percent: res.downloadPercent,
            sliderValue: res.currentPosition/res.duration*100,
            leftTime: res.currentPosition.toFixed(0),
            rightTime: res.duration
          })
          if (that.data.percent != res.downloadPercent) {
            that.setData({
              percent: res.downloadPercent
            })
          }
        }else if (res.status == 0) {
          that.setData({
            percent: res.downloadPercent,
            sliderValue: res.currentPosition/res.duration*100,
            leftTime: res.currentPosition.toFixed(0),
            rightTime: res.duration,
            rotateFlag: false,
          })

        }
      },
      fail: function (e) {
        console.log(e)
      }
    })

    if (that.data.leftTime+1 == that.data.rightTime) {
      clearTimeout(animation);
      that.setData({
        rotateFlag: false,
        leftTime: (that.data.leftTime+1).toFixed(0)
      })
    }
    // console.log(that.data.rotateFlag)
    if (that.data.rotateFlag){
      setTimeout(() => {
        that.getBackgroundAudioPlayerInfo()
      }, 100)
    }

  },

  onHide: function () {
    clearTimeout(animation);
    this.setData({
      rotateFlag: false,
    });
  },

  //界面消失清除循环
  onUnload: function() {
    clearTimeout(animation);
    this.setData({
      rotateFlag: false,
    });
  },

  //改变播放进度
  changeSliderValue: function(e) {
    var that = this
    var time = e.detail.value

    if (that.data.rotateFlag) {

      wx.seekBackgroundAudio({
          position: time/100*that.data.rightTime
      })
    }else {
      that.setData({
        sliderValue: that.data.sliderValue
      })
    }

  },


  backgroundPlayMusic: function() {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: that.data.dataSource.url,
      title: that.data.dataSource.title,
      coverImgUrl: that.data.dataSource.cover
    })
  },
    // 专辑图片旋转函数
  myRotate: function() {
    rotate++;
    if (rotate == 360) {
      rotate = 0
    }
    let transform = `transform:rotate(${rotate}deg);`;
    this.setData({
      transform,
    });
    if (this.data.rotateFlag) {
      setTimeout(() => {
        this.myRotate();
      }, 30);
    };
  },

// 控制专辑图片旋转
  isPlayMusic: function() {
    // console.log(this.data.rotateFlag)
    if (this.data.rotateFlag) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  },
// 播放音乐
  playMusic: function() {
    this.backgroundPlayMusic()
    this.setData({
      rotateFlag: true,
    });
    this.myRotate();
    setTimeout(() => {
      this.getBackgroundAudioPlayerInfo()
    }, 300);


  },
// 暂停播放音乐
  pauseMusic: function() {
    this.setData({
      rotateFlag: false,
    });
    wx.pauseBackgroundAudio()
  },
  // gotoZhubo: function (e) {
  //   let id = e.currentTarget.dataset.id
  //   wx.navigateTo({url: '../zhuboDetail/index?zhubo_id='+id})
  // }
})
