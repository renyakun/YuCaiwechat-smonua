// pages/demand/trans/trans.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
<<<<<<< HEAD
  navigateTo,
  pageScrollTo,
  pageScrollTosel,
  switchTab,
  makePhoneCall,
} from '../../../utils/WeChatfction';

import {
  formatTime
} from '../../../utils/util';

const app = getApp();

Page({
=======
  pageScrollTo,
  pageScrollTosel,
  switchTab,
  setBarTitle,
  makePhoneCall,
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  /*页面的初始数据*/
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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

<<<<<<< HEAD
  //tab跳转
=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
        showToast('目前还没有评价', 'none', 1000)
=======
        showToast('目前还没有评价', 'none', 3000)
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      } else {
        pageScrollTosel('.cardcuss', 500)
      }

    }


  },
<<<<<<< HEAD

  //回到首页
  tapind() {
    switchTab('/pages/index/index');
  },

  //电话联系
=======
  tapind() {
    switchTab('/pages/index/index');
  },
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  taptel(e) {
    let mobile = e.currentTarget.dataset.target;
    makePhoneCall(mobile);
  },
<<<<<<< HEAD

  //推送名片
  tappush() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = this.data.demandId;
    console.log(demandId)
=======
  tappush() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = this.data.demandId;
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
        console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 3000)
          setTimeout(() => {
            switchTab('/pages/index/index')
          }, 3000)
        } else {
          showToast(res.data.msg, 'none', 3000)
          if (res.data.msg == '您还未制作个人名片,立即制作专属名片，让更多人与您合作吧') {
            setTimeout(() => {
              navigateTo('/pages/technology/add/add')
            }, 3000)
          } else if (res.data.msg == '您已经推送过了，【需求方】有意向会尽早联系您') {
            setTimeout(() => {
              switchTab('/pages/index/index')
            }, 3000)
          }

        }

      },
    })
  },

=======
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
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
    }
=======
    } 
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    // else if (demlen == 0&&e.scrollTop >= 750) {
    //   this.setData({
    //     TabCur: 3
    //   })
    // }
  },
<<<<<<< HEAD

  //分享
=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  tapshare() {
    this.onShareAppMessage()
  },

<<<<<<< HEAD
  //获取需求详情
  request(options) {
=======
  request(options){
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
        let pubDate = res.data.data.createTime;
        // formatTime
        console.log(pubDate);
        
        console.log(demanditem)
        if (res.data.success) {
          if (demanditem.label != '') {
            let label = demanditem.label.split(",")
            this.setData({
              demanditem: demanditem,
              label: label
            })
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }


=======
        console.log(demanditem)
        let label = demanditem.label.split(",")
        this.setData({
          demanditem: demanditem,
          label: label
        })
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      },
    })

    wx.request({
      url: url + '/invitation/getEvaluations',
      data: {
        demandId: options.demandId,
        accessToken: accessToken,
      },
      success: res => {
<<<<<<< HEAD
        console.log(res.data.data)
        if (res.data.success) {
=======
        console.log(res)
        if (res.data.success) {
          console.log(res.data.data)
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
          let data = res.data.data;
          let demlen = res.data.data.length;
          this.setData({
            cusslist: data,
            demlen: demlen
          })
        } else {
<<<<<<< HEAD
          showToast(res.data.msg, 'none', 1000)
=======
          showToast(res.data.msg, 'none', 3000)
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        }
      }
    })
  },

<<<<<<< HEAD
  onLoad: function(options) {
    this.setData({
      demandId: options.demandId,
      jobName: options.jobName
    })
    this.request(options)
  },

  onReady: function() {
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    console.log(windowHeight);
  },

=======
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
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  onShow: function() {

  },

<<<<<<< HEAD

=======
  /**
   * 生命周期函数--监听页面隐藏
   */
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  onHide: function() {

  },

<<<<<<< HEAD
=======
  /**
   * 生命周期函数--监听页面卸载
   */
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  onUnload: function() {

  },

<<<<<<< HEAD

=======
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  onPullDownRefresh: function() {

  },

<<<<<<< HEAD
=======
  /**
   * 页面上拉触底事件的处理函数
   */
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  onReachBottom: function() {

  },

<<<<<<< HEAD
=======
  /**
   * 用户点击右上角分享
   */
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  onShareAppMessage() {
    console.log('e12345')
    return {
      title: '御材劳务平台',
      imageUrl: '/images/YuCai.jpg',
      path: '/pages/index/index'
    }
  }
})