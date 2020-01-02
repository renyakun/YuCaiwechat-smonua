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
} from '../../../utils/WeChatfction';

Page({
  data: {
    InputBottom: 0,
    demandflag: true,
    url: ''
  },

  touchmove() {
    return false;
  },

  //跳转修改
  techjump(e) {
    navigateTo('/pages/technology/changecard/changecard');
  },

  //关闭模拟框
  hideModal() {
    this.setData({
      modalName: null
    })
  },

  //打开模态框
  tapjump(e) {
    let chkflag = this.data.chkflag;
    //console.log(chkflag);
    if (chkflag) {
      //console.log(e.currentTarget.dataset.modal)
      let modalName = e.currentTarget.dataset.modal
      this.setData({
        modalName: modalName,
      })
      console.log('已开启，要关闭');
      this.setData({
        chktxt: '是否要关闭,关闭后平台不再显示您的名片信息，他人无法查看，您将收不到任何邀请信息',
        btntxt: '狠心关闭'
      })
    } else {
      // console.log('已关闭，要开启');
      // this.setData({
      //   chktxt: '是否要开启,开启后平台将显示您的名片信息',
      //   btntxt: '欣然开启'
      // })
      this.checkflag()
    }
  },

  //开启、关闭名片
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
          showToast(res.data.data, 'success', 1000)
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  checkflag() {
    let chkflag = this.data.chkflag;
    console.log(chkflag);
    if (chkflag) {
      console.log('已开启，要关闭');
      this.reqchkflag(0);
      this.hideModal();
      this.setData({
        chkflag: false,
        flagtxt: '开启'
      })
    } else {
      console.log('已关闭，要开启');
      this.reqchkflag(1);
      this.hideModal();
      this.setData({
        chkflag: true,
        flagtxt: '关闭'
      })
    }
  },

  request(token) {
    setTimeout(() => {
      wx.request({
        url: url + '/technology/getMyBusinessCard',
        data: {
          accessToken: token,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res.data.data)
          if (res.data.success) {
            let avatar = res.data.data.avatar;
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
            if (res.data.data.status) {
              this.setData({
                chkflag: true,
                flagtxt: '关闭'
              })
            } else {
              this.setData({
                chkflag: false,
                flagtxt: '开启'
              })
            }
            this.setData({
              avatar: avatar,
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
              demandflag: false,
            });
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        }
      })
    }, 500)
  },

  onLoad: function(options) {
    console.log(options);

  },

  onReady: function() {
    let token = wx.getStorageSync('accessToken') || '';
    this.request(token)
  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {
    this.onReady()
    wx.stopPullDownRefresh();
  },

})