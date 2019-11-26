// pages/user/user.js
//获取应用实例
const app = getApp()
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  pagesurl,
  showModal,
  navigateTo,
  showLoading,
  setBarTitle,
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
    navList: [{
        id: 1,
        icon: 'cartfill',
        name: "已推送",
        num: 25,
      },
      {
        id: 2,
        icon: 'upstagefill',
        name: "店铺关注",
        num: 75,
      },
      {
        id: 3,
        icon: 'clothesfill',
        name: "足迹",
        num: 12,
      },
    ],
    ctionList: [{
      icon: 'service',
      color: 'red',
      badge: 0,
      name: 'cstomer',
      title: '官方客服'
    }, {
      icon: 'message',
      color: 'orange',
      badge: 199,
      title: '消息',
      name: 'tidings'
    }, {
      icon: 'edit',
      color: 'yellow',
      badge: 1,
      title: '建议留言',
      name: 'message'
    }, {
      icon: 'newshotfill',
      color: 'blue',
      badge: 0,
      title: '服务估价',
      name: 'evaluation'
    }],
    atteslist: [{
      icon: 'profilefill',
      name: 'certification',
      color: 'cyan',
      badge: 0,
      title: '认证信息',
    }, {
      icon: 'vipcard',
      color: 'orange',
      name: 'authentication',
      badge: 0,
      title: '企业认证'
    }],
    demandlist: [{
      icon: 'repeal',
      name: 'lauched',
      color: 'blue',
      badge: 0,
      title: '已发布',
    }],
    techtit: '我的名片',
    launNum: 0,
    pushmeNum: 0,
    pushNum: 0,
    pageflag: true,
  },

  userjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    if (name == "tidings") {
      navigateTo('/pages/tidings/tidings/tidings')
    } else {
      showToast('即将上线，敬请期待!', 'none', 3000)
    }
  },
  attesjump(e) {
    let token = wx.getStorageSync('token') || {};
    let tokenflag = token.data.success;
    let tokenmsg = wx.getStorageSync('tokenmsg') || {};
    let msg = tokenmsg.data.msg;
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    console.log(token.data, tokenmsg.data)
    if (name == "certification" && tokenflag) {
      pagesurl(name, title, 1)
    } else if (name == "certification" && !tokenflag) {
      showModal('请先实名认证', 'RealName', '实名认证')
    } else if (tokenflag && name == "authentication" && msg == "您还未进行企业认证") {
      pagesurl(name, title)
    } else if (tokenflag && name == "authentication" && msg == "您还未进行实名认证，请先实名认证再企业认证") {
      showModal(tokenmsg.data.msg, 'RealName', '实名认证')
    } else if (name == "authentication" && msg == "成功") {
      showToast('您已企业认证！正在为您跳转认证信息', 'none', 2000)
      setTimeout(() => {
        pagesurl('certification', '认证信息', 2)
      }, 2500)
    } else if (name == "whole") {
      navigateTo('/pages/classify / home / home');
    } else {
      pagesurl(name, title)
      //showToast('即将上线，敬请期待!', 'none', 3000)
    }
  },
  demandjump(e) {
    navigateTo('/pages/demand/lauched/lauched');
  },
  phmejump(e) {
    navigateTo('/pages/technology/phmecard/phmecard');
  },

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

  navSelect(e) {
    let users = wx.getStorageSync('users') || [];
    console.log(users);
    this.setData({
      userInfo: users.userInfo,
      hasUserInfo: users.hasUserInfo
    })
  },

  cordjump() {
    navigateTo('/pages/record/record/record');
  },

  managejump(){
    navigateTo('/pages/manage/manage/manage');
  },

  paegswitch() {
    let pageflag = this.data.pageflag;
    showLoading();
    pageScrollTo(0,500)
    setTimeout(() => {
      this.setData({
        pageflag: !pageflag
      })
    }, 3500)
  },

  number(website, num) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + website,
      data: {
        accessToken: accessToken
      },
      success: res => {
        //console.log(res.data.data)
        if (res.data.success) {
          wx.hideLoading()
          if (num == "launNum") {
            this.setData({
              launNum: res.data.data.length,
            })
          } else if (num == "pushNum") {
            this.setData({
              pushNum: res.data.data.length,
            })
          } else if (num == "pushmeNum") {
            this.setData({
              pushmeNum: res.data.data.length,
            })
          } else if (num == "inviNum") {
            this.setData({
              inviNum: res.data.data.length,
            })
          } else {
            showToast(res.data.msg, 'none', 3000)
          }
        }
      }
    })
  },
  token(website, tokentxt) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + website,
      data: {
        accessToken: accessToken,
      },
      success: res => {
        //console.log(res)
        wx.setStorageSync(tokentxt, res);
        //wx.setStorageSync('mobile', res.data.data.mobile);
      }
    })
  },

  onLoad: function() {
    wx.showLoading({
      title: '加载中',
    });

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

    setTimeout(() => {
      let accessToken = wx.getStorageSync('accessToken') || [];
      wx.request({
        url: url + '/technology/getMyBusinessCard',
        data: {
          accessToken: accessToken,
        },
        success: res => {
          if (res.data.success) {
            this.setData({
              techtit: '个人主页'
            })
          } else {
            this.setData({
              techtit: '我的名片'
            })
          }
        }
      })
      this.token('/user/UserCertification', 'token')
      this.token('/company/companyCertification', 'tokenmsg')
      this.number('/technology/mySendBusinessCard', 'pushNum')
      this.number('/demand/getMyDemands', 'launNum')
      this.number('/technology/acceptBusinessCards', 'pushmeNum')
    }, 2000);

    setBarTitle('个人中心');
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

  onPullDownRefresh: function() {
    this.onLoad()
  },
})