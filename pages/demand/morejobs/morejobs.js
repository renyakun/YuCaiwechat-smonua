// pages/demand/morejobs.js

//index.js


import {
  showToast,
  pagesurl,
  fiflet,
  navigateTo,
  showLoading,
  pageScrollTo,
} from '../../../utils/WeChatfction';
const {
  url
} = require('../../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandflag: true,
    userId:'',
    loadflag: true, //没有数据图片显示标志 true不显示
  },
  // 获取更多职位信息
  getMoreJobs(userId) {
    console.log(userId);
    let accessToken = wx.getStorageSync('accessToken') || [];
    //let userId = this.data.userId;
    wx.request({
      url: url + '/demand/getSendDemandslist',
      data: {
        accessToken: accessToken,
        userId: userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 3000)
          setTimeout(() => {
            this.setData({
              demandflag: false,
              jobLists: res.data.data
            })
          }, 500)
        } else {
          showToast(res.data.msg, 'none', 3000)
          setTimeout(() => {
            this.setData({
              demandflag: false,
              loadflag: false
            })
          }, 500)
        }
      },
    })
  },
  // 招聘详情
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    let jobName = e.currentTarget.dataset.target.jobName;
    //console.log(demandId);
    showLoading();
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: '/pages/demand/trans/trans?demandId=' + demandId + '&jobName=' + jobName,
    //   });
    // }, 3100)
    wx.navigateTo({
      url: '/pages/demand/trans/trans?demandId=' + demandId + '&jobName=' + jobName,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let userId = options.userId;
    this.setData({
      userId: options.userId
    });
    setTimeout(() => {
      this.getMoreJobs(userId);
    },500)

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
    this.setData({
      demandflag: true,
      demand: [],
    })
    let userId = this.data.userId
    this.getMoreJobs(userId)
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