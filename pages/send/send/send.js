// pages/send/send.js
const app = getApp();
const {
  $Toast
} = require('../../../colorui/dist/base/index');
Page({
  /*页面的初始数据*/
  data: {
    CustomBar: app.globalData.CustomBar,
    list: [{
      name: 'shake',
      color: 'blue'
    }],
    iconList: [{
        icon: 'addressbook',
        name: 'certification',
        color: 'blue',
        badge: 0,
        title: '认证信息',
      }, {
        icon: 'vipcard',
        color: 'orange',
        name: 'authentication',
        badge: 0,
        title: '企业入驻'
      }, {
        icon: 'newsfill',
        color: 'yellow',
        badge: 1,
        name: 'case',
        title: '成功案例'
      }, {
        icon: 'order',
        color: 'olive',
        badge: 88,
        title: '最新订单',
        name: 'order',
      }, {
        icon: 'news',
        color: 'cyan',
        badge: 0,
        name: 'news',
        title: '新闻资讯'
      }, {
        icon: 'sort',
        color: 'red',
        badge: 0,
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
        title: '关于我们',
        name: 'about',
        color: 'cyan',
        badge: 0,
        icon: 'friendfill'
      },
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    send: '',
    phone: '',
    disabcode: false,
    disabput: false,
    disabsub: false,
    codetit: '验证码',
    codeNum: 60,
    cardCur: 0,
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
    lists: [{
      name: 'shake',
      color: 'mauve'
    }],
  },
  url(name, title, cur) {
    wx.navigateTo({
      url: '/pages/classify/' + name + '/' + name + '?title=' + title + '&&cur=' + cur,
    });
  },
  showModal(msg, name, title) {
    wx.showModal({
      title: '提示',
      content: msg,
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/classify/' + name + '/' + name + '?title=' + title,
          })
        } else if (res.cancel) {}
      }
    })
  },
  showToast(tit, icon, timer) {
    wx.showToast({
      title: tit,
      icon: icon,
      duration: timer
    })
  },
  sendjump(e) {
    let token = wx.getStorageSync('token') || {};
    let tokenflag = token.data.success;
    let tokenmsg = wx.getStorageSync('tokenmsg') || {};
    let msg = tokenmsg.data.msg;
    let name = e.currentTarget.dataset.target.name;
    let title = e.currentTarget.dataset.target.title;
    if (name == "certification" && tokenflag) {
      this.url(name, title, 1)
    } else if (name == "certification" && !tokenflag) {
      this.showModal('请先实名认证', 'RealName', '实名认证')
    } else if (name == "authentication" && msg == "您还未进行企业认证") {
      this.url(name, title)
    } else if (name == "authentication" && msg == "您还未进行实名认证，请先实名认证再企业认证") {
      this.showModal(tokenmsg.data.msg, 'RealName', '实名认证')
    } else if (name == "authentication" && msg == "成功") {
      this.showToast('您已企业认证！正在为您跳转认证信息', 'none', 2000)
      setTimeout(() => {
        this.url('certification', '认证信息', 2)
      }, 2500)
    } else {
      this.url(name, title)
      //this.showToast('即将上线，敬请期待!', 'none', 3000)
    }
  },
  release(e) {
    let token = wx.getStorageSync('token') || {};
    let tokenflag = token.data.success;
    let tokenmsg = wx.getStorageSync('tokenmsg') || {};
    let msg = tokenmsg.data.msg;
    if (!tokenflag && msg == "您还未进行实名认证，请先实名认证再企业认证") {
      this.showModal('您还未实名认证', 'RealName', '实名认证')
    } else if (tokenflag && msg == "您还未进行企业认证") {
      this.showModal('您还未进行企业认证', 'authentication', '企业入驻')
    } else {
      wx.navigateTo({
        url: '/pages/send/release/release',
      })
    }

  },
  animat() {
    let animatnav = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease-start',
      delay: 1000
    });
    let animatcon = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease-start',
      delay: 1000
    });
    animatnav.height('480rpx').opacity(1).step()
    animatcon.translate(0, 10).step()
    this.setData({
      aninav: animatnav.export(),
      anicon: animatcon.export(),
    })
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function(options) {
    let users = wx.getStorageSync('user') || [];
    // console.log(users);
    let tokens = wx.getStorageSync('token') || [];
    //console.log(token);
  },

  // 判定输入为非空字符
  formSubmit(e) {
    let send = e.detail.value.send;
    let phone = e.detail.value.phone;
    if (send == "" || phone == "") {
      wx.showToast({
        title: '请输入完整信息！',
        icon: 'none',
      })
    } else {
      let that = this;
      that.setData({
        animation: 'shake'
      })
      setTimeout(function() {
        that.setData({
          animation: ''
        })
      }, 1000)

      console.log(e.detail.value);

      wx.showToast({
        title: send + ',' + phone,
        icon: 'none',
      })

    }
  },

  telNum(e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
      this.setData({
        disabcode: checkedNum,
      })
    } else {
      this.setData({
        disabcode: false,
      })
    }
  },

  checkPhoneNum(dataNumber) {
    let str = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (str.test(dataNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none',
      })
      return false
    }
  },

  codetxt(e) {
    this.setData({
      disabput: true
    })
    setTimeout(() => {
      wx.showToast({
        title: Math.random().toString().slice(-6),
        icon: 'none',
        duration: 5000
      })
    }, 1000)
    let codeNum = this.data.codeNum;
    let timer = setInterval(() => {
      codeNum--;
      this.setData({
        codetit: codeNum + '秒',
        disabcode: false
      })
      if (codeNum == 0) {
        clearInterval(timer);
        this.setData({
          codetit: '验证码',
          disabcode: true
        })
      }
    }, 1000);
  },

  codeNum(e) {
    console.log(e.detail.value)
    let codeNumber = e.detail.value;
    if (codeNumber.length === 6) {
      this.setData({
        disabsub: true
      })
    } else {
      this.setData({
        disabsub: false
      })
    }
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


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
    wx.stopPullDownRefresh()
    console.log("13423")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})