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

//区域配置
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
    iconList: [{
        icon: 'newsfill',
        color: '#fbbd08',
        badge: 1,
        name: 'case',
        title: '成功案例'
      }, {
        icon: 'order',
        color: '#8dc63f',
        badge: 150,
        title: '最新订单',
        name: 'order',
      }, {
        icon: 'news',
        color: '#1cbbb4',
        badge: 1,
        name: 'news',
        title: '新闻资讯'
      }, {
        icon: 'sort',
        color: '#e54d42',
        badge: 1,
        name: 'hot',
        title: '热门榜单'
      },
      {
        title: '劳务政策',
        name: 'policy',
        color: '#a5673f',
        badge: 0,
        icon: 'file'
      },
      {
        title: '平台培训',
        name: 'train',
        color: '#39b54a',
        badge: 0,
        icon: 'group'
      },
      {
        title: '全部',
        name: 'whole',
        color: '#0081ff',
        badge: 0,
        icon: 'cascades'
      }
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
    demand: [],
    page: 2,
    loadflag:true
  },

  //菜单跳转
  sendjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    // if (name == "whole") {
    //   navigateTo('/pages/classify/home/home')
    // } else {
    //   pagesurl(name, title)
    //   //showToast('即将上线，敬请期待!', 'none', 3000)
    // }
    //pagesurl(name, title)
    showToast('即将上线，敬请期待!', 'none', 1000)
  },

  //平台显示各用户发布的需求
  request(val, fly, page) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    if (page <= 1) {
      this.setData({
        demandflag: true,
      })
      wx.request({
        url: url + '/demand/getDemands',
        data: {
          accessToken: accessToken,
          city: val,
          modifly: fly,
          page: page,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          let demand = res.data.data;
          console.log(demand)
          if (res.data.success) {
            if (demand.length != 0) {
              console.log(demand.length)
              setTimeout(() => {
                this.setData({
                  demandflag: false,
                  demand: demand,
                  municipal: [],
                  loadflag: true,
                  tiptxt: '我也是有底线的',
                })
              }, 1000)
            } else {
              console.log(demand.length)
              setTimeout(() => {
                this.setData({
                  demandflag: false,
                  demand: demand,
                  loadflag: false
                })
              }, 1000)
            }

          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        },
      })
    } else {
      wx.request({
        url: url + '/demand/getDemands',
        data: {
          accessToken: accessToken,
          city: val,
          modifly: fly,
          page: page
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          let demands = res.data.data;
          let demand = this.data.demand;
          if (res.data.data.length != 0) {
            if (res.data.success) {
              if (res.data.data.length != 0) {
                showLoading();
                demand.push(...demands)
                setTimeout(() => {
                  this.setData({
                    demandflag: false,
                    demand: demand,
                    municipal: [],
                    loadflag: true,
                    tiptxt: '我也是有底线的',
                  })
                }, 1000)
              }
            } else {
              showToast(res.data.msg, 'none', 1000)
            }
          } else {
            showToast('我也是有底线的', 'none', 1000)
          }
        },
      })
    }

  },

  //最新、推荐跳转
  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    let val = "";
    let page = 1;
    if (TabCurs == 1) {
      this.setData({
        TabCur: TabCurs,
        demandflag: true,
      })
      let fly = '0';
      this.request(val, fly, page);
    } else {
      //showToast('即将上线，敬请期待!', 'none', 3000)
      this.setData({
        TabCur: TabCurs,
        demandflag: true,
      })
      let fly = '1';
      this.request(val, fly, page);
    }
  },

  //区域选择展开，关闭
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
      }, 1000)
      pageScrollTo(0, 1000);
    }
  },

  //区域选择
  bindChange: function(e) {
    let val = e.detail.value
    let ind = val[0];
    this.setData({
      province: this.data.provinces[val[0]],
    })
  },

  //省选择
  proChange(e) {
    let val = e.currentTarget.dataset.target;
    let arr = this.data.provinces;
    let ind = fiflet(arr, val);
    this.setData({
      provinceflag: true,
      municipal: this.data.municipals[ind],
    })
  },

  //市选择
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
    let TabCurs = this.data.TabCur;
    let page = 1;
    if (TabCurs == 1 && val == "不限") {
      let val = '';
      let fly = '';
      this.request(val, fly, page);
    } else if (TabCurs == 2) {
      let fly = '1';
      this.request(val, fly, page);
    }

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

  //详情跳转
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    let jobName = e.currentTarget.dataset.target.jobName;
    //console.log(demandId);
    showLoading();
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: '/pages/demand/trans/trans?demandId=' + demandId + '&jobName=' + jobName,
    //   });
    // }, 3100)
    wx.navigateTo({
        url: '/pages/demand/trans/trans?demandId=' + demandId + '&jobName=' + jobName,
      });
  },

  onLoad: function(options) {
    let val = "";
    let fly = "";
    let page = 1;
    this.request(val, fly, page);
    //let demand = this.data.demand;
  },

  onReady: function() {
    // setTimeout(() => {
    //   this.setData({
    //     demandflag: false,
    //     tiptxt: '我也是有底线的',
    //   })
    // }, 8000)
  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  //页面数据刷新
  TabCur(page) {
    let TabCurs = this.data.TabCur;
    let val = "";
    if (TabCurs == 1) {
      let fly = '';
      this.request(val, fly, page);
    } else if (TabCurs == 2) {
      let fly = '1';
      this.request(val, fly, page);
    }
  },

  onPullDownRefresh: function() {
    let page = 1;
    this.setData({
      demandflag: false,
      demand: [],
      page: 2
    })
    this.TabCur(page)

  },

  onReachBottom: function() {
    let page = this.data.page++;
    this.TabCur(page)
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