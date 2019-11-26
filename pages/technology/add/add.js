// pages/technology/add/add.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  pageScrollTosel,
  switchTab,
  navigateTo,
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    showflag: false,
    realName: '',
    sex: '',
    dreamPosition: '',
    mobile: '',
    email: '',
    age: '',
    check: true,
  },
  dishow() {
    this.setData({
      showflag: true
    })
    pageScrollTosel('.showcard',1000)
  },
  formSubmit(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let realName = e.detail.value.realName;
    let sex = e.detail.value.sex;
    let dreamPosition = e.detail.value.dreamPosition;
    let mobile = e.detail.value.mobile;
    let email = e.detail.value.email;
    let age = e.detail.value.age;
    let profession = e.detail.value.profession;
    let education = e.detail.value.education;
    let graduationTime = e.detail.value.graduationTime;
    let school = e.detail.value.school;
    let experience = e.detail.value.experience;
    let label = e.detail.value.label;
    let description = e.detail.value.description;
    if (realName == "" || sex == "" || dreamPosition == "" || mobile == "" || email == "" || age == "") {
      showToast('请输入完整信息！', 'none', 3000)
    } else {
      console.log(realName, age, sex, dreamPosition, mobile, email, profession, education, graduationTime, school, experience, label, description);
      wx.request({
        url: url + '/technology/add',
        method: 'post',
        data: {
          realName: realName,
          sex: sex,
          dreamPosition: dreamPosition,
          mobile: mobile,
          email: email,
          age: age,
          profession: profession,
          education: education,
          graduationTime: graduationTime,
          school: school,
          experience: experience,
          label: label,
          description: description,
          accessToken: accessToken,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.success) {
            showToast(res.data.data, 'success', 3000)
            navigateTo('/pages/technology/card/card')
          } else {
            showToast(res.data.msg, 'none', 3000);
            switchTab('/pages/user/user/user');
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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