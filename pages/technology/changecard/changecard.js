// pages/technology/changecard/changecard.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
  pageScrollTosel,
} from '../../../utils/WeChatfction';
Page({
  data: {
    chkflag: true,
    check: true,
    flagtxt: '已开启',
    showflag: false,
    realName: '',
    sex: '',
    dreamPosition: '',
    mobile: '',
    email: '',
    age: '',
  },
  reqchkflag(flagnum) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/changeMyBusinessCard',
      data: {
        accessToken: accessToken,
        flag: flagnum
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        //console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 3000)
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },
  checkflag(e) {
    let flag = e.detail.value;
    if (flag) {
      this.setData({
        chkflag: flag,
        flagtxt: '已开启'
      })
      this.reqchkflag(1);
    } else {
      this.setData({
        chkflag: flag,
        flagtxt: '已关闭'
      })
      this.reqchkflag(0);
    }
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
      //console.log(realName, age, sex, dreamPosition, mobile, email, profession, education, graduationTime, school, experience, label, description);
      wx.request({
        url: url + '/technology/updateMyBusinessCard',
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
          console.log(res.data.data)
          if (res.data.success) {
            showToast(res.data.data, 'success', 3000);
            showLoading();
            navigateTo('/pages/technology/card/card');
          } else {
            showToast(res.data.msg, 'none', 3000)
            // setTimeout(() => {
            //   wx.switchTab({
            //     url: '/pages/user/user/user',
            //   })
            // }, 3000)
          }
        }
      })
    }
  },
  onLoad: function(options) {
    showLoading();
  },

  onReady: function() {
    setTimeout(()=>{
      let accessToken = wx.getStorageSync('accessToken') || [];
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
          let realName = res.data.data.realName;
          let dreamPosition = res.data.data.dreamPosition;
          let email = res.data.data.email;
          let mobile = res.data.data.mobile;
          let age = res.data.data.age;
          let profession = res.data.data.profession;
          let education = res.data.data.education;
          let graduationTime = res.data.data.graduationTime;
          let school = res.data.data.school;
          let experience = res.data.data.experience;
          let label = res.data.data.label;
          let description = res.data.data.description;
          if (res.data.success) {
            if (res.data.data.sex == "男") {
              this.setData({
                check: true,
              })
            } else if (res.data.data.sex == "女") {
              this.setData({
                check: false,
              })
            }
            this.setData({
              realName: realName,
              dreamPosition: dreamPosition,
              email: email,
              mobile: mobile,
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
      wx.request({
        url: url + '/technology/checkMyBusinessCard',
        data: {
          accessToken: accessToken,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.success) {
            if (res.data.data) {
              this.setData({
                chkflag: res.data.data,
                flagtxt: '已开启'
              })
            } else {
              this.setData({
                chkflag: res.data.data,
                flagtxt: '已关闭'
              })
            }
          } else {
            showToast(res.data.msg, 'none', 3000)
          }
        }
      })
    },3000)
    
  },


  onShow: function() {

  },

  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})