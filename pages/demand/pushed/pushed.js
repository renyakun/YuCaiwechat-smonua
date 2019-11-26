// pages/demand/pushed/pushed.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  showLoading,
  setBarColor,
  setBarTitle,
} from '../../../utils/WeChatfction';
Page({
  data: {
    demandflag: true,
  },
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target;
    //console.log(demandId);
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/demand/trans/trans?demandId=' + demandId,
      });
    }, 3100)
  },
  onLoad: function(options) {
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)

    setBarColor('#ffffff', '#0081ff', 1500, 'ease');
    setBarTitle('已投递需求');
  },
  onReady: function() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/mySendBusinessCard',
      data: {
        accessToken: accessToken
      },
      success: res => {
        console.log(res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          this.setData({
            demand: demand,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  onShow: function() {

  },

  onHide: function() {

  },

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