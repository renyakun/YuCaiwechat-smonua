// pages/demand/morejobs.js
import {
  showToast,
  fiflet,
  navigateTo,
  showLoading,
  pageScrollTo,
  switchTab,
} from '../../../utils/WeChatfction';
const {
  url
} = require('../../../utils/url.js');
Page({

  data: {
    demandflag: true,
    userId: '',
    page: 2,
    loadflag: true,
    loadplay: false, //没有数据图片显示标志 true不显示
    visible1: false,
    actions1: [
      {
        name: '去分享',
        icon: 'share',
        openType: 'share'
      }
    ],
  },

  companyjump(e) {
    let userId = e.currentTarget.dataset.target;
    navigateTo('/pages/demand/company/company?userId=' + userId)
  },

  //回到首页
  tapind() {
    switchTab('/pages/index/index');
  },

  chatjump() {
    showToast('即将上线，敬请期待!', 'none', 1000)
  },

  sharejump() {
    showToast('即将上线，敬请期待!', 'none', 1000)
  },

  //获取公司主页
  homepage(userId, token) {
    wx.request({
      url: url + '/company/getCompanyHomepage',
      data: {
        accessToken: token,
        userId: userId
      },
      success: res => {
        console.log('公司主页:', res.data.data)
        let details = res.data.data;
        if (res.data.success) {
          this.setData({
            details: details,
            src: '../../../images/company.png',
            detailsflag: res.data.success
          })
        }
      }
    })
  },

  //获取岗位发布者详情
  release(demandId, token) {
    wx.request({
      url: url + '/demand/getReleaseMessage',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let release = res.data.data;
        console.log('发布者详情:', release);
        if (res.data.success) {
          this.setData({
            release: release,
          })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      },
    })
  },

  // 获取更多职位信息
  getMoreJobs(userId, token) {
    wx.request({
      url: url + '/demand/getSendDemandslist',
      data: {
        accessToken: token,
        userId: userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log('更多职位信息:', res.data.data)
        if (res.data.success) {
          if (res.data.data.length != 0) {
            this.setData({
              demandflag: false,
              jobLists: res.data.data,
              loadflag: true,
              [dataflag]: true,
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
          this.setData({
            demandflag: true,
            loadflag: false,
            [dataflag]: false,
          })
        }
      },
    })
  },

  // 获取更多职位信息
  demand(token, userId, website, list, dataflag, txt, page) {
    console.log(token, userId, website, list, dataflag, txt, page)
    wx.request({
      url: url + website,
      data: {
        accessToken: token,
        userId: userId,
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
                loadflag: true,
              })
            } else {
              this.setData({
                demandflag: false,
                [dataflag]: false,
                loadflag: true,
              })
            }
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        } else {
          let demands = res.data.data;
          console.log(txt, demands, demands.length, 'page:', page);
          let demand = this.data.jobLists;
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
                  loadflag: true,
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
            //showToast('我也是有底线的', 'none', 1000)
            console.log('我也是有底线的')
          }


        }

      }
    })
  },

  // 招聘详情
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    navigateTo('/pages/demand/trans/trans?demandId=' + demandId);
  },

  request(demandId, userId, page) {
    let token = wx.getStorageSync('accessToken') || '';
    let jobLists = 'jobLists';
    let jobtxt = '更多职位信息jobLists:';
    let jobwebsite = '/demand/getSendDemandslist';
    let dataflag = 'jobflag';
    //this.getMoreJobs(userId, token);
    this.homepage(userId, token);
    this.release(demandId, token);
    this.demand(token, userId, jobwebsite, jobLists, dataflag, jobtxt, page)
  },


  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },


  handleClickItem1({ detail }) {
    const index = detail.index + 1;
  },

  onLoad: function(options) {

    this.setData({
      demandflag: true,
      userId: options.userId,
      demandId: options.demandId
    });
    let page = this.data.page - 1;
    this.request(options.demandId, options.userId, page)

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
      demandflag: true,
      demand: [],
    })
    let userId = this.data.userId;
    let demandId = this.data.demandId;
    let page = this.data.page - 1;
    setTimeout(() => {
      this.request(demandId, userId, page)
    }, 500)

    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let userId = this.data.userId;
    let demandId = this.data.demandId;
    let page = this.data.page++;
    setTimeout(() => {
      this.request(demandId, userId, page)
    }, 500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '名片详情',
      imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
    };
  }
})