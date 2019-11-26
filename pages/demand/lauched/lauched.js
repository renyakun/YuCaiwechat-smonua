// pages/user/lauched/lauched.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  showLoading,
  setBarTitle,
} from '../../../utils/WeChatfction';
Page({
  data: {
    demandflag: true
  },
  deldemand(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let carditem = e.currentTarget.dataset.item;
    let cardlist = this.data.cardlist;
    cardlist = cardlist.filter(i => {
      return i.demandId !== carditem.demandId
    })
    showLoading();
    setTimeout(() => {
      this.setData({
        cardlist: cardlist,
      })
    }, 3000)
    wx.request({
      url: url + '/demand/delMyDemand',
      data: {
        accessToken: accessToken,
        demandId: carditem.demandId
      },
      success: res => {
        console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'none', 3000)
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },
  demanditem(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = e.currentTarget.dataset.id;
    //console.log(demandId)
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/demand/details/details?demandId=' + demandId,
      })
    }, 3000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    setBarTitle('职位发布列表')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
    setTimeout(() => {
      wx.request({
        url: url + '/demand/getMyDemands',
        data: {
          accessToken: accessToken,
        },
        success: res => {
          //console.log(res.data.data)
          this.setData({
            cardlist: res.data.data,
          })
        }
      })
    }, 3100)
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
    this.setData({
      demandflag: true,
    })
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