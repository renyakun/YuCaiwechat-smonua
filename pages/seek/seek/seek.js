// pages/seek/seek.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    VerticalNavTop: 0,
    scrollLeft: 0,
    TabCur: 0,
    list: [{
        name: 'A',
        id: 0
      }, {
        name: 'B',
        id: 1
      },
      {
        name: 'C',
        id: 2
      },
      {
        name: 'D',
        id: 3
      }, {
        name: 'E',
        id: 4
      },
      {
        name: 'F',
        id: 5
      },
      {
        name: 'G',
        id: 6
      }, {
        name: 'H',
        id: 7
      }, {
        name: 'I',
        id: 8
      },
      {
        name: 'J',
        id: 9
      },
      {
        name: 'k',
        id: 10
      }
    ],
    navnum: 10,
    tablist: [{
      id: 1,
      tabtit: '123无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 2,
      tabtit: '234无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 3,
      tabtit: '345无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 4,
      tabtit: '456无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 5,
      tabtit: '567无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 6,
      tabtit: '678无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }, {
      id: 7,
      tabtit: '789无意者 烈火焚身; 以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
      tabcon: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
      img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      tag1: '正义天使',
      tag2: '史诗',
    }]
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  navSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
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
  onPullDownRefresh: function() {},

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