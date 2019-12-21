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
    SeaBar: '10vh',
    CityBar: '',
    iconList: app.globalData.iconList,
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
    colflag: true,
  },

  //页面滚动执行方式
  onPageScroll(e) {
    //console.log(e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop
    })
    if (e.scrollTop > 200) {
      this.setData({
        fixedflag: false,
        SeaBar: '',
        CityBar: '10vh',
        colflag: false,
      })
    } else if (e.scrollTop < 200) {
      this.setData({
        fixedflag: true,
        SeaBar: '10vh',
        CityBar: '',
        colflag: true,
      })
    }
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
    console.log('searchval:', searchval, TabCurs, page)
    if (searchval != undefined && searchval != '') {
      this.setData({
        search: searchval,
        demandflag: true,
      })
      this.TabCur(page, searchval, TabCurs);
    } else {
      showToast("搜索内容不能为空", "none", 3000)
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
    let page = 1;
    let search = "";
    pageScrollTo(0, 1000);
    this.setData({
      demandflag: true,
      TabCur: TabCurs,
      loadplay: false,
      demand: [],
      munitem: '区域',
      page: 2,
      searchval: ''
    })
    this.TabCur(page, search, TabCurs);
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
    let page = 1;
    let search = "";
    console.log(val)
    this.setData({
      Modalflag: true,
      regionicon: 'triangleupfill',
      demandflag: true,
      munitem: val
    })
    pageScrollTo(0, 1000);
    let TabCurs = this.data.TabCur;
    console.log(val, TabCurs)
    if (TabCurs == 1 && val == "不限") {
      let val = '';
      let fly = '';
      this.request(val, fly, search, page);
    } else if (TabCurs == 2 && val == "不限") {
      let val = '';
      let fly = '1';
      this.request(val, fly, search, page);
    } else if (TabCurs == 1) {
      let fly = '0';
      this.request(val, fly, search, page);
    } else if (TabCurs == 2) {
      let fly = '1';
      this.request(val, fly, search, page);
    }
  },

  //详情跳转
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    navigateTo('/pages/demand/trans/trans?demandId=' + demandId);
  },

  //页面数据刷新
  TabCur(page, search, TabCurs) {
    let val = "";
    if (TabCurs == 1) {
      let fly = '';
      this.request(val, fly, search, page);
    } else if (TabCurs == 2) {
      let fly = '1';
      this.request(val, fly, search, page);
    }
  },

  //当前页page 推荐modifly 城市city
  //平台显示各用户发布的需求(page为1)
  pageres1(val, fly, search, page, token) {
    console.log('val:', val, 'fly:', fly, 'search:', search, 'page:', page)
    wx.request({
      url: url + '/demand/getDemands',
      data: {
        accessToken: token,
        city: val,
        modifly: fly,
        search: search,
        page: page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let demand = res.data.data;
        console.log(demand, demand.length)
        if (res.data.success) {
          if (demand.length != 0) {
            setTimeout(() => {
              this.setData({
                demandflag: false,
                demand: demand,
                municipal: [],
                tiptxt: '我也是有底线的',
                loadflag: true
              })
            }, 800)
          } else {
            console.log(demand.length)
            setTimeout(() => {
              this.setData({
                demandflag: false,
                demand: demand,
                loadflag: false
              })
            }, 800)
          }
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      },
    })


  },

  //平台显示各用户发布的需求(page++)
  pageres2(val, fly, search, page, token) {
    console.log('val:', val, 'fly:', fly, 'search:', search, 'page:', page)
    wx.request({
      url: url + '/demand/getDemands',
      data: {
        accessToken: token,
        city: val,
        modifly: fly,
        search: search,
        page: page
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let demands = res.data.data;
        console.log(demands);
        let demand = this.data.demand;
        if (res.data.data.length != 0) {
          if (res.data.success) {
            if (demands.length != 0) {
              showToast('加载数据中...', 'none', 1000);
              demand.push(...demands)
              setTimeout(() => {
                this.setData({
                  demandflag: false,
                  demand: demand,
                  municipal: [],
                  loadflag: true,
                  loadplay: false,
                })
              }, 1500)
            }
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        } else {
          this.setData({
            tiptxt: '我也是有底线的',
            loadplay: true,
          })
          showToast('我也是有底线的', 'none', 2000)
        }
      },
    })
  },

  //平台显示各用户发布的需求
  request(val, fly, search, page) {
    let token = wx.getStorageSync('accessToken') || [];
    if (page <= 1) {
      this.pageres1(val, fly, search, page, token)
    } else {
      this.pageres2(val, fly, search, page, token)
    }
  },

  onLoad: function(options) {
    let val = "";
    let fly = "";
    let search = "";
    let page = 1;
    this.request(val, fly, search, page)
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
    let search = "";
    let TabCurs = this.data.TabCur;
    this.setData({
      demandflag: true,
      demand: [],
      page: 2,
      loadplay: false,
    })
    this.TabCur(page, search, TabCurs)
  },

  onReachBottom: function() {
    let page = this.data.page++;
    let search = this.data.search;
    let TabCurs = this.data.TabCur;
    if (search == undefined) {
      let search = '';
      this.TabCur(page, search, TabCurs)
    } else {
      this.TabCur(page, search, TabCurs)
    }
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