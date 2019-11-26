// pages/technology/mycard/card.js
//获取应用实例
const app = getApp()
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  switchTab,
  navigateTo,
  showLoading,
  pageScrollTosel,
  setBarColor,
  setBarTitle,
} from '../../../utils/WeChatfction';
Page({
  /* 页面的初始数据*/
  data: {
    InputBottom: 0,
    demandflag: true,
  },

  techjump(e) {
    showLoading();
    navigateTo('/pages/technology/changecard/changecard');
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function(options) {
    setBarColor('#ffffff', '#0081ff', 1500, 'ease');
    setBarTitle('个人主页');
  },

  onReady: function() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
    setTimeout(() => {
      wx.request({
        url: url + '/technology/getMyBusinessCard',
        data: {
          accessToken: accessToken,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res.data.data)
          if (res.data.success) {
            let realName = res.data.data.realName;
            let dreamPosition = res.data.data.dreamPosition;
            let email = res.data.data.email;
            let sex = res.data.data.sex;
            let age = res.data.data.age;
            let profession = res.data.data.profession;
            let education = res.data.data.education;
            let graduationTime = res.data.data.graduationTime;
            let school = res.data.data.school;
            let experience = res.data.data.experience;
            let label = res.data.data.label;
            let description = res.data.data.description;
            this.setData({
              realName: realName,
              dreamPosition: dreamPosition,
              email: email,
              sex: sex,
              age: age,
              profession: profession,
              education: education,
              graduationTime: graduationTime,
              school: school,
              experience: experience,
              label: label,
              description: description,
            })
          } else {
            showToast(res.data.msg, 'none', 3000)
          }
        }
      })
    }, 3100)
  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

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

  },
})