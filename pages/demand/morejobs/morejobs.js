// pages/demand/morejobs.js
import {
  showToast,
  fiflet,
  navigateTo,
  showLoading,
  pageScrollTo,
} from '../../../utils/WeChatfction';
const {
  url
} = require('../../../utils/url.js');
Page({

  data: {
    demandflag: true,
    userId: '',
    loadflag: true, //没有数据图片显示标志 true不显示
    details:[]
  },

  companyjump(e) {
    let userId = e.currentTarget.dataset.target;
    navigateTo('/pages/demand/company/company?userId=' + userId)
  },

  tapind() {
    showToast('即将上线，敬请期待!', 'none', 3000)
  },

  chatjump(){
    showToast('即将上线，敬请期待!', 'none', 3000)
  },

  sharejump() {
    showToast('即将上线，敬请期待!', 'none', 3000)
  },

  // 获取更多职位信息
  getMoreJobs(userId, token) {
    wx.request({
      url: url + '/demand/getSendDemandslist',
      data: {
        accessToken: token,
        userId: userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log('更多职位信息:',res.data.data)
        if (res.data.success) {
          if (res.data.data.length != 0) {
            this.setData({
              demandflag: false,
              jobLists: res.data.data,
              loadflag: true,
            })
          }
        } else {
          showToast(res.data.msg, 'none', 3000)
          this.setData({
            demandflag: true,
            loadflag: false
          })
        }
      },
    })
  },

  //获取公司主页
  homepage(userId, token) {
    wx.request({
      url: url + '/company/getCompanyHomepage',
      data: {
        accessToken: token,
        userId: userId
      },
      success: res => {
        console.log('公司主页:',res.data.data)
        let details = res.data.data;
        if (res.data.success) {
          if (details.length != 0) {
            this.setData({
              details: details,
              src: '../../../images/icon/company.png'
            })
          }
        } else {
          showToast(res.data.msg, 'none', 3000);
        }
      }
    })
  },

  //获取岗位发布者详情
  release(demandId, token) {
    wx.request({
      url: url + '/demand/getReleaseMessage',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let release = res.data.data;
        console.log('发布者详情:',release);
        if (res.data.success) {
          this.setData({
            release: release,
          })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      },
    })
  },

  // 招聘详情
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    navigateTo('/pages/demand/trans/trans?demandId=' + demandId );
  },

  onLoad: function(options) {
    let token = wx.getStorageSync('accessToken') || '';
    this.setData({
      demandflag: true,
      userId: options.userId,
      demandId: options.demandId
    });
    this.getMoreJobs(options.userId, token);
    this.homepage(options.userId, token);
    this.release(options.demandId, token);
  },

  onReady: function() {


  },


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
    let token = wx.getStorageSync('accessToken') || [];
    let userId = this.data.userId;
    let demandId = this.data.demandId;
    setTimeout(() => {
      this.getMoreJobs(userId, token);
      this.homepage(userId, token);
      this.release(demandId, token);
    }, 500)

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