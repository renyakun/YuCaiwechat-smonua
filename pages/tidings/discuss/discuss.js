// pages/tidings/discuss/discuss.js
const {
  url
} = require('../../../utils/url.js');

import {
  showToast,
  navigateTo,
  setBarTitle,
} from '../../../utils/WeChatfction';
Page({
  data: {
    TabCur: 1,
    tablist: [{
      id: 1,
      nav: '评价',
      num: 23
    }, {
      id: 2,
      nav: '晒图',
      num: 0
    }],
    star: 5,
    badge:9,
    txtput: 0,
    isCard: true
  },

  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    this.setData({
      TabCur: TabCurs,
    })
  },

  tapimg() {
    let isCard = this.data.isCard;
    this.setData({
      isCard: !isCard
    })
  },

  tapage(e){
    //console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/tidings/reply/reply?id='+id,
    })
  },




  onLoad: function(options) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/invitation/myAcceptEvaluation',
      data: {
        accessToken: accessToken,
      },
      success: res => {
        //console.log(res)
        if (res.data.success) {
          console.log(res.data.data)
          let data = res.data.data;
          let num = 'tablist[0].num';
          this.setData({
            [num]: data.length,
            cusslist:data
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })

    setBarTitle('评价');
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
    this.onLoad()
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