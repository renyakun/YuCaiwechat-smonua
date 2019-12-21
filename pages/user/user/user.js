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
  showLoading
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
  },

  //功能跳转
  userjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    showToast('即将上线，敬请期待!', 'none', 3000)
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
    showToast('即将上线，敬请期待!', 'none', 3000)
    // wx.navigateToMiniProgram({
    //   appId: 'wxb4a016efe2b335d6',
    //   path: 'pages/user/user/user',
    //   envVersion: 'trial',
    //   success(res) {
    //     // 打开成功
    //     console.log(res, '打开成功')
    //   },
    //   fail(res) {
    //     console.log(res, '打开失败')
    //   }
    // })
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
          setTimeout(() => {
            wx.hideLoading();
          }, 500)
          this.setData({
            techtit: '个人主页'
          })
        } else {
          setTimeout(() => {
            wx.hideLoading();
          }, 500)
          this.setData({
            techtit: '我的名片'
          })
        }
      }
    })
  },

  onLoad: function(options) {

    wx.showLoading({
      title: '加载中',
    });

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

  onReady: function() { },

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