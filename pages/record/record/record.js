// pages/record/record/record.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
  setBarTitle,
  pageScrollTo
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    demandflag: true,
    TabCur: 1,
    scrollLeft: 0,
    scrollTop: 0,
    tablist: [{
      id: 1,
      flag: '全部',
    }, {
      id: 2,
      flag: '待面试沟通',
    }, {
      id: 3,
      flag: '待评价',
    }, {
      id: 4,
      flag: '不合适',
    }],
  },

  Seedels(e) {
    let demandId = e.currentTarget.dataset.target;
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/demand/trans/trans?demandId=' + demandId,
      });
    }, 3100)
  },

  tabSelect(e) {
    pageScrollTo(0, 500);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },

  demanditem(e) {
    console.log(e)
    let demanditem = e.currentTarget.dataset.item;
    let demandId = demanditem.demandHistroy.demandId;
    let userId = demanditem.demandHistroy.userId;
    let realName = demanditem.demandHistroy.realName;
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/record/evaluate/evaluate?demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
      });
    }, 3000)
  },

  onLoad: function (options) {
    setBarTitle('投递记录')
  },

  evaluate(accessToken) {
    wx.request({
      url: url + '/invitation/myAcceptInvitation',
      data: {
        accessToken: accessToken
      },
      success: res => {
        console.log(res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          this.setData({
            evaldemand: demand,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  interview(accessToken) {
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
            interdemand: demand,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  onReady: function () {
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
    let accessToken = wx.getStorageSync('accessToken') || [];
    this.evaluate(accessToken)
    this.interview(accessToken)
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
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      demandflag: true,
    })
    this.onReady()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})