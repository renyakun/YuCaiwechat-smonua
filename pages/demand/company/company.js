// pages/demand/company/company.js
import {
  showToast,
  fiflet,
  navigateTo,
  showLoading,
  pageScrollTo,
} from '../../../utils/WeChatfction';
const {
  url
} = require('../../../utils/url.js');
const app = getApp();
Page({
  data: {
    demandflag: true,
    userId: '',
    loadflag: true, //没有数据图片显示标志 true不显示
    src: '../../../images/icon/company.png',
    tiptxt: '公司介绍',
    swiperList: ['https://image.weilanwl.com/gif/loading-1.gif',]
  },

  scale() {
    this.animation.height('60vh').step()
    this.setData({
      animation: this.animation.export()
    })
  },

  //获取公司主页
  homepage(userId, token) {
    wx.request({
      url: url + '/company/getCompanyHomepage',
      data: {
        accessToken: token,
        userId: userId
      },
      success: res => {
        console.log(res.data.data)
        let details = res.data.data;
        if (res.data.success) {
          if (details.length != 0) {
            this.setData({
              details: details,
              demandflag: false,
              loadflag: true,
            })
            let oneImage = "swiperList[0]";
            let twoImage = "swiperList[1]";
            let threeImage = "swiperList[2]";
            let fourImage = "swiperList[3]";
            let fiveImage = "swiperList[4]";
            if (details.oneImage != '') {
              this.setData({
                [oneImage]: details.oneImage,
              })
            }
            if (details.twoImage != '') {
              this.setData({
                [twoImage]: details.twoImage,
              })
            }
            if (details.threeImage != '') {
              this.setData({
                [threeImage]: details.threeImage,
              })
            }
            if (details.fourImage != '') {
              this.setData({
                [fourImage]: details.fourImage,
              })
            }
            if (details.fiveImage != '') {
              this.setData({
                [fiveImage]: details.fiveImage,
              })
            }



          } else {
            this.setData({
              loadflag: false,
            })
          }

        } else {
          showToast(res.data.msg, 'none', 800);
          this.setData({
            demandflag: true,
          })
        }
      }
    })
  },

  onLoad: function(options) {
    let token = wx.getStorageSync('accessToken') || '';
    this.homepage(options.userId, token);
  },

  onReady: function() {
    this.animation = wx.createAnimation()
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