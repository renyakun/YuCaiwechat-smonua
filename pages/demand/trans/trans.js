// pages/demand/trans/trans.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  pageScrollTo,
  pageScrollTosel,
  switchTab,
  setBarTitle,
  makePhoneCall,
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  /*页面的初始数据*/
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 1,
    InputBottom: 0,
    scrollTop: 0,
    navlist: [{
      id: 1,
      nav: '图片'
    }, {
      id: 2,
      nav: '详情'
    }, {
      id: 3,
      nav: '评论'
    }],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    let demlen = this.data.demlen;
    this.setData({
      TabCur: TabCurs,
    })
    if (TabCurs == 1) {
      pageScrollTo(0, 500)
    } else if (TabCurs == 2) {
      pageScrollTosel('.cardpost', 500)
    } else if (TabCurs == 3) {
      if (demlen == 0) {
        showToast('目前还没有评价', 'none', 3000)
      } else {
        pageScrollTosel('.cardcuss', 500)
      }

    }


  },
  tapind() {
    switchTab('/pages/index/index');
  },
  taptel(e) {
    let mobile = e.currentTarget.dataset.target;
    makePhoneCall(mobile);
  },
  tappush() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = this.data.demandId;
    wx.request({
      url: url + '/technology/sendMyBusinessCard',
      data: {
        accessToken: accessToken,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data.data)
        if (res.data.success) {
          showToast(res.data.data, 'success', 3000)
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      },
    })
  },
  onChange(e) {
    //console.log(e.detail, 'click right menu callback data')
  },
  //页面滚动执行方式
  onPageScroll(e) {
    console.log(e.scrollTop);
    let demlen = this.data.demlen;
    if (e.scrollTop == 0) {
      this.setData({
        TabCur: 1
      })
    } else if (e.scrollTop >= 200) {
      this.setData({
        TabCur: 2
      })
    } 
    // else if (demlen == 0&&e.scrollTop >= 750) {
    //   this.setData({
    //     TabCur: 3
    //   })
    // }
  },
  tapshare() {
    this.onShareAppMessage()
  },

  request(options){
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/demand/getDemandById',
      data: {
        accessToken: accessToken,
        demandId: options.demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let demanditem = res.data.data;
        console.log(demanditem)
        let label = demanditem.label.split(",")
        this.setData({
          demanditem: demanditem,
          label: label
        })
      },
    })

    wx.request({
      url: url + '/invitation/getEvaluations',
      data: {
        demandId: options.demandId,
        accessToken: accessToken,
      },
      success: res => {
        console.log(res)
        if (res.data.success) {
          console.log(res.data.data)
          let data = res.data.data;
          let demlen = res.data.data.length;
          this.setData({
            cusslist: data,
            demlen: demlen
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function(options) {
    setBarTitle(options.jobName);

    // this.setData({
    //   demandId: options.demandId,
    // })

    //let demandId = this.data.demandId;
    this.request(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let windowHeight= wx.getSystemInfoSync().windowHeight;
    console.log(windowHeight);
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    console.log('e12345')
    return {
      title: '御材劳务平台',
      imageUrl: '/images/YuCai.jpg',
      path: '/pages/index/index'
    }
  }
})