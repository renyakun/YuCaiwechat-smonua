// pages/user/user.js
//获取应用实例
const app = getApp();

const {
  url
} = require('../../../utils/url.js');

import {
  showToast,
  showModal,
  navigateTo,
  showLoading,
  pageScrollTo
} from '../../../utils/WeChatfction';

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollTop: 0,
    ctionList: app.globalData.ctionList,
    techtit: '我的名片',
    userflag:true
  },

  abc(){
    navigateTo('/pages/tempf/tempf?id=1');
  },

  //功能跳转
  userjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    showToast('即将上线，敬请期待!', 'none', 1000)
  },

  cordjump() {
    navigateTo('/pages/record/record/record');
  },

  //名片跳转
  techjump(e) {
    console.log(e.currentTarget.dataset.target);
    let tit = e.currentTarget.dataset.target;
    //navigateTo('/pages/technology/add/add');
    if (tit == "我的名片") {
      navigateTo('/pages/technology/add/add');
    } else if (tit == "个人主页") {
      navigateTo('/pages/technology/card/card');
    }
  },

  //需求方跳转
  paegswitch() {
    pageScrollTo(0, 500);
    //showToast('即将上线，敬请期待!', 'none', 1000)
    wx.navigateToMiniProgram({
      appId: 'wxef80070bd7008e35',
      path: 'pages/user/user/user',
      envVersion: 'trial',
      success(res) {
        // 打开成功
        console.log(res, '打开成功')
      },
      fail(res) {
        console.log(res, '打开失败')
      }
    })
  },

  //获取名片详情
  cardemail(token){
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
          let label = res.data.data.label;
          this.setData({
            avatar: avatar,
            realName: realName,
            dreamPosition: dreamPosition,
            email: email,
            sex: sex,
            age: age,
            label: label,
          });
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },


  request() {
    //获取名片状态值
    let token = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/getMyBusinessCard',
      data: {
        accessToken: token,
      },
      success: res => {
        if (res.data.success) {
          this.setData({
            techtit: '个人主页',
            userflag: false
          })
          this.cardemail(token)
        } else {
          this.setData({
            techtit: '我的名片',
            userflag: true
          })
        }
      }
    })
  },




  onLoad: function(options) {
    pageScrollTo(0, 100);
    this.request()

    //获取微信信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  onReady: function() { 
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShow: function() {
    this.onLoad()
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.onLoad()
  },
})