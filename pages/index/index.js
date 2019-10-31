//index.js tidings
//获取应用实例
const app = getApp();
Page({
  data: {
    PageCur: 'send',
    token: [],
    businesstoken:[]
  },
  NavChange(e) {
    let PageCurs = e.currentTarget.dataset.cur;
    let users = wx.getStorageSync('users') || [];
    let tokenflag = this.data.token.data.success;
    if (PageCurs == 'user' && !tokenflag) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        success(res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/classify/RealName/RealName?title=实名认证',
            })
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({
        PageCur: PageCurs
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '御材劳务平台',
      imageUrl: '/images/YuCai.jpg',
      path: '/pages/index/index'
    }
  },
  onLoad: function(options) {
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
      let users = wx.getStorageSync('user') || [];
    }
    //wx.setStorageSync('mobile','15512345678')
  },
  onReady: function() {
    let mobile = wx.getStorageSync('mobile') || [];
    wx.request({
      url: 'http://192.168.101.7:81/user/UserCertification',
      data: {
        mobile: mobile
      },
      success: res => {
        wx.setStorageSync('token', res)
        this.setData({
          token: res
        })
      }
    })
    wx.request({
      url: 'http://192.168.101.7:81/company/companyCertification',
      data: {
        mobile: mobile
      },
      success: res => {
        //console.log(res)
        wx.setStorageSync('tokenmsg', res)
        this.setData({
          tokenmsg: res
        })
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    let user = {
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }
    wx.setStorageSync('user', user)
  },
})