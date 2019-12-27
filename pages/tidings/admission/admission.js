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

  //关闭模拟框
  hideModal() {
    this.setData({
      modalName: null
    })
  },

  //打开模态框
  tapjump(e) {
    console.log(e.currentTarget.dataset.modal, e.currentTarget.dataset.message)
    let modalName = e.currentTarget.dataset.modal;
    let message = e.currentTarget.dataset.message;
    this.setData({
      modalName: modalName,
      message: message
    })
  },


  //获取已录取列表 page:1
  admission1(token, page) {
    wx.request({
      url: url + '/employment/workAdmission',
      data: {
        accessToken: token,
        page: page
      },
      success: res => {
        console.log('已录取列表:', res.data.data)
        let demand = res.data.data;
        if (res.data.success) {
          if (demand.length != 0) {
            setTimeout(() => {
              this.setData({
                admission: demand,
                sionflag: true,
                demandflag: false,
                loadflag: true,
              })
            }, 500)
          } else {
            this.setData({
              sionflag: false,
              demandflag: true,
              loadflag: false,
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //获取已录取列表 page:++
  admission2(token, page) {
    wx.request({
      url: url + '/employment/workAdmission',
      data: {
        accessToken: token,
        page: page
      },
      success: res => {
        let demands = res.data.data;
        console.log('已录取列表:,page++', demands, page)
        let demand = this.data.admission;
        console.log('已录取列表:,page:1', demand)
        if (res.data.data.length != 0) {
          if (res.data.success) {
            if (demands.length != 0) {
              showToast('加载数据中...', 'none', 800);
              demand.push(...demands)
              setTimeout(() => {
                this.setData({
                  admission: demand,
                  sionflag: true,
                  demandflag: false,
                  loadflag: true,
                  loadplay: false,
                })
              }, 1000)
            } else {
              this.setData({
                sionflag: false,
                demandflag: true,
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
          showToast('我也是有底线的', 'none', 1000)
        }
      }
    })
  },

  //获取已录取列表
  request(page) {
    let token = wx.getStorageSync('accessToken') || [];
    if (page <= 1) {
      this.admission1(token, page)
    } else {
      this.admission2(token, page)
    }
  },

  onLoad: function(options) {
    let page = this.data.page-1;
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
    let page = this.data.page-1;
    this.request(page)
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