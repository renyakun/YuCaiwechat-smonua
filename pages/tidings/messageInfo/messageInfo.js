// pages/messageInfo/messageInfo.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  relremovetag,
  switchTab,
  showLoading,
} from '../../../utils/WeChatfction';

Page({

  data: {
    demandflag: true,
    loadflag: true,
    messageList: [], //当前消息详情信息
    pushBackInfo: [], //投递成功返回的数据
  },

  // 跳转到详情页
  Seedels(e) {
    console.log()
    let demandId = e.currentTarget.dataset.target.demandId;
    let jobName = e.currentTarget.dataset.target.jobName;
    wx.navigateTo({
      url: '/pages/demand/trans/trans?demandId=' + demandId + '&jobName=' + jobName,
    });
  },

  // 删除邀请投递消息
  delitem(demandId) {
    let token = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/delMyAcceptDemand',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        // if (res.data.success) {
        //   showToast('删除成功', 'none', 3000)
        // } else {
        //   showToast(res.data.msg, 'none', 3000)
        // }
        console.log(res.data.data)
      }
    })
  },

  // 删除消息
  Delete(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    let messageList = [...this.data.messageList];
    let delVal = messageList.find((value, index, arr) => {
      return value.demandId = demandId
    });
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          // 用户点击了确定 可以调用删除方法了
          console.log(messageList);
          relremovetag(messageList, delVal)
          this.setData({
            messageList: messageList
          })
          this.delitem(demandId)

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  // 投递名片
  tapPush(e) {
    let token = wx.getStorageSync('accessToken') || [];
    let demandId = e.currentTarget.dataset.target.demandId;
    wx.request({
      url: url + '/technology/sendMyBusinessCard',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 1000)
          setTimeout(() => {
            navigateTo('/pages/record/record/record')
            this.delitem(demandId)
          }, 1000)
        } else {
          showToast(res.data.msg, 'none', 1000)
          // if (res.data.msg == '您已经推送过了，【需求方】有意向会尽早联系您') {
          //   setTimeout(() => {
          //     switchTab('/pages/index/index')
          //   }, 1000)
          // }

        }

      },
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

  // 请求邀请消息数据
  request() {
    let token = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/myAcceptDemands',
      data: {
        accessToken: token,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        let messdata = res.data.data;
        if (res.data.success) {
          this.setData({
            messageList: messdata,
            demandflag: false,
            loadflag: true, 
          })
          console.log(messdata)
        } else {
          this.setData({
            demandflag: true,
            loadflag: false,
          })
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  onLoad: function(options) {
    console.log(options);

  },

  onReady: function() {
    this.request();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      demandflag: true,
    })
    setTimeout(() => {
      this.onReady()
    }, 500)
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
      demandflag: true,
    })
    setTimeout(() => {
      this.onReady()
    }, 500)

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