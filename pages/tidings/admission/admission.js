// pages/tidings/admission/admission.js

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
    page: 2,
    loadflag: true,
    loadplay: false,
  },

  touchmove(){
    return false;
  },

  //关闭模拟框
  hideModal() {
    this.setData({
      modalName: null
    })
  },

  //打开模态框
  tapjump(e) {
    wx.stopPullDownRefresh();
    console.log(e.currentTarget.dataset.modal, e.currentTarget.dataset.message)
    let modalName = e.currentTarget.dataset.modal;
    let message = e.currentTarget.dataset.message;
    this.setData({
      modalName: modalName,
      message: message
    })
  },

  //获取已录取列表
  demand(token, website, list, dataflag, txt, page) {
    console.log(token, website, list, dataflag, txt, page)
    wx.request({
      url: url + website,
      data: {
        accessToken: token,
        page: page,
      },
      success: res => {
        if (page <= 1) {
          let demand = res.data.data;
          console.log(txt, demand, demand.length, 'page:', page);
          if (res.data.success) {
            if (demand.length != 0) {
              this.setData({
                [list]: demand,
                [dataflag]: true,
                demandflag: false,
              })
            } else {
              this.setData({
                demandflag: false,
                [dataflag]: false,
              })
            }
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        } else {
          let demands = res.data.data;
          console.log(txt, demands, demands.length, 'page:', page);
          let demand = this.data.admission;
          console.log('加载数据', txt, demand)
          if (demands.length != 0) {
            if (res.data.success) {
              if (demands.length != 0) {
                showToast('加载数据中...', 'none', 500);
                demand.push(...demands)
                this.setData({
                  [list]: demand,
                  [dataflag]: true,
                  demandflag: false,
                  loadplay: false,
                })
              } else {
                this.setData({
                  demandflag: false,
                  [dataflag]: false,
                })
              }
            } else {
              showToast(res.data.msg, 'none', 1000)
            }
          } else {
            this.setData({
              tiptxt: '我也是有底线的',
              loadplay: true,
            })
          }


        }

      }
    })
  },


  //获取已录取列表
  request(page) {
    let token = wx.getStorageSync('accessToken') || [];

    let admission = 'admission';
    let siontxt = '已录取admission:';
    let sionwebsite = '/employment/workAdmission';
    let dataflag = 'sionflag';
    setTimeout(() => {
      this.demand(token, sionwebsite, admission, dataflag, siontxt, page)
    }, 500)
  },

  onLoad: function(options) {
    let page = this.data.page - 1;
    this.request(page)
  },


  onReady: function() {

  },

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
    this.setData({
      page: 2,
      admission: [],
      demandflag: true,
    })
    let page = this.data.page - 1;
    this.request(page)

    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let page = this.data.page++;
    this.request(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})