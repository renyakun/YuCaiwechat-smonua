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
    ctionList: [
      {
        id:1,
        icon: 'service',
        color: '#e54d42',
        badge: 0,
        name: 'cstomer',
        title: '官方客服'
      }, {
        id: 2,
        icon: 'edit',
        color: '#fbbd08',
        badge: 1,
        title: '建议留言',
        name: 'message'
      }, {
        id: 3,
        title: '关于我们',
        name: 'about',
        color: '#1cbbb4',
        badge: 0,
        icon: 'friendfill'
      },
    ],
    techtit: '我的名片',
  },

  //功能跳转
  userjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    if (name == "tidings") {
      navigateTo('/pages/tidings/tidings/tidings')
    } else if (name == "about") {
      navigateTo('/pages/classify/about/about')
    } else {
      showToast('即将上线，敬请期待!', 'none', 3000)
    }
    // else if(name == "record") {
    //   navigateTo('/pages/record/record/record')
    // }
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
    wx.navigateToMiniProgram({
      appId: 'wxb4a016efe2b335d6',
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

  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // });

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

    //获取名片状态值
    let token = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/getMyBusinessCard',
      data: {
        accessToken: token,
      },
      success: res => {
        if (res.data.success) {
          setTimeout(()=>{
            wx.hideLoading();
          },1000)
          this.setData({
            techtit: '个人主页'
          })
        } else {
          setTimeout(() => {
            wx.hideLoading();
          }, 1000)
          this.setData({
            techtit: '我的名片'
          })
        }
      }
    })

    //console.log(options);

  
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

  onShow: function () {
    this.onLoad()
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.onLoad()
  },
})