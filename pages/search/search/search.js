// pages/search/search/search.js
const app = getApp();

import {
  showToast,
  navigateTo,
  seaunique,
  removeByValue,
} from '../../../utils/WeChatfction';

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    searchval: '',
    historyflag: false,
    searchList: ['设计', 'weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification'],
    seahistoryList: ['小程序', 'weappdev', 'wxParse', 'wxSearch', 'wxNotification', '1', '2', '3', '4', '5', '6'],
  },

  search(item) {
    let seahistoryLists = this.data.seahistoryList;
    seahistoryLists.unshift(item);
    let seahistoryListss = seaunique(seahistoryLists);
    this.setData({
      searchval: item,
      seahistoryList: seahistoryListss,
      historyflag: false,
    })
  },
  searchput(e) {
    console.log(e.detail.value);
    this.setData({
      searchval: e.detail.value,
    })
  },
  searchbtn(e) {
    // 获取搜索框内容 btnitem
    const btnitem = e.currentTarget.dataset.target;
    if (btnitem != '') {
      this.search(btnitem);
      // 跳转搜索结果页
      wx.navigateTo({
        url: '/pages/search/result/result?search=' + btnitem,
      })
      console.log(btnitem)
      showToast(btnitem, "none", 3000)
    } else {
      showToast("内容不能为空","none",3000)
    }
  },
  tagshow(e) {
    const showitem = e.currentTarget.dataset.item;
    this.search(showitem)
  },
  clearhistoryitem(e) {
    const clearitem = e.currentTarget.dataset.item;
    let seahistoryLists = this.data.seahistoryList;
    removeByValue(seahistoryLists, clearitem);
    this.setData({
      seahistoryList: seahistoryLists,
    })
  },
  clearhistory(e) {
    let seahistoryLists = new Array();
    this.setData({
      historyflag: true,
      seahistoryList: seahistoryLists,
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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