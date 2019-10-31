// pages/seek/search/search.js
const app = getApp();
const {
  $Toast
} = require('../../../colorui/dist/base/index');

function unique(ary) {
  let newAry = [];
  for (let i = 0; i < ary.length; i++) {
    if (newAry.indexOf(ary[i]) === -1) {
      newAry.push(ary[i]);
    }
  }
  return newAry;
};

function removeByValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
};

Page({

  /**
   * 页面的初始数据
   */
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
    let seahistoryListss = unique(seahistoryLists);
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
    const btnitem = e.currentTarget.dataset.target;
    if (btnitem != '') {
      this.search(btnitem);
      wx.navigateTo({
        url: '/pages/seek/Item/Item?item=' + btnitem,
      })
    } else {
      $Toast({
        content: '内容不能为空',
        icon: 'prompt'
      });
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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