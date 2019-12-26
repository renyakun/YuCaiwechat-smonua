// pages/record/details/details.js
const app = getApp();
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  switchTab,
} from '../../../utils/WeChatfction';
Page({
  data: {
    InputBottom: 0,
    animationData: {},
    reason: '',
    txtput: 0
  },

  //关闭模拟框
  hideModal() {
    this.setData({
      modalName: null
    })
  },

  //打开模态框
  tapjump(e) {
    console.log(e.currentTarget.dataset.modal)
    let modalName = e.currentTarget.dataset.modal
    this.setData({
      modalName: modalName,
    })
  },

  tapcale() {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.opacity(1).step();
    this.setData({
      animationData: animation.export()
    })
  },

  //字数管理
  textareaBInput(e) {
    console.log(e.detail.value);
    let val = e.detail.value;
    let len = val.length;
    this.setData({
      txtput: len,
    })
    if (len > 499) {
      showToast('输入值字数最大为500！', 'none', 1000)
    }
  },


  formSubmit(e) {
    let token = wx.getStorageSync('accessToken') || [];
    let id = this.data.id;
    let reason = e.detail.value.reason;
    if (reason == "") {
      showToast('请输入完整信息！', 'none', 1000)
    } else {
      console.log(reason);
      wx.request({
        url: url + '/invitation/cancelInvitation',
        method: 'post',
        data: {
          accessToken: token,
          id: id,
          reason: reason
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          if (res.data.success) {
            showToast(res.data.data, 'success', 800);
            setTimeout(()=>{
              switchTab('/pages/user/user/user');
            },1000)
          } else {
            showToast(res.data.msg, 'none', 800);
          }
        }
      })
    }
  },

  tapeval() {
    let token = wx.getStorageSync('accessToken') || [];
    let timer = this.data.timer;
    let demandId = this.data.demandId;
    let userId = this.data.userId;
    let realName = this.data.realName;
    wx.request({
      url: url + '/invitation/isEvaluation',
      data: {
        accessToken: token,
        invitationTime: timer
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data.success) {
          showToast(res.data.data, 'success', 1000);
            wx.navigateTo({
              url: '/pages/record/evaluate/evaluate?&demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
            });
        } else {
          showToast(res.data.msg, 'none', 1000);
        }
      }
    })
  },

  onLoad: function(options) {
    console.log(options)
    this.setData({
      address: options.address,
      timer: options.timer,
      id: options.id,
      jobName: options.jobName,
      demandId: options.demandId,
      userId: options.userId,
      realName: options.realName,
    })

  },

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