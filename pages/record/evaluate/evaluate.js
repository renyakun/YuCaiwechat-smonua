// pages/invitation/evaluate/evaluate.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  switchTab,
<<<<<<< HEAD
=======
  setBarColor,
  setBarTitle,
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
} from '../../../utils/WeChatfction';
Page({
  data: {
    star: 0,
<<<<<<< HEAD
    txtput: 0,
=======
    txtput:0,
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    message: ''
  },
  onChange(e) {
    const index = e.detail.index;
    this.setData({
      star: index
    })
  },
  formSubmit(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let star = this.data.star;
    let message = e.detail.value.message;
    let demandId = this.data.demandId;
    let userId = this.data.userId;
    let realName = this.data.realName;
    if (message == "" || star == 0) {
<<<<<<< HEAD
      showToast('请输入完整信息！', 'none', 1000)
=======
      showToast('请输入完整信息！', 'none', 3000)
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    } else {
      console.log(star, message);
      wx.request({
        url: url + '/invitation/evaluation',
        method: 'post',
        data: {
          star: star,
          message: message,
          demandId: demandId,
          userId: userId,
          realName: realName,
          accessToken: accessToken,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.success) {
<<<<<<< HEAD
            showToast(res.data.data, 'success', 1000);
            setTimeout(() => {
              switchTab('/pages/record/record/record?id=3');
            }, 3500)
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        },
        complete:res=>{
          wx.navigateTo({
            url: '/pages/record/record/record?id=3',
          })
=======
            showToast(res.data.data, 'success', 3000);
            switchTab('/pages/user/user/user');
          } else {
            showToast(res.data.msg, 'none',3000)
          }
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        }
      })
    }
  },
  textareaBInput(e) {
    console.log(e.detail.value);
    let val = e.detail.value;
    let len = val.length;
    this.setData({
      txtput: len,
    })
    if (len > 499) {
<<<<<<< HEAD
      showToast('输入值字数最大为500！', 'none', 1000)
=======
      showToast('输入值字数最大为500！', 'none', 3000)
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    }
  },
  onLoad: function(options) {
    this.setData({
      demandId: options.demandId,
      userId: options.userId,
      realName: options.realName
    })

<<<<<<< HEAD

=======
    setBarColor('#ffffff', '#0081ff', 1500, 'ease');
    setBarTitle('评价');
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  },

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})