// pages/record/commentInfo/commentInfo.js
const app = getApp();
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  switchTab,
} from '../../../utils/WeChatfction';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentsList:[
    ]
  },

  // 请求后台数据
  request(){
    let token = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url+'/invitation/alreadyEvaluation',
      data:{
        accessToken: token,
      },
      header:{
        'content-type': 'application/json'
      },
      success:res=>{
        console.log(res.data);
        if(res.data.success){
          showToast(res.data.data, 'success', 3000);   
          this.setData({
            commentsList:[...res.data.data]
          })       
        }
      },
      // function showToast(tit, icon, timer)
      fail:res=>{
        showToast('请求数据失败',null,2000);
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request();
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