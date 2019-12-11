//app.js
// "enablePullDownRefresh": true
const {
  url
} = require('utils/url.js');
App({
<<<<<<< HEAD
  onLaunch: function() {
=======
  onLaunch: function () {
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        //console.log(res)
        console.log("处于登录态");
      },
      fail(res) {
        //console.log(res)
        // session_key 已经失效，需要重新执行登录流程
        console.log("需要重新登录");
        wx.login() //重新登录
      }
    })

    // 登录
    wx.login({
      success: res => {
        //wx.setStorageSync('code', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //console.log('获取用户登录凭证：' + res.code);
          //发起网络请求
<<<<<<< HEAD
          let appid = 'wx884ebfcbccc0468b';
          let secret = '735d41a909eac350efaaba5be156e30b';
          wx.request({
            url: url + '/user/wx/login',
            method: 'POST',
            data: {
              code: res.code,
              appid: appid,
              secret: secret
=======
          wx.request({
            url: url+'/user/wx/login',
            method: 'POST',
            data: {
              code: res.code,
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
            },
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              console.log(res)
              wx.setStorageSync('accessToken', res.data.data.accessToken)
            },
            fail: res => {
              console.log(res);
              console.log('is failed')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
<<<<<<< HEAD
              wx.setStorageSync('unionId', res.userInfo)
=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
<<<<<<< HEAD

    //获取地理位置
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.chooseLocation({
                success(res) {
                  console.log(res.address)
                  console.log(this.globalData)
                  this.globalData.address = res.address;
                }
              })
            }
          })
        }
      }
    })


=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  },
  globalData: {
    userInfo: null
  }
<<<<<<< HEAD
})

=======
})
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
