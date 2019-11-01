//index.js tidings
//获取应用实例
const app = getApp();
Page({
  data: {
    PageCur: 'send',
    token: [],
    businesstoken: [],
    badge:0
  },
  NavChange(e) {
    let PageCurs = e.currentTarget.dataset.cur;
    //let tokenflag = this.data.token.data.success;
    this.setData({
      PageCur: PageCurs
    })
    // if (PageCurs == 'user' && !tokenflag) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请先实名认证',
    //     success(res) {
    //       if (res.confirm) {
    //         //console.log('用户点击确定')
    //         wx.navigateTo({
    //           url: '/pages/classify/RealName/RealName?title=实名认证',
    //         })
    //       } else if (res.cancel) {
    //         //console.log('用户点击取消')
    //       }
    //     }
    //   })
    // } else {
    //   this.setData({
    //     PageCur: PageCurs
    //   })
    // }
  },
  onShareAppMessage() {
    return {
      title: '御材劳务平台',
      imageUrl: '/images/YuCai.jpg',
      path: '/pages/index/index'
    }
  },
  onLoad: function(options) {
  },
  onReady: function() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let rawData = wx.getStorageSync('rawData') || {};
    //console.log(accessToken);
    wx.request({
      url: 'http://192.168.101.7:81/user/UserCertification',
      data: {
        accessToken: accessToken,
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
        accessToken: accessToken,
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

})