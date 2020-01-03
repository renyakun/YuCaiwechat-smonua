// pages/tidings/news/news.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
  pageScrollTo,
  relremovetag
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    demandflag: true,
    page: 2,
    loadflag: true,
    loadplay: false,
    admission: [],
    finishlist: [],
    evaldemand: [],
  },

  touchmove() {
    return false;
  },

  //打开回复
  replyModal(e) {
    console.log(e.currentTarget.dataset.modal, e.currentTarget.dataset.replyid);
    let modalName = e.currentTarget.dataset.modal;
    let replyid = e.currentTarget.dataset.replyid;
    this.setData({
      modalName: modalName,
      replyid: replyid
    })
  },

  formSubmit(e) {
    let token = wx.getStorageSync('accessToken') || [];
    let id = this.data.replyid;
    let replyMessage = e.detail.value.replyMessage;
    if (replyMessage == "") {
      showToast('请输入完整信息！', 'none', 1000)
    } else {
      console.log(id, replyMessage);
      wx.request({
        url: url + '/evaluation/userReply',
        method: 'post',
        data: {
          accessToken: token,
          id: id,
          replyMessage: replyMessage
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          this.hideModal();
          if (res.data.success) {
            showToast(res.data.data, 'success', 800);
            this.request(1, 2)
          } else {
            showToast(res.data.msg, 'none', 800);
          }
        }
      })
    }
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

  //关闭模拟框
  hideModal() {
    this.setData({
      modalName: null
    })
  },

  //打开模态框
  tapjump(e) {
    console.log(e.currentTarget.dataset.modal, e.currentTarget.dataset.message)
    let modalName = e.currentTarget.dataset.modal;
    let message = e.currentTarget.dataset.message;
    this.setData({
      modalName: modalName,
      message: message
    })
  },

  //评论消息跳转
  finishjump(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    let jobName = e.currentTarget.dataset.jobname;
    navigateTo('/pages/record/evaluate/evaluate?id=' + id + '&jobName=' + jobName)
  },

  //获取消息列表
  demand(token, website, list, dataflag, txt, page) {
    console.log(token, website, list, dataflag, txt, page)
    wx.request({
      url: url + website,
      data: {
        accessToken: token,
        page: page,
      },
      success: res => {
        console.log(res)
        if (page <= 1) {
          let demand = res.data.data;
          console.log(txt, demand, demand.length, 'page:', page);
          if (res.data.success) {
            if (demand.length != 0) {
              this.setData({
                [list]: demand,
                [dataflag]: true,
                demandflag: false,
              })
            } else {
              this.setData({
                demandflag: false,
                [dataflag]: false,
              })
            }
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        } else {
          let demands = res.data.data;
          console.log(txt, demands, demands.length, 'page:', page);
          let demand = [];
          switch (list) {
            case 'messageList':
              demand = this.data.messageList;
              break;
            case 'admission':
              demand = this.data.admission;
              break;
            case 'finishlist':
              demand = this.data.finishlist;
              break;
            case 'evaldemand':
              demand = this.data.evaldemand;
              break;
            default:
              demand = [];
          }
          console.log('加载数据', txt, demand)
          if (demands.length != 0) {
            if (res.data.success) {
              if (demands.length != 0) {
                showToast('加载数据中...', 'none', 500);
                demand.push(...demands)
                this.setData({
                  [list]: demand,
                  [dataflag]: true,
                  demandflag: false,
                  loadplay: false,
                })
              } else {
                this.setData({
                  demandflag: false,
                  [dataflag]: false,
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


  //获取已录取列表
  request(page, cur) {
    let token = wx.getStorageSync('accessToken') || [];

    let messageList = 'messageList';
    let messagetxt = '请求邀请messageList:';
    let messagewebsite = '/technology/myAcceptDemands';
    let dataflag1 = 'messageflag';

    let evaldemand = 'evaldemand';
    let evaltxt = '评价消息evaldemand:';
    let evalwebsite = '/evaluation/userAcceptEvaluation';
    let dataflag2 = 'evalflag';

    let admission = 'admission';
    let siontxt = '录取消息admission:';
    let sionwebsite = '/employment/workAdmission';
    let dataflag3 = 'sionflag';

    let finishlist = 'finishlist';
    let finishtxt = '完成消息finishlist:';
    let finishwebsite = '/employment/workAFinish';
    let dataflag4 = 'finishflag';

    setTimeout(() => {
      if (cur == 1) {
        this.demand(token, messagewebsite, messageList, dataflag1, messagetxt, page);
      } else if (cur == 2) {
        this.demand(token, evalwebsite, evaldemand, dataflag2, evaltxt, page);
      } else if (cur == 3) {
        this.demand(token, sionwebsite, admission, dataflag3, siontxt, page);
      } else if (cur == 4) {
        this.demand(token, finishwebsite, finishlist, dataflag4, finishtxt, page);
      }
    }, 500)
  },

  onLoad: function(options) {
    let page = this.data.page - 1;

    this.setData({
      tidtxt: options.tidtxt,
      cur: options.cur
    })
    this.request(page, options.cur)
    console.log(options)
  },


  onReady: function() {

  },

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
      admission: [],
      demandflag: true,
    })
    let page = this.data.page - 1;
    let cur = this.data.cur;
    this.request(page, cur)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let page = this.data.page++;
    let cur = this.data.cur;
    this.request(page, cur)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})