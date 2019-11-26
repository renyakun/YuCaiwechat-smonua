// pages/classify/certification/certification.js
const {
  $Toast
} = require('../../../colorui/dist/base/index');
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  showModal,
  navigateTo,
  pageScrollTo,
  setBarTitle,
} from '../../../utils/WeChatfction';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 1,
    tokendata: {},
    enterprise: {},
    demandflag: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    setBarTitle(options.title)
    this.setData({
      title: options.title,
      TabCur: options.cur,
    })
    let tokendata = this.data.tokendata;
    if (tokendata=={}){
      showModal('您还未进行实名认证,请先实名认证', 'RealName', '实名认证')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    setTimeout(() => {
      let accessToken = wx.getStorageSync('accessToken') || [];
      wx.request({
        url: url + '/user/UserCertification',
        data: {
          accessToken: accessToken,
        },
        success: res => {
          wx.setStorageSync('token', res);
          if (res.data.success) {
            this.setData({
              tokendata: res.data.data,
              demandflag: false,
            })
          }
        }
      })
      wx.request({
        url: url + '/company/companyCertification',
        data: {
          accessToken: accessToken,
        },
        success: res => {
          wx.setStorageSync('tokenmsg', res)
          if (res.data.success) {
            this.setData({
              enterprise: res.data.data,
              demandflag: false,
            })
          }
        }
      })
    }, 3000)
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
    this.onReady()
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