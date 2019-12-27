// pages/record/record/record.js
const {
  url
} = require('../../../utils/url.js');

import {
  showToast,
  navigateTo,
  showLoading,
  pageScrollTo
} from '../../../utils/WeChatfction';

const app = getApp();

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    demandflag: true,
    TabCur: 1,
    scrollLeft: 0,
    scrollTop: 0,
    recordlist: app.globalData.recordlist,
    wholeflag: true,
    interflag: true,
  },

  //tab跳转
  tabSelect(e) {
    pageScrollTo(0, 500);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },

  //需求详情跳转
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target;
    //console.log(demandId);
    wx.navigateTo({
      url: '/pages/demand/trans/trans?demandId=' + demandId,
    });
  },

  //评价跳转
  demanditem(e) {
    console.log(e)
    let demanditem = e.currentTarget.dataset.item;
    let demandId = demanditem.demandHistroy.demandId;
    let userId = demanditem.demandHistroy.userId;
    let realName = demanditem.demandHistroy.realName;
    wx.navigateTo({
      url: '/pages/record/evaluate/evaluate?demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
    });
    console.log(demandId, userId, realName)
  },

  //面试邀请详情
  detaitem(e) {
    let demanditem = e.currentTarget.dataset.item;
    let jobName = demanditem.demandHistroy.jobName;
    let demandId = demanditem.demandHistroy.demandId;
    let userId = demanditem.demandHistroy.userId;
    let realName = demanditem.demandHistroy.realName;
    let address = demanditem.address;
    let timer = demanditem.invitationTime;
    let id = demanditem.id;
    console.log(demanditem)
    wx.navigateTo({
      url: '/pages/record/details/details?address=' + address + '&timer=' + timer + '&id=' + id + '&jobName=' + jobName + '&demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
    });
  },

  //获取全部列表
  wholelist(token) {
    wx.request({
      url: url + '/technology/mySendBusinessCard',
      data: {
        accessToken: token
      },
      success: res => {
        console.log('全部列表:', res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          if (demand.length != 0) {
            this.setData({
              wholelist: demand,
              wholeflag: true,
            })
          } else {
            this.setData({
              wholeflag: false,
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //获取待面试列表
  interdemand(token) {
    wx.request({
      url: url + '/invitation/myAcceptInvitation',
      data: {
        accessToken: token
      },
      success: res => {
        console.log('待面试:', res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          if (demand.length != 0) {
            this.setData({
              interdemand: demand,
              interflag: true,
            })
          } else {
            this.setData({
              interflag: false,
            })
          }

        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //获取已评价列表
  evaluate(token) {
    wx.request({
      url: url + '/invitation/alreadyEvaluation',
      data: {
        accessToken: token
      },
      success: res => {
        let demand = res.data.data;
        console.log('已评价:', demand)
        if (res.data.success) {
          if (demand.length != 0) {
            this.setData({
              evaldemand: [...demand],
              evalflag: true,
            })
          } else {
            this.setData({
              evalflag: false,
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //获取不合适列表
  inprolist(token) {
    wx.request({
      url: url + '/technology/inappropriate',
      data: {
        accessToken: token
      },
      success: res => {
        console.log('不合适:', res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          if (demand.length != 0) {
            this.setData({
              inprolist: [...demand],
              inproflag: true,
              demandflag: false,
            })
          } else {
            this.setData({
              inproflag: false,
              demandflag: false,
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //获取投递记录列表
  demand1(token, website, list, len, dataflag, demandflag, txt) {
    console.log(token, demandId, website, list, len, dataflag, demandflag, txt)
    wx.request({
      url: url + website,
      data: {
        accessToken: token
      },
      success: res => {
        console.log(txt, res.data.data, res.data.data.length,)
        if (res.data.success) {
          if (res.data.data.length != 0) {
            this.setData({
              [list]: res.data.data,
              [dataflag]: true,
              [demandflag]: false,
              [len]: res.data.data.length
            })
          } else {
            this.setData({
              [demandflag]: false,
              [dataflag]: false,
              [len]: 0
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  onLoad: function(options) {
    // 如果url中有id参数,跳转到对应的tab页
    if (options.id) {
      let id = parseInt(options.id);
      this.setData({
        TabCur: id,
        scrollLeft: (id - 1) * 60,
      })
    }

    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 1000)
    this.request()

  },


  request() {
    let token = wx.getStorageSync('accessToken') || [];
    this.interdemand(token)
    this.evaluate(token)
    this.wholelist(token)
    this.inprolist(token)
  },


  onReady: function() {

  },

  onShow: function() {

  },


  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {
    this.setData({
      demandflag: true,
    })
    this.onReady()
  },


  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  }
})