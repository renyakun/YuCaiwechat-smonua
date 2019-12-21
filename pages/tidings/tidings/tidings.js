// pages/tidings/tidings/tidings.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  data: {
    // 邀请消息数据
    newslist: app.globalData.newslist,
  },

  // 点击消息框,查看按钮,实现跳转
  cussjump(e) {
    let id = parseInt(e.currentTarget.dataset.id);
    console.log(id);
    switch (id) {
      case 1:
        //消息详情页
        wx.navigateTo({
          url: '/pages/tidings/messageInfo/messageInfo?id=1',
        });
        return;
      case 2: //面试邀请(待面试)
        wx.navigateTo({
          url: '/pages/record/record/record?id=2',
        });
        return;
      case 3: //评论消息
        wx.navigateTo({
          url: '/pages/record/record/record?id=3',
        });
        return;
      default:
        wx.navigateTo({
          url: '/pages/tidings/messageInfo/messageInfo?id=1',
        });
    }
  },

  // 清空数据评论消息的数据
  emptytap(e) {
    let id = parseInt(e.currentTarget.dataset.target) - 1;
    console.log(e.currentTarget.dataset.target);
    let badge = `newslist[${id}].badge`;
    let notice = `newslist[${id}].notice`;
    this.setData({
      [notice]: '',
      [badge]: 0
    })
  },



  // 请求投递邀请消息数据,设置消息条数显示
  request() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    // 发送请求,获取后台数据
    wx.request({
      url: url + '/technology/myAcceptDemands',
      data: {
        accessToken: accessToken,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // this.setData({
        //   messageList: res.data.data
        // })
        console.log(res)
        if (res.data.success) {
          // let badge = 'newslist[4].badge';
          // this.setData({
          //   [badge]: res.data.data.length
          // })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.request();
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