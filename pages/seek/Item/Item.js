// pages/seek/Item/Item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchtit: '',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let item = options.item;
    this.setData({
      searchtit: item
    })
    wx.request({
      url: 'http://192.168.101.7:81/search/name',
      data: {
        name: item
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.data)
      }
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