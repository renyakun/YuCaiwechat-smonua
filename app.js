//app.js
// "enablePullDownRefresh": true
// "navigateToMiniProgramAppIdList": [
//   "wxef80070bd7008e35"
// ],
const {
  url
} = require('utils/url.js');
App({
  onLaunch: function() {
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
          wx.request({
            url: url + '/user/wx/login',
            method: 'POST',
            data: {
              code: res.code,
              flag: 1
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
              wx.setStorageSync('unionId', res.userInfo)
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

    //获取地理位置
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userLocation']) {
    //       wx.authorize({
    //         scope: 'scope.userLocation',
    //         success() {
    //           wx.chooseLocation({
    //             success(res) {
    //               console.log(res.address)
    //               console.log(this.globalData)
    //               this.globalData.address = res.address;
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })


  },
  globalData: {
    userInfo: null,
    iconList: [{
        id: 1,
        icon: 'newsfill',
        color: '#fbbd08',
        badge: 1,
        name: 'case',
        title: '邀请消息'
      }, {
        id: 2,
        icon: 'news',
        color: '#1cbbb4',
        badge: 1,
        name: 'news',
        title: '合作消息'
      }, {
        id: 3,
        icon: 'sort',
        color: '#e54d42',
        badge: 1,
        name: 'hot',
        title: '评论消息'
      },{
        id: 4,
        title: '录用消息',
        name: 'train',
        color: '#39b54a',
        badge: 0,
        icon: 'group'
      },{
        id: 5,
        title: '完成消息',
        name: 'train',
        color: '#39b54a',
        badge: 0,
        icon: 'group'
      },{
        id: 6,
        title: '全部',
        name: 'whole',
        color: '#0081ff',
        badge: 0,
        icon: 'cascades'
      }
    ],
    navlist: [{
      id: 1,
      nav: '最新'
    }, {
      id: 2,
      nav: '推荐'
    }],
    tranlist: [{
      id: 1,
      nav: '图片'
    }, {
      id: 2,
      nav: '详情'
    }, {
      id: 3,
      nav: '评论'
    }],
    ctionList: [{
      id: 1,
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
    }],
    newslist: [{
      id: 1,
      name: '投递邀请通知',
      icon: 'message',
    }, {
      id: 2,
      name: '合作邀请通知',
      icon: 'message',
    }, {
      id: 3,
      name: '评论消息通知',
      icon: 'message',
    }, {
      id: 4,
      name: '录取消息通知',
      icon: 'message',
    }, {
      id: 5,
      name: '完成消息通知',
      icon: 'message',
    }],
    recordlist: [{
      id: 1,
      flag: '全部',
    }, {
      id: 2,
      flag: '待合作',
    }, {
      id: 3,
      flag: '已评价',
    }, {
      id: 4,
      flag: '不合适',
    }],
  }
})