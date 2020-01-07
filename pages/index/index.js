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
    lists: [{
      id: 1,
      img: '/images/imagesjpg1.jpg'
    }, {
      id: 2,
      img: '/images/imagesjpg2.jpg'
    }, {
      id: 3,
      img: '/images/imagesjpg3.jpg'
    }, ]
  },

  //搜索跳转
  searchbtn() {
    navigateTo('/pages/demand/search/search')
  },

  //消息
  cussjump(e) {
    let id = parseInt(e.currentTarget.dataset.id);
    //console.log(id);
    switch (id) {
      case 1: //投递邀请
        navigateTo('/pages/tidings/news/news?tidtxt=投递邀请消息&cur=1')
        break;
      case 2: //合作
        navigateTo('/pages/record/record/record?id=2')
        break;
      case 3: //评论消息
        navigateTo('/pages/tidings/news/news?tidtxt=评论消息&cur=2')
        //showToast('即将上线，敬请期待!', 'none', 1000)
        break;
      case 4: //录取消息
        navigateTo('/pages/tidings/news/news?tidtxt=录取消息&cur=3')
        //showToast('即将上线，敬请期待!', 'none', 1000)
        break;
      case 5: //完成消息
        navigateTo('/pages/tidings/news/news?tidtxt=完成消息&cur=4')
        //showToast('即将上线，敬请期待!', 'none', 1000)
        break;
      case 6: //全部
        //navigateTo('/pages/tidings/news/news?tidtxt=完成消息&cur=4')
        showToast('即将上线，敬请期待!', 'none', 1000)
        break;
      default:
        break;
    }
  },

  //菜单跳转
  sendjump(e) {
    // let name = e.currentTarget.dataset.target.name;
    // let title = e.currentTarget.dataset.target.title;
    // showToast('即将上线，敬请期待!', 'none', 1000)
    //navigateTo('/pages/demand/search/search')
    let id = e.currentTarget.dataset.id;
    console.log(id);
    switch (id) {
      case 1:
        navigateTo('/pages/demand/search/search');
        break;
      case 2:
        navigateTo('/pages/record/record/record');
        break;
      case 3:
        showToast('即将上线，敬请期待!', 'none', 1000);
        break;
      default:
        break;
    }
  },

  onLoad: function(options) {},

  onReady: function() {},

  onShow: function() {},

  onHide: function() {},

  onUnload: function() {},

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },

  onReachBottom: function() {},

  /* 用户点击右上角分享*/
  onShareAppMessage() {}
})