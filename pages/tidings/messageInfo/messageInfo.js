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
    page: 2,
    loadflag: true,
    loadplay: false,
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
        }

      },
    })

  },


  listouch(e) {
    this.ListTouchStart(e);
    this.ListTouchMove(e);
    this.ListTouchEnd(e);
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

  //获取已录取列表
  demand(token, website, list, txt, page) {
    console.log(token, website, list, txt, page)
    wx.request({
      url: url + website,
      data: {
        accessToken: token,
        page: page,
      },
      success: res => {
        if (page <= 1) {
          let demand = res.data.data;
          console.log(txt, demand, demand.length, 'page:', page);
          if (res.data.success) {
            if (demand.length != 0) {
              this.setData({
                [list]: demand,
                dataflag: true,
                demandflag: false,
              })
            } else {
              this.setData({
                demandflag: false,
                dataflag: false,
              })
            }
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        } else {
          let demands = res.data.data;
          console.log(txt, demands, demands.length, 'page:', page);
          let demand = this.data.messageList;
          console.log('加载数据', txt, demand)
          if (demands.length != 0) {
            if (res.data.success) {
              if (demands.length != 0) {
                showToast('加载数据中...', 'none', 500);
                demand.push(...demands)
                this.setData({
                  [list]: demand,
                  dataflag: true,
                  demandflag: false,
                  loadplay: false,
                })
              } else {
                this.setData({
                  demandflag: false,
                  dataflag: false,
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
          }


        }

      }
    })
  },

  // 请求邀请消息数据
  request(page) {
    let token = wx.getStorageSync('accessToken') || [];
    let messageList = 'messageList';
    let messagetxt = '请求邀请messageList:';
    let messagewebsite = '/technology/myAcceptDemands';
    setTimeout(() => {
      this.demand(token, messagewebsite, messageList, messagetxt, page)
    }, 500)
  },

  onLoad: function(options) { },

  onReady: function() {
    let page = this.data.page - 1;
    this.request(page);
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
    this.setData({
      page: 2,
      messageList: [],
      demandflag: true,
    })
    this.onReady()
    wx.stopPullDownRefresh();
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