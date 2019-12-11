// pages/record/record/record.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
<<<<<<< HEAD
=======
  setBarTitle,
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
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
=======
      flag: '待面试沟通',
    }, {
      id: 3,
      flag: '待评价',
    }, {
      id: 4,
      flag: '不合适',
    }],
  },

  Seedels(e) {
    let demandId = e.currentTarget.dataset.target;
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/demand/trans/trans?demandId=' + demandId,
      });
    }, 3100)
  },

<<<<<<< HEAD
  //评价跳转
=======
  tabSelect(e) {
    pageScrollTo(0, 500);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },

>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
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
=======
    }, 3000)
  },

  onLoad: function (options) {
    setBarTitle('投递记录')
  },

  evaluate(accessToken) {
    wx.request({
      url: url + '/invitation/myAcceptInvitation',
      data: {
        accessToken: accessToken
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      },
      success: res => {
        console.log(res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
<<<<<<< HEAD
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
=======
          this.setData({
            evaldemand: demand,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        }
      }
    })
  },

<<<<<<< HEAD
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
=======
  interview(accessToken) {
    wx.request({
      url: url + '/technology/mySendBusinessCard',
      data: {
        accessToken: accessToken
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      },
      success: res => {
        console.log(res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
<<<<<<< HEAD
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
=======
          this.setData({
            interdemand: demand,
          })
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

<<<<<<< HEAD
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
=======
  onReady: function () {
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
<<<<<<< HEAD
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
=======
    let accessToken = wx.getStorageSync('accessToken') || [];
    this.evaluate(accessToken)
    this.interview(accessToken)
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    this.setData({
      demandflag: true,
    })
    this.onReady()
  },

<<<<<<< HEAD

  onReachBottom: function() {

  },

  onShareAppMessage: function() {
=======
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609

  }
})