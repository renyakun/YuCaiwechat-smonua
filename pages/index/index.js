//index.js
const {
  url
} = require('../../utils/url.js');

import {
  showToast,
  navigateTo,
} from '../../utils/WeChatfction';

const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    SeaBar: '10vh',
    CityBar: '',
    iconList: app.globalData.iconList,
    swiperList: ['/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg'],
    lists: ['/images/imagesjpg1.jpg', '/images/imagesjpg2.jpg','/images/imagesjpg3.jpg']
  },

  //搜索跳转
  searchbtn() {
    navigateTo('/pages/demand/search/search')
  },

  //菜单跳转
  sendjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    showToast('即将上线，敬请期待!', 'none', 1000)
  },

  onLoad: function(options) { },

  onReady: function() { },

  onShow: function() { },

  onHide: function() { },

  onUnload: function() { },

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },

  onReachBottom: function() { },

  /* 用户点击右上角分享*/
  onShareAppMessage() { }
})