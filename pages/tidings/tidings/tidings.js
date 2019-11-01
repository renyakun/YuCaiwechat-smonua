// pages/tidings/tidings/tidings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newslist: [{
      id: 1,
      img: '../../../images/icon/notice.png',
      con: '通知',
      tit: '暂无通知',
      icon: 'infofill',
      timer: ''
    }, {
      id: 2,
      img: '../../../images/icon/see.png',
      con: '今日暂无查看',
      tit: '今日共有0名劳务查看',
      icon: '',
      timer: ''
    }, {
      id: 3,
      img: '../../../images/icon/subscribe.png',
      con: '订阅消息',
      tit: '暂无订阅消息',
      icon: 'infofill',
      timer: ''
    }, {
      id: 4,
      img: '../../../images/YuCai.jpg',
      con: '御材劳务官方助手',
      tit: '暂无消息',
      icon: '',
      timer: '22:20'
    }]
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})