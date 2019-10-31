// pages/classify/order/order.js
const {
  $Toast
} = require('../../../colorui/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 1,
    scrollLeft: 0,
    tablist: [{
      id: 1,
      flag: '全部订单',
      badge: 89,
    }, {
      id: 2,
      flag: '待付款',
      badge: 12,
    }, {
      id: 3,
      flag: '待发货',
      badge: 34,
    }, {
      id: 4,
      flag: '待收货',
      badge: 6,
    }, {
      id: 5,
      flag: '待评价',
      badge: 8,
    }, {
      id: 6,
      flag: '售后',
      badge: 0,
    }],
    listitem: [{
      id: 1,
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tit: '劳务派遣工政策的相关规定',
      con: '为规范劳务派遣，维护劳动者，',
      browse: 60,
      praise: 56,
      message: 24,
      flag: '待付款',
      color: 'red'
    }, {
      id: 2,
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tit: '劳务派遣工政策的相关规定',
      con: '为规范劳务派遣，维护劳动者的合法权益，',
      browse: 85,
      praise: 45,
      message: 68,
      flag: '待发货',
      color: 'blue'
    }, {
      id: 3,
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tit: '劳务派遣工政策的相',
      con: '为规范劳务派遣，维护劳动者的合法权益，促进劳动关系和谐稳定为规范劳务派遣，维护劳动者的合法权益，促进劳动关系和谐稳定',
      browse: 25,
      praise: 45,
      message: 68,
      flag: '待收货',
      color: 'cyan'
    }, {
      id: 4,
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tit: '劳务派遣工政策的相',
      con: '为规范劳务派遣，维护劳动者的合法权益，促进劳动关系和谐稳定为规范劳务派遣，维护劳动者的合法权益，促进劳动关系和谐稳定',
      browse: 25,
      praise: 45,
      message: 68,
      flag: '待评价',
      color: 'mauve'
    }, {
      id: 5,
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tit: '劳务派遣工政策的相',
      con: '为规范劳务派遣，维护劳动者的合法权益，促进劳动关系和谐稳定为规范劳务派遣，维护劳动者的合法权益，促进劳动关系和谐稳定',
      browse: 25,
      praise: 45,
      message: 68,
      flag: '售后',
      color: 'brown'
    }],
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showToast({
    //   title: '正在加载',
    //   icon: 'loading',
    //   duration: 3000
    // })
    this.setData({
      title: options.title
    })
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