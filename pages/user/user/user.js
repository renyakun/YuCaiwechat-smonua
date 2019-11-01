// pages/user/user.js
const app = getApp();
Page({
  /* 页面的初始数据*/
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollTop: 0,
    navList: [{
        id: 1,
        icon: 'camerafill',
        name: "我的收藏",
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
    iconList: [{
      icon: 'service',
      color: 'red',
      badge: 0,
      name: '官方客服'
    }, {
      icon: 'tag',
      color: 'orange',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'message',
      color: 'yellow',
      badge: 1,
      name: '建议留言'
    }, {
      icon: 'newshotfill',
      color: 'blue',
      badge: 0,
      name: '服务估价'
    }],
    tablist: [{
      id: 1,
      tabtit: '123无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 2,
      tabtit: '234无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 3,
      tabtit: '345无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 4,
      tabtit: '456无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 5,
      tabtit: '567无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 6,
      tabtit: '678无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 7,
      tabtit: '789无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }]
  },
  userjump(e) {
    wx.showToast({
      title: '即将上线，敬请期待！',
      icon: 'none',
      duration: 2000
    })
  },
  /* 生命周期函数--监听页面加载*/
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
    }

  },
  getUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  navSelect(e) {
    let users = wx.getStorageSync('users') || [];
    console.log(users);
    this.setData({
      userInfo: users.userInfo,
      hasUserInfo: users.hasUserInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let users = wx.getStorageSync('users') || {};
    console.log(users)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})