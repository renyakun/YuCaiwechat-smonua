//index.js
const {
  province,
  municipal
} = require('../../utils/city.js');
<<<<<<< HEAD
const {
  url
} = require('../../utils/url.js');
=======

const {
  url
} = require('../../utils/url.js');

>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
import {
  showToast,
  pagesurl,
  fiflet,
  navigateTo,
  showLoading,
  pageScrollTo,
} from '../../utils/WeChatfction';

const app = getApp();
<<<<<<< HEAD

//区域配置
let provinces = [];
let municipals = [];
let label = [];
for (let i in province) {
  provinces.push(province[i]);
}
=======
let provinces = [];
let municipals = [];
let label = [];

for (let i in province) {
  provinces.push(province[i]);
}

>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
for (let i in municipal) {
  municipals.push(municipal[i]);
}

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
<<<<<<< HEAD
    iconList: [{
        icon: 'newsfill',
        color: '#fbbd08',
=======
    list: [{
      name: 'shake',
      color: 'blue'
    }],
    iconList: [{
        icon: 'newsfill',
        color: 'yellow',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        badge: 1,
        name: 'case',
        title: '成功案例'
      }, {
        icon: 'order',
<<<<<<< HEAD
        color: '#8dc63f',
=======
        color: 'olive',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        badge: 150,
        title: '最新订单',
        name: 'order',
      }, {
        icon: 'news',
<<<<<<< HEAD
        color: '#1cbbb4',
=======
        color: 'cyan',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        badge: 1,
        name: 'news',
        title: '新闻资讯'
      }, {
        icon: 'sort',
<<<<<<< HEAD
        color: '#e54d42',
=======
        color: 'red',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        badge: 1,
        name: 'hot',
        title: '热门榜单'
      },
      {
        title: '劳务政策',
        name: 'policy',
<<<<<<< HEAD
        color: '#a5673f',
=======
        color: 'red',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        badge: 0,
        icon: 'file'
      },
      {
        title: '平台培训',
        name: 'train',
<<<<<<< HEAD
        color: '#39b54a',
=======
        color: 'green',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
        badge: 0,
        icon: 'group'
      },
      {
        title: '全部',
        name: 'whole',
<<<<<<< HEAD
        color: '#0081ff',
        badge: 0,
        icon: 'cascades'
      }
=======
        color: 'blue',
        badge: 0,
        icon: 'cascades'
      },
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      this.setData({
        TabCur: TabCurs,
        demandflag: true,
      })
<<<<<<< HEAD
      let fly = '1';
      this.request(val, fly, page);
    }
  },

  //区域选择展开，关闭
=======
      let val = "";
      this.request(val);
    }
  },
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
      }, 1000)
=======
      }, 3000)
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      pageScrollTo(0, 1000);
    }
  },

<<<<<<< HEAD
  //区域选择
=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  bindChange: function(e) {
    let val = e.detail.value
    let ind = val[0];
    this.setData({
      province: this.data.provinces[val[0]],
    })
  },

<<<<<<< HEAD
  //省选择
=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  proChange(e) {
    let val = e.currentTarget.dataset.target;
    let arr = this.data.provinces;
    let ind = fiflet(arr, val);
    this.setData({
      provinceflag: true,
      municipal: this.data.municipals[ind],
    })
  },

<<<<<<< HEAD
  //市选择
=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD
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

=======
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
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
<<<<<<< HEAD

  //详情跳转
=======
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  Seedels(e) {
    let demandId = e.currentTarget.dataset.target.demandId;
    let jobName = e.currentTarget.dataset.target.jobName;
    //console.log(demandId);
    showLoading();
<<<<<<< HEAD
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

=======
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
=======
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
    // let color = ['red', 'cyan', 'yellow', 'green', 'mauva', 'blue', 'orange', 'olive', 'purple', 'mauve', 'pink', 'brown'];
    // let coloritem = color[Math.floor(Math.random() * 10)]



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

>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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