// pages/record/record/record.js
const {
  url
} = require('../../../utils/url.js');

import {
  showToast,
  navigateTo,
  showLoading,
  pageScrollTo
} from '../../../utils/WeChatfction';

const app = getApp();

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    demandflag: true,
    TabCur: 1,
    scrollLeft: 0,
    scrollTop: 0,
    spin: false,
    recordlist: app.globalData.recordlist,
    wholeflag: true,
    interflag: true,
    page: 2,
    wholelist: [],
    sendlist: [],
    evaldemand: [],
    inprolist: [],
    sionlist: [],
    finishlist: [],
  },

  //tab跳转
  tabSelect(e) {
    pageScrollTo(0, 500);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },

  //需求详情跳转
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target;
    wx.navigateTo({
      url: '/pages/demand/trans/trans?demandId=' + demandId,
    });
  },

  //评价跳转
  demanditem(e) {
    console.log(e)
    let demanditem = e.currentTarget.dataset.item;
    let demandId = demanditem.demandHistroy.demandId;
    let userId = demanditem.demandHistroy.userId;
    let realName = demanditem.demandHistroy.realName;
    wx.navigateTo({
      url: '/pages/record/evaluate/evaluate?demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
    });
    console.log(demandId, userId, realName)
  },

  //面试邀请详情
  detaitem(e) {
    let demanditem = e.currentTarget.dataset.item;
    let jobName = demanditem.demandHistroy.jobName;
    let demandId = demanditem.demandHistroy.demandId;
    let userId = demanditem.demandHistroy.userId;
    let realName = demanditem.demandHistroy.realName;
    let address = demanditem.address;
    let timer = demanditem.invitationTime;
    let id = demanditem.id;
    console.log(demanditem)
    wx.navigateTo({
      url: '/pages/record/details/details?address=' + address + '&timer=' + timer + '&id=' + id + '&jobName=' + jobName + '&demandId=' + demandId + '&userId=' + userId + '&realName=' + realName,
    });
  },

  //刷新
  btnspin() {
    pageScrollTo(0, 500);
    let spin = this.data.spin;
    let page = 1;
    this.setData({
      spin: true,
      demandflag: true,
      page: 2
    })
    let token = wx.getStorageSync('accessToken') || '';
    setTimeout(() => {
      this.request(page)
      setTimeout(() => {
        this.setData({
          spin: false
        })
      }, 3900)

    }, 1000)

  },

  //获取投递记录列表
  demand(token, website, list, dataflag, txt, page) {
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
            case 'wholelist':
              demand = this.data.wholelist;
              break;
            case 'sendlist':
              demand = this.data.sendlist;
              break;
            case 'evaldemand':
              demand = this.data.evaldemand;
              break;
            case 'inprolist':
              demand = this.data.inprolist;
              break;
            case 'sionlist':
              demand = this.data.sionlist;
              break;
            case 'finishlist':
              demand = this.data.finishlist;
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

          }


        }

      }
    })
  },

  request(page) {
    let token = wx.getStorageSync('accessToken') || '';
    let wholelist = 'wholelist';
    let wholetxt = '全部列表wholelist:';
    let wholewebsite = '/technology/mySendBusinessCard';
    let dataflag1 = 'wholeflag';

    let sendlist = 'sendlist';
    let sendtxt = '待面试sendlist:';
    let sendwebsite = '/invitation/myAcceptInvitation';
    let dataflag2 = 'sendflag';

    // let finishlist = 'finishlist';
    // let finishtxt = '已完成finishlist:';
    // let finishwebsite = '/employment/workAFinish';
    // let dataflag4 = 'finishflag';

    let evaldemand = 'evaldemand';
    let evaltxt = '已评价evaldemand:';
    let evalwebsite = '/invitation/alreadyEvaluation';
    let dataflag3 = 'evalflag';

    let inprolist = 'inprolist';
    let inprotxt = '不合适 inprolist:';
    let inprowebsite = '/technology/inappropriate';
    let dataflag4 = 'inproflag';


    setTimeout(() => {
      this.demand(token, wholewebsite, wholelist, dataflag1, wholetxt, page);
      this.demand(token, sendwebsite, sendlist, dataflag2, sendtxt, page);
      //this.demand(token, evalwebsite, evaldemand, dataflag3, evaltxt, page);
      this.demand(token, inprowebsite, inprolist, dataflag4, inprotxt, page);
    }, 500)
  },

  onLoad: function(options) {
    // 如果url中有id参数,跳转到对应的tab页
    console.log(options)
    if (options.id) {
      let id = parseInt(options.id);
      this.setData({
        TabCur: id,
        scrollLeft: (id - 1) * 60,
      })
    }
    let page = 1;
    this.request(page)

  },



  onReady: function() {

  },

  onShow: function() {

  },


  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {
    this.btnspin()
    wx.stopPullDownRefresh();
  },


  onReachBottom: function() {

    let page = this.data.page++;
    this.request(page)
  },

  onShareAppMessage: function() {

  }
})