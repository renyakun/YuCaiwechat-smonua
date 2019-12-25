// pages/demand/trans/trans.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  pageScrollTo,
  pageScrollTosel,
  switchTab,
  makePhoneCall,
} from '../../../utils/WeChatfction';

import {
  formatTime
} from '../../../utils/util';

const app = getApp();

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 1,
    InputBottom: 0,
    scrollTop: 0,
    tranlist: app.globalData.tranlist,
    swiperList: ['https://image.weilanwl.com/gif/loading-1.gif',]
  },

  //tab跳转
  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    let demlen = this.data.demlen;
    this.setData({
      TabCur: TabCurs,
    })
    if (TabCurs == 1) {
      pageScrollTo(0, 500)
    } else if (TabCurs == 2) {
      pageScrollTosel('.cardpost', 500)
    } else if (TabCurs == 3) {
      if (demlen == 0) {
        showToast('目前还没有评价', 'none', 1000)
      } else {
        pageScrollTosel('.cardcuss', 500)
      }
    }
  },

  //回到首页
  tapind() {
    switchTab('/pages/index/index');
  },

  //电话联系
  taptel(e) {
    let mobile = e.currentTarget.dataset.target;
    makePhoneCall(mobile);
  },

  //推送名片
  tappush() {
    let token = wx.getStorageSync('accessToken') || [];
    let demandId = this.data.demandId;
    console.log(demandId)
    wx.request({
      url: url + '/technology/sendMyBusinessCard',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 800)
          setTimeout(() => {
            navigateTo('/pages/record/record/record')
          }, 1000)
        } else {
          showToast(res.data.msg, 'none', 800)
          if (res.data.msg == '您还未制作个人名片,立即制作专属名片，让更多人与您合作吧') {
            setTimeout(() => {
              navigateTo('/pages/technology/add/add')
            }, 1000)
          } else if (res.data.msg == '您已经推送过了，【需求方】有意向会尽早联系您') {
            setTimeout(() => {
              navigateTo('/pages/record/record/record')
            }, 1000)
          }

        }

      },
    })
  },

  //页面滚动执行方式
  onPageScroll(e) {
    //console.log(e.scrollTop);
    let demlen = this.data.demlen;
    if (e.scrollTop == 0) {
      this.setData({
        TabCur: 1
      })
    } else if (e.scrollTop >= 200) {
      this.setData({
        TabCur: 2
      })
    }
    // else if (demlen == 0&&e.scrollTop >= 750) {
    //   this.setData({
    //     TabCur: 3
    //   })
    // }
  },

  //分享
  tapshare() {
    this.onShareAppMessage()
  },

  request(demandId) {
    let token = wx.getStorageSync('accessToken') || '';

    //获取需求详情
    wx.request({
      url: url + '/demand/getDemandById',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let demanditem = res.data.data;
        console.log('需求详情:',demanditem)
        if (res.data.success) {
          if (demanditem.label != '') {
            let label = demanditem.label.split(",")
            this.setData({
              demanditem: demanditem,
              label: label
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      },
    })

    //获取评论详情
    wx.request({
      url: url + '/invitation/getEvaluations',
      data: {
        demandId: demandId,
        accessToken: token,
      },
      success: res => {
        console.log('评论详情:',res.data.data)
        if (res.data.success) {
          let data = res.data.data;
          let demlen = res.data.data.length;
          this.setData({
            cusslist: data,
            demlen: demlen
          })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })

    //获取岗位发布者详情
    wx.request({
      url: url + '/demand/getReleaseMessage',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let publisherInfo = res.data.data;
        console.log('发布者详情:',publisherInfo);
        if (res.data.success) {
          this.setData({
            publisherInfo: publisherInfo,
            userId: res.data.data.userId
          })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      },
    })

    //获取公司主页图片
    setTimeout(() => {
      let userId = this.data.userId;
      wx.request({
        url: url + '/company/getCompanyHomepage',
        data: {
          accessToken: token,
          userId: userId
        },
        success: res => {
          console.log('图片:',res.data.data)
          let details = res.data.data;
          if (res.data.success) {
            if (details.length != 0) {
              let oneImage = "swiperList[0]";
              let twoImage = "swiperList[1]";
              let threeImage = "swiperList[2]";
              let fourImage = "swiperList[3]";
              let fiveImage = "swiperList[4]";
              if (details.oneImage != null) {
                this.setData({
                  [oneImage]: details.oneImage,
                })
              }
              if (details.twoImage != null) {
                this.setData({
                  [twoImage]: details.twoImage,
                })
              }
              if (details.threeImage != null) {
                this.setData({
                  [threeImage]: details.threeImage,
                })
              }
              if (details.fourImage != null) {
                this.setData({
                  [fourImage]: details.fourImage,
                })
              }
              if (details.fiveImage != null) {
                this.setData({
                  [fiveImage]: details.fiveImage,
                })
              }
            } 
          } 
        }
      })
    }, 1000)


  },

  // 查看更多的招聘职位,页面跳转
  toMoreJobs() {
    console.log('查看热招职位跳转');
    let userId = this.data.userId;
    let demandId = this.data.demandId;
    setTimeout(function() {
      navigateTo('/pages/demand/morejobs/morejobs?userId=' + userId + '&demandId=' + demandId)
    }, 500)
  },

  onLoad: function(options) {
    let demandId = options.demandId;
    this.setData({
      demandId: demandId,
      jobName: options.jobName
    })
    this.request(demandId);
  },

  onReady: function() {
    //let windowHeight = wx.getSystemInfoSync().windowHeight;
    //console.log(windowHeight);

  },

  onShow: function() {

  },


  onHide: function() {

  },

  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage() {
    console.log('e12345')
    return {
      title: '御材劳务平台',
      imageUrl: '/images/YuCai.jpg',
      path: '/pages/index/index'
    }
  }
})