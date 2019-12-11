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
    tablist: [{
      id: 1,
      flag: '全部',
    }, {
      id: 2,
      flag: '待面试',
    }, {
      id: 3,
      flag: '已评价',
    }],
    fixedflag: false,
    wholeflag: true,
    evalflag: true,
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
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/demand/trans/trans?demandId=' + demandId,
      });
    }, 3100)
  },

  //评价跳转
  demanditem(e) {
    console.log(e)
    let demanditem = e.currentTarget.dataset.item;
    let demandId = demanditem.demandHistroy.demandId;
    let userId = demanditem.demandHistroy.userId;
    let realName = demanditem.demandHistroy.realName;
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/record/evaluate/evaluate?demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
      });
    }, 1000)
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
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/record/details/details?address=' + address + '&timer=' + timer + '&id=' + id + '&jobName=' + jobName + '&demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
      });
    }, 1000)
  },

  onLoad: function(options) {
    // 如果url中有id参数,跳转到对应的tab页
    if (options.id){
      let id = parseInt(options.id);
      this.setData({
        TabCur: id,
        scrollLeft: (id - 1) * 60,
      })
    }
  },

  //获取全部列表
  wholelist(token) {
    wx.request({
      url: url + '/technology/mySendBusinessCard',
      data: {
        accessToken: token
      },
      success: res => {
        console.log(res.data.data)
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
        console.log(res.data.data)
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
    // this.setData({
    //   loadflag: false,
    //   evaldemand:[]
    // })
    // 请求后台数据
    wx.request({
      url: url + '/invitation/alreadyEvaluation',
      data: {
        accessToken: token
      },
      success: res => {
        console.log(res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          if (demand.length != 0) {
            this.setData({
              evaldemand: [...demand],
              loadflag: true,
            })
          } else {
            this.setData({
              loadflag: false,
            })
          }
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  // commentInfo 评论详情页
  commentInfo(){
    wx.navigateTo({
      url: '../commentInfo/commentInfo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  onReady: function() {
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
    let token = wx.getStorageSync('accessToken') || [];
    this.interdemand(token)
    this.evaluate(token)
    this.wholelist(token)
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