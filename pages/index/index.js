//index.js
const {
  province,
  municipal
} = require('../../utils/city.js');

const {
  url
} = require('../../utils/url.js');

import {
  showToast,
  pagesurl,
  fiflet,
  navigateTo,
  showLoading,
  pageScrollTo,
} from '../../utils/WeChatfction';

const app = getApp();
let provinces = [];
let municipals = [];
let label = [];

for (let i in province) {
  provinces.push(province[i]);
}

for (let i in municipal) {
  municipals.push(municipal[i]);
}

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    list: [{
      name: 'shake',
      color: 'blue'
    }],
    iconList: [{
        icon: 'newsfill',
        color: 'yellow',
        badge: 1,
        name: 'case',
        title: '成功案例'
      }, {
        icon: 'order',
        color: 'olive',
        badge: 150,
        title: '最新订单',
        name: 'order',
      }, {
        icon: 'news',
        color: 'cyan',
        badge: 1,
        name: 'news',
        title: '新闻资讯'
      }, {
        icon: 'sort',
        color: 'red',
        badge: 1,
        name: 'hot',
        title: '热门榜单'
      },
      {
        title: '劳务政策',
        name: 'policy',
        color: 'red',
        badge: 0,
        icon: 'file'
      },
      {
        title: '平台培训',
        name: 'train',
        color: 'green',
        badge: 0,
        icon: 'group'
      },
      {
        title: '全部',
        name: 'whole',
        color: 'blue',
        badge: 0,
        icon: 'cascades'
      },
    ],
    TabCur: 1,
    regionicon: 'triangleupfill',
    navlist: [{
      id: 1,
      nav: '最新'
    }, {
      id: 2,
      nav: '推荐'
    }],
    scrollTop: 0,
    fixedflag: true,
    demandflag: true,
    Modalflag: true,
    provinceflag: false,
    value: [0, 0],
    provinces: provinces,
    province: '',
    municipals: municipals,
    municipal: '',
    munitem: '区域',
    tiptxt: '我也是有底线的',
    demand: []
  },
  sendjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    if (name == "whole") {
      navigateTo('/pages/classify/home/home')
    } else {
      pagesurl(name, title)
      //showToast('即将上线，敬请期待!', 'none', 3000)
    }
  },
  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    if (TabCurs == 2) {
      showToast('即将上线，敬请期待!', 'none', 3000)
    } else {
      this.setData({
        TabCur: TabCurs,
        demandflag: true,
      })
      let val = "";
      this.request(val);
    }
  },
  showRegion(e) {
    let Modalflag = this.data.Modalflag;
    if (Modalflag) {
      this.setData({
        Modalflag: !Modalflag,
        regionicon: 'triangledownfill',
      })
      pageScrollTo(250, 1000);
    } else {
      this.setData({
        Modalflag: !Modalflag,
        regionicon: 'triangleupfill',
        demandflag: true,
      })
      setTimeout(() => {
        this.setData({
          demandflag: false,
        })
      }, 3000)
      pageScrollTo(0, 1000);
    }
  },

  bindChange: function(e) {
    let val = e.detail.value
    let ind = val[0];
    this.setData({
      province: this.data.provinces[val[0]],
    })
  },

  proChange(e) {
    let val = e.currentTarget.dataset.target;
    let arr = this.data.provinces;
    let ind = fiflet(arr, val);
    this.setData({
      provinceflag: true,
      municipal: this.data.municipals[ind],
    })
  },

  munChange(e) {
    let val = e.currentTarget.dataset.target;
    console.log(val)
    this.setData({
      Modalflag: true,
      regionicon: 'triangleupfill',
      demandflag: true,
      munitem: val
    })
    pageScrollTo(0, 1000);
    if (val == "不限") {
      let val = '';
      this.request(val);
    } else {
      this.request(val);
    }

  },
  onChange(e) {
    //console.log(e.detail, 'click right menu callback data')
  },
  //页面滚动执行方式
  onPageScroll(e) {
    //console.log(e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop
    })
    if (e.scrollTop >= 200) {
      this.setData({
        fixedflag: false
      })
    } else if (e.scrollTop < 200) {
      this.setData({
        fixedflag: true
      })
    }
  },
  Seedels(e) {
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

  request(val) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    this.setData({
      demandflag: true,
    })
    wx.request({
      url: url + '/demand/getDemands',
      data: {
        accessToken: accessToken,
        city: val
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let demand = res.data.data;
        if (res.data.success) {
          setTimeout(()=>{
            this.setData({
              demandflag: false,
              demand: demand,
              municipal: [],
            })
          },1000)  
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let val = "";
    this.request(val);
    let demand = this.data.demand;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    setTimeout(() => {
      this.setData({
        demandflag: false,
        tiptxt: '目前没有数据',
      })
    }, 8000)
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
    //wx.startPullDownRefresh();
    // setTimeout(() => {
    //   wx.stopPullDownRefresh()
    // }, 3000)
    let val = "";
    this.request(val);
    let color = ['red', 'cyan', 'yellow', 'green', 'mauva', 'blue', 'orange', 'olive', 'purple', 'mauve', 'pink', 'brown'];
    let coloritem = color[Math.floor(Math.random() * 10)]



    // 定义存放生成随机数的数组 
    var array = new Array();
    // 循环N次生成随机数 
    for (var i = 0; ; i++) {
      // 只生成10个随机数 
      if (array.length < 10) {
        generateRandom(10);
      } else {
        break;
      }
    }
    // 循环遍历随机数数组 
    for (var i = 0; i < array.length; i++) {
      console.log(color[array[i]])
    }
    // 生成随机数的方法 
    function generateRandom(count) {
      var rand = parseInt(Math.random() * count);
      for (var i = 0; i < array.length; i++) {
        if (array[i] == rand) {
          return false;
        }
      }
      array.push(rand);
    } 
    console.log(array)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /* 用户点击右上角分享*/
  onShareAppMessage() {
    return {
      title: '御材劳务平台',
      imageUrl: '/images/YuCai.jpg',
      path: '/pages/index/index'
    }
  }
})