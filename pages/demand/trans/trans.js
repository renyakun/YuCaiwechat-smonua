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
    navlist: [{
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
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
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
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = this.data.demandId;
    console.log(demandId)
    wx.request({
      url: url + '/technology/sendMyBusinessCard',
      data: {
        accessToken: accessToken,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 3000)
          setTimeout(() => {
            switchTab('/pages/index/index')
          }, 3000)
        } else {
          showToast(res.data.msg, 'none', 3000)
          if (res.data.msg == '您还未制作个人名片,立即制作专属名片，让更多人与您合作吧') {
            setTimeout(() => {
              navigateTo('/pages/technology/add/add')
            }, 3000)
          } else if (res.data.msg == '您已经推送过了，【需求方】有意向会尽早联系您') {
            setTimeout(() => {
              switchTab('/pages/index/index')
            }, 3000)
          }

        }

      },
    })
  },

  //页面滚动执行方式
  onPageScroll(e) {
    console.log(e.scrollTop);
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

  //获取需求详情
  request(options) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/demand/getDemandById',
      data: {
        accessToken: accessToken,
        demandId: options.demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let demanditem = res.data.data;
        let pubDate = res.data.data.createTime;
        // formatTime
        console.log(pubDate);
        
        console.log(demanditem)
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

    wx.request({
      url: url + '/invitation/getEvaluations',
      data: {
        demandId: options.demandId,
        accessToken: accessToken,
      },
      success: res => {
        console.log(res.data.data)
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
  },

  // 获取岗位发布者详情
  getPublisher(options){
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/demand/getReleaseMessage',
      data: {
        accessToken: accessToken,
        demandId: options.demandId
      },
      header: {
        'content-type': 'application/json'
      },  
      success: res => {
        let publisherInfo = res.data.data;
        console.log(publisherInfo);
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
  },
// 查看更多的招聘职位,页面跳转
  toMoreJobs(){
    console.log('查看热招职位跳转');
    let userId = this.data.userId;
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/demand/morejobs/morejobs?userId=' + userId,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })  
    },500)   
  },

  onLoad: function(options) {
    this.setData({
      demandId: options.demandId,
      jobName: options.jobName
    })
    this.request(options);
    this.getPublisher(options);
  },

  onReady: function() {
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    console.log(windowHeight);
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