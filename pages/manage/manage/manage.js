// pages/manage/manage/manage.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
  setBarTitle,
  pageScrollTo
} from '../../../utils/WeChatfction';

const date = new Date();
const years = [];
let year = date.getFullYear();
const months = [];
let month = date.getMonth();
const days = [];
let day = date.getDate();
const hours = [];
let hour = date.getHours();
const minutes = [];
let minute = date.getMinutes();

for (let i = 1990; i <= date.getFullYear() + 100; i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (let i = 1; i <= 24; i++) {
  hours.push(i)
}
for (let i = 1; i <= 60; i++) {
  minutes.push(i)
}

const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    demandflag: true,
    TabCur: 2,
    scrollLeft: 0,
    scrollTop: 0,
    tablist: [{
      id: 1,
      flag: '全部',
    }, {
      id: 2,
      flag: '待面试沟通',
    }, {
      id: 3,
      flag: '待回复',
    }, {
      id: 4,
      flag: '已入职',
    }],
    ctionList: [{
      icon: 'home',
      color: 'black',
      txtcolor: 'black',
      title: '回首页',
      name: 'home'
    }, {
      icon: 'phone',
      color: 'blue',
      title: '电话',
      txtcolor: 'blue',
      name: 'phone'
    }, {
      icon: '',
      color: '',
      txtcolor: '',
      title: '邀请面试',
      name: 'Invitation'
    }],
    years: years,
    year: year,
    months: months,
    month: month + 1,
    days: days,
    day: day,
    hours: hours,
    hour: hour,
    minutes: minutes,
    minute: minute,
    timerval: [29, month, day - 1, hour - 1, minute - 1],
  },

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
  tabSelect(e) {
    pageScrollTo(0, 500);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },
  demanditem(e) {
    console.log(e)
    let demanditem = e.currentTarget.dataset.item;
    let demandId = demanditem.demandHistroy.demandId;
    let userId = demanditem.demandHistroy.userId;
    let realName = demanditem.demandHistroy.realName;
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/invitation/evaluate/evaluate?demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
      });
    }, 3000)
    console.log(demandId, userId, realName)
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  techjump(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let id = e.currentTarget.dataset.id;
    //console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      demandId: id
    })
    wx.request({
      url: url + '/technology/acceptBusinessCardDetail',
      data: {
        accessToken: accessToken,
        id: id
      },
      success: res => {
        //console.log(res.data.data)
        let realName = res.data.data.realName;
        let dreamPosition = res.data.data.dreamPosition;
        let email = res.data.data.email;
        let sex = res.data.data.sex;
        let age = res.data.data.age;
        let profession = res.data.data.profession;
        let education = res.data.data.education;
        let graduationTime = res.data.data.graduationTime;
        let school = res.data.data.school;
        let experience = res.data.data.experience;
        let label = res.data.data.label;
        let description = res.data.data.description;
        let mobile = res.data.data.mobile;
        let userId = res.data.data.userId;
        if (res.data.success) {
          //console.log(res.data)
          this.setData({
            realName: realName,
            dreamPosition: dreamPosition,
            email: email,
            sex: sex,
            age: age,
            profession: profession,
            education: education,
            graduationTime: graduationTime,
            school: school,
            experience: experience,
            label: label,
            description: description,
            mobile: mobile,
            userId: userId,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[2]],
      minute: this.data.minutes[val[2]]
    })
  },

  interjump(e) {
    let demandId = e.currentTarget.dataset.demandid;
    let userId = e.currentTarget.dataset.userid;
    let year = this.data.year;
    let month = this.data.month;
    let day = this.data.day;
    let hour = this.data.hour;
    let minute = this.data.minute;
    let timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    this.tapbtn(demandId, userId, timer)
  },


  tapind() {
    switchTab('/pages/index/index')
  },

  taptel() {
    let mobile = this.data.mobile;
    makePhoneCall(mobile);
  },

  tapbtn(demandId, userId, timer) {
    //showToast("邀请面试成功", 'success', 3000);
    //console.log(demandId, userId, timer);
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/invitation/sendInvitation',
      method: 'post',
      data: {
        accessToken: accessToken,
        demandId: demandId,
        userId: userId,
        invitationTime: timer
      },
      success: res => {
        //console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'none', 3000)
          this.hideModal();
        } else {
          showToast(res.data.msg, 'none', 3000)
          this.hideModal();
        }
      }
    })

  },

  tapjump(e) {
    let name = e.currentTarget.dataset.target;
    let modalName = e.currentTarget.dataset.modal;
    if (name == 'home') {
      this.tapind()
    } else if (name == 'phone') {
      this.taptel()
    } else if (name == 'Invitation') {
      this.setData({
        modalName: modalName,
      })
    }
  },



  onLoad: function (options) {

    setBarTitle('投递记录')
  },

  evaluate(accessToken) {
    wx.request({
      url: url + '/invitation/myAcceptInvitation',
      data: {
        accessToken: accessToken
      },
      success: res => {
        console.log(res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          this.setData({
            evaldemand: demand,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  interview(accessToken) {
    wx.request({
      url: url + '/technology/mySendBusinessCard',
      data: {
        accessToken: accessToken
      },
      success: res => {
        console.log(res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          this.setData({
            interdemand: demand,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  techlist(accessToken){
    wx.request({
      url: url + '/technology/acceptBusinessCards',
      data: {
        accessToken: accessToken
      },
      success: res => {
        let techlist = res.data.data;
        console.log(techlist)
        if (res.data.success) {
          this.setData({
            techlist: techlist,
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  onReady: function () {
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
    let accessToken = wx.getStorageSync('accessToken') || [];
    this.evaluate(accessToken)
    this.interview(accessToken)
    this.techlist(accessToken)
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
    this.setData({
      demandflag: true,
    })
    this.onReady()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})