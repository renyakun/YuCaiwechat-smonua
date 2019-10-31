// pages/classify/enterprise/enterprise.js
const {
  $Toast
} = require('../../../colorui/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autolist: [{
      name: 'enterprise',
      title: '企业名称',
      contxt: '深圳市御材科技'
    }, {
      name: 'legal',
      title: '法人姓名',
      contxt: '肖先生'
    }, {
      name: 'ID',
      title: '证件号码',
      contxt: '435458954875896548'
    }, {
      name: 'certificate',
      title: '资质证件',
      contxt: '',
      img: '../../../images/close.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 3000
    })
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