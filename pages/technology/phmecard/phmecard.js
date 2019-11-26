// pages/technology/phmecard/phmecard.js
const {
  url
} = require('../../../utils/url.js');

import {
  showToast,
  switchTab,
  makePhoneCall,
  setBarColor,
  setBarTitle,
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

Page({
  data: {
    demandflag: true,
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
    month: month+1,
    days: days,
    day:day,
    hours: hours,
    hour: hour,
    minutes: minutes,
    minute: minute,
    timerval: [29, month, day-1, hour-1, minute-1],
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

  hideModal(e) {
    this.setData({
      modalName: null
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

  onLoad: function(options) {
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
    setBarColor('#ffffff', '#0081ff', 1500, 'ease');
    setBarTitle('招聘名片');


  },

  onReady: function() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/acceptBusinessCards',
      data: {
        accessToken: accessToken
      },
      success: res => {
        //console.log(res.data.data)
        // let demandlist = [];
        // for (let i in res.data.data) {
        //   console.log(res.data.data[i].mobile);
        //   demandlist.push(res.data.data[i].demandHistroy);
        // }
        // console.log(demandlist)
        // var allArr = [];
        // let oldArr = res.data.data;
        // for (var i = 0; i < oldArr.length; i++) {　　
        //   var flag = true;　　
        //   for (var j = 0; j < allArr.length; j++) {
        //     if (oldArr[i].dreamPosition == allArr[j].dreamPosition && oldArr[i].email == allArr[j].email && oldArr[i].age == allArr[j].age && oldArr[i].mobile == allArr[j].mobile && oldArr[i].realName == allArr[j].realName && oldArr[i].sex == allArr[j].sex) {　　　　　　
        //       flag = false;　　　　
        //     };　　
        //   };　　
        //   if (flag) {  　
        //     allArr.push(oldArr[i]);
        //     //console.log(allArr)
        //     allArr[i].demandHistroy = demandlist;
        //     console.log(allArr)
        //   };
        // };
        // console.log(allArr)


        let techlist = res.data.data;
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

  onShareAppMessage: function() {

  }
})