// pages/tidings/tidings/tidings.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  data: {
    // 邀请消息数据
    newslist: app.globalData.newslist,
  },

  // 点击消息框,查看按钮,实现跳转
  cussjump(e) {
    let id = parseInt(e.currentTarget.dataset.id);
    //console.log(id);
    switch (id) {
      case 1: //投递邀请
        navigateTo('/pages/tidings/news/news?tidtxt=投递邀请消息&cur=1')
        break;
      case 2: //面试邀请(待面试)
        navigateTo('/pages/record/record/record?id=2')
        break;
      case 3: //评论消息
        navigateTo('/pages/tidings/news/news?tidtxt=评论消息&cur=2')
        //showToast('即将上线，敬请期待!', 'none', 1000)
        break;
      case 4: //录取消息
        navigateTo('/pages/tidings/news/news?tidtxt=录取消息&cur=3')
        //showToast('即将上线，敬请期待!', 'none', 1000)
        break;
      case 5: //完成消息
        navigateTo('/pages/tidings/news/news?tidtxt=完成消息&cur=4')
        //showToast('即将上线，敬请期待!', 'none', 1000)
        break;
      default:
        break;
    }
  },


  onLoad: function(options) {},

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
    this.onLoad()
    wx.stopPullDownRefresh();
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