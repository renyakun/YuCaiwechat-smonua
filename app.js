//app.js
// "enablePullDownRefresh": true
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
          let appid = 'wx884ebfcbccc0468b';
          let secret = '735d41a909eac350efaaba5be156e30b';
          wx.request({
            url: url + '/user/wx/login',
            method: 'POST',
            data: {
              code: res.code,
              appid: appid,
              secret: secret
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
        icon: 'newsfill',
        color: '#fbbd08',
        badge: 1,
        name: 'case',
        title: '成功案例'
      }, {
        icon: 'order',
        color: '#8dc63f',
        badge: 150,
        title: '最新订单',
        name: 'order',
      }, {
        icon: 'news',
        color: '#1cbbb4',
        badge: 1,
        name: 'news',
        title: '新闻资讯'
      }, {
        icon: 'sort',
        color: '#e54d42',
        badge: 1,
        name: 'hot',
        title: '热门榜单'
      },
      {
        title: '劳务政策',
        name: 'policy',
        color: '#a5673f',
        badge: 0,
        icon: 'file'
      },
      {
        title: '平台培训',
        name: 'train',
        color: '#39b54a',
        badge: 0,
        icon: 'group'
      },
      {
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
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
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
      name: '面试邀请通知',
      icon: 'message',
    }, {
      id: 3,
      name: '评论消息通知',
      icon: 'message',
    }],
    recordlist: [{
      id: 1,
      flag: '全部',
    }, {
      id: 2,
      flag: '待面试',
    }, {
      id: 3,
      flag: '已评价',
    }, {
      id: 4,
      flag: '不合适',
    }],
  }
})