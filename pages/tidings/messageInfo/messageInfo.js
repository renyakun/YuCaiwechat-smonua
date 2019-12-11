// pages/messageInfo/messageInfo.js

//接口
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  pagesurl,
  fiflet,
  navigateTo,
  showLoading,
  pageScrollTo,
  relremovetag,
} from '../../../utils/WeChatfction';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList:[], //当前消息详情信息
    pushBackInfo: [],//投递成功返回的数据
  },

  // 跳转到详情页
  Seedels(e) {
    console.log()
    let demandId = e.currentTarget.dataset.target.demandId;
    let jobName = e.currentTarget.dataset.target.jobName;
    //console.log(demandId);
    showLoading();
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/demand/trans/trans?demandId=' + demandId + '&jobName=' + jobName,
      });
    }, 3100)
  },
  
  // 请求邀请消息数据
  request(){
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
        if (res.data.success) {
          this.setData({
            messageList: res.data.data
          })
          console.log(res)
        } else {
          showToast(res.data.msg, 'none', 3000)
        }  
      }
    })
  },

  // 删除消息
  Delete(e){
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = e.currentTarget.dataset.target.demandId;
    // 前端删除
    let messageList = [...this.data.messageList];
    let delVal = messageList.find((value, index, arr)=>{
      return value.demandId = demandId
    });

    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (sm)=> {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          console.log(messageList);
          relremovetag(messageList, delVal)
          this.setData({
            messageList: messageList
          })
          // 发送请求,删除后台数据
              wx.request({
                url: url + '/technology/delMyAcceptDemand',
                data: {
                  accessToken: accessToken,
                  demandId: demandId
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: (res) => {
                  if (res.data.success) {
                    showToast('删除成功', 'none', 3000)
                  } else {
                    showToast(res.data.msg, 'none', 3000)
                  }
                  console.log(res)
                }
              })

        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })


    
    
  },

  // 投递名片
  tapPush(e){
    console.log('投递');
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = e.currentTarget.dataset.target.demandId;
    wx.request({
      url: url + '/technology/sendMyBusinessCard',
      data: {
        accessToken: accessToken,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        if (res.data.msg) {
          console.log('开始跳转')
          showToast(res.data.msg, 'none', 1000)
          // 跳转到查看页面
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/record/record/record',
            })
          },1500)
          
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
        // 设置状态为投递成功
        // this.setData({
        //   pushBackInfo: true
        // })
        // showToast();
        // console.log(res.data.msg)
      }
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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