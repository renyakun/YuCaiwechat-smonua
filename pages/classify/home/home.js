// pages/classify/home/home.js
import {
  showToast,
  pagesurl,
  showModal
} from '../../../utils/WeChatfction';
Page({
  data: {
    iconList: [{
      icon: 'addressbook',
      name: 'certification',
      color: 'blue',
      badge: 0,
      title: '认证信息',
    }, {
      icon: 'vipcard',
      color: 'orange',
      name: 'authentication',
      badge: 0,
      title: '企业入驻'
    }, {
      icon: 'newsfill',
      color: 'yellow',
      badge: 1,
      name: 'case',
      title: '成功案例'
    }, {
      icon: 'order',
      color: 'olive',
      badge: 88,
      title: '最新订单',
      name: 'order',
    }, {
      icon: 'news',
      color: 'cyan',
      badge: 0,
      name: 'news',
      title: '新闻资讯'
    }, {
      icon: 'sort',
      color: 'red',
      badge: 0,
      name: 'hot',
      title: '热门榜单'
    },
    {
      title: '劳务政策',
      name: 'policy',
      color: 'red',
      badge: 0,
      icon: 'file'
    },
    {
      title: '平台培训',
      name: 'train',
      color: 'green',
      badge: 0,
      icon: 'group'
    },
    {
      title: '关于我们',
      name: 'about',
      color: 'cyan',
      badge: 0,
      icon: 'friendfill'
    },
    ],
  },
  homejump(e) {
    let token = wx.getStorageSync('token') || {};
    let tokenflag = token.data.success;
    let tokenmsg = wx.getStorageSync('tokenmsg') || {};
    let msg = tokenmsg.data.msg;
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    if (name == "certification" && tokenflag) {
      pagesurl(name, title, 1)
    } else if (name == "certification" && !tokenflag) {
      showModal('请先实名认证', 'RealName', '实名认证')
    } else if (name == "authentication" && msg == "您还未进行企业认证") {
      pagesurl(name, title)
    } else if (name == "authentication" && msg == "您还未进行实名认证，请先实名认证再企业认证") {
      showModal(tokenmsg.data.msg, 'RealName', '实名认证')
    } else if (name == "authentication" && msg == "成功") {
      showToast('您已企业认证！正在为您跳转认证信息', 'none', 2000)
      setTimeout(() => {
        pagesurl('certification', '认证信息', 2)
      }, 2500)
    } else {
      pagesurl(name, title)
      //showToast('即将上线，敬请期待!', 'none', 3000)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
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