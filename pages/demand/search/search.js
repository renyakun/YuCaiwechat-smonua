// pages/demand/search/search.js
const {
  province,
  municipal
} = require('../../../utils/city.js');

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
} from '../../../utils/WeChatfction';

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
    TabCur: 1,
    regionicon: 'triangleupfill',
    navlist: app.globalData.navlist,
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
    loadflag: true,
    loadplay: false,
    searchval: '',
  },

  //页面滚动执行方式
  onPageScroll(e) {
    //console.log(e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  // 清空搜索框内容
  clearInput() {
    this.setData({
      searchval: "",
    })
  },

  //搜索内容
  searchput(e) {
    console.log(e.detail.value);
    this.setData({
      searchval: e.detail.value,
    })
  },

  //搜索获取
  searchbtn(e) {
    // 获取搜索框内容 btnitem
    let searchval = e.currentTarget.dataset.target;
    let TabCurs = this.data.TabCur;
    let page = 1;
    let city = this.data.munitem;
    if (city == '区域') {
      city = '';
    } else {
      city = this.data.munitem;
    }
    console.log('searchval:', searchval, TabCurs, page)
    if (searchval != undefined && searchval != '') {
      this.setData({
        searchval: searchval,
        demandflag: true,
      })
      this.city(TabCurs, city, searchval, page)
    } else {
      showToast("搜索内容不能为空", "none", 1000)
    }
  },

  //菜单跳转
  sendjump(e) {
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    showToast('即将上线，敬请期待!', 'none', 1000)
  },

  //最新、推荐跳转
  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    let Modalflag = this.data.Modalflag;
    let page = 1;
    let searchval = this.data.searchval;
    let city = this.data.munitem;
    if (city == '区域') {
      city = '';
    }else{
      city = this.data.munitem;
    }
    this.setData({
      Modalflag: true,
      regionicon: 'triangleupfill',
      demandflag: true,
      TabCur: TabCurs,
      loadplay: false,
      demand: [],
      //munitem: '区域',
      page: 2,
    })
    this.city(TabCurs, city, searchval, page)
  },

  //区域选择展开，关闭
  showRegion(e) {
    let Modalflag = this.data.Modalflag;
    if (Modalflag) {
      this.setData({
        Modalflag: !Modalflag,
        regionicon: 'triangledownfill',
      })
      pageScrollTo(0, 100);
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
      pageScrollTo(0, 100);
    }
  },

  //区域选择
  bindChange(e) {
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
    let city = e.currentTarget.dataset.target;
    let page = 1;
    let searchval = this.data.searchval;
    let TabCurs = this.data.TabCur;
    this.setData({
      Modalflag: true,
      regionicon: 'triangleupfill',
      demandflag: true,
      munitem: city
    })
    this.city(TabCurs, city, searchval, page)
  },

  city(TabCurs, city, searchval, page){
    if (TabCurs == 1 && city == "不限") {
      let city = '';
      let fly = '';
      this.request(city, fly, searchval, page);
    } else if (TabCurs == 2 && city == "不限") {
      let city = '';
      let fly = '1';
      this.request(city, fly, searchval, page);
    } else if (TabCurs == 1 && city != "不限") {
      let fly = '';
      this.request(city, fly, searchval, page);
    } else if (TabCurs == 2 && city != "不限") {
      let fly = '1';
      this.request(city, fly, searchval, page);
    }
  },

  //详情跳转
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    navigateTo('/pages/demand/trans/trans?demandId=' + demandId);
  },

  //获取平台显示各用户发布的需求
  demand(val, fly, searchval, page, token, website, list, txt) {
    console.log('city:', val, 'fly:', fly, 'searchval:', searchval, 'page:', page, txt)
    wx.request({
      url: url + website,
      data: {
        accessToken: token,
        city: val,
        modifly: fly,
        search: searchval,
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
                municipal: [],
                demandflag: false,
                loadflag: true
              })
            } else {
              this.setData({
                demandflag: false,
                loadflag: false,
                [list]: []
              })
            }
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        } else {
          let demands = res.data.data;
          console.log(txt, demands, demands.length, 'page:', page);
          let demand = this.data.demand;
          console.log('加载数据', txt, demand)
          if (demands.length != 0) {
            if (res.data.success) {
              if (demands.length != 0) {
                showToast('加载中...', 'loading', 500);
                demand.push(...demands)
                this.setData({
                  [list]: demand,
                  demandflag: false,
                  municipal: [],
                  loadflag: true,
                  loadplay: false,
                })
              } else {
                this.setData({
                  demandflag: false,
                  [dataflag]: false,
                  //tiptxt: '我也是有底线的',
                  //loadplay: true,
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
          }
        }
      }
    })
  },

  //平台显示各用户发布的需求
  request(val, fly, searchval, page) {
    let token = wx.getStorageSync('accessToken') || [];
    let demand = 'demand';
    let demandtxt = '用户发布的需求:demand:';
    let demandwebsite = '/demand/getDemands';
    setTimeout(() => {
      this.demand(val, fly, searchval, page, token, demandwebsite, demand, demandtxt)
    }, 500)
  },

  onLoad: function(options) {
    let val = "";
    let fly = "";
    let searchval = "";
    let page = 1;
    this.request(val, fly, searchval, page)
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
    let page = 1;
    let searchval = '';
    let TabCurs = this.data.TabCur;
    let city = '';
    this.setData({
      demandflag: true,
      demand: [],
      municipal: [],
      munitem: '区域',
      page: 2,
      loadplay: false,
    })
    this.city(TabCurs, city, searchval, page)
    wx.stopPullDownRefresh();
  },

  onReachBottom: function() {
    let city = this.data.munitem;
    if (city == '区域') {
      city = '';
    } else {
      city = this.data.munitem;
    }
    let page = this.data.page++;
    let searchval = this.data.searchval;
    let TabCurs = this.data.TabCur;
    this.city(TabCurs, city, searchval, page)
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