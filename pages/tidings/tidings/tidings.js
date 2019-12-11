// pages/tidings/tidings/tidings.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
<<<<<<< HEAD
  showLoading,
} from '../../../utils/WeChatfction';
Page({
  data: {
    // 邀请消息数据
    messageList:[],

    newslist: [{
      id: 1,
      img: '../../../images/icon/notice.png',
      con: '投递邀请通知',
=======
  setBarTitle,
  setBarColor,
} from '../../../utils/WeChatfction';
Page({
  data: {
    newslist: [{
      id: 1,
      img: '../../../images/icon/notice.png',
      con: '评价消息通知',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      tit: '暂无消息',
      notice: '2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;',
      icon: 'infofill',
      timer: '',
      badge: 6,

    }, {
      id: 2,
      img: '../../../images/icon/see.png',
<<<<<<< HEAD
      con: '面试邀请通知',
=======
      con: '今日暂无查看',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      tit: '暂无劳务查看',
      notice: '2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;',
      icon: '',
      timer: '',
      badge: 7,
    }, {
      id: 3,
      img: '../../../images/icon/subscribe.png',
<<<<<<< HEAD
      con: '评论消息通知',
=======
      con: '订阅消息',
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
      tit: '暂无订阅消息',
      notice: '2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;',
      icon: 'infofill',
      timer: '',
      badge: 8,
<<<<<<< HEAD
    },]
  },
  
=======
    }, {
      id: 4,
      img: '../../../images/YuCai.jpg',
      con: '御材劳务官方助手',
      tit: '暂无消息',
      notice: '2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;',
      icon: '',
      timer: '22:20',
      badge: 9,
    }]
  },
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

<<<<<<< HEAD
  
  
  // 点击消息框,查看按钮,实现跳转
  cussjump(e){
    let id = parseInt(e.currentTarget.dataset.id);
    // let demandId = e.currentTarget.dataset.target.demandId;
    // let jobName = e.currentTarget.dataset.target.jobName;
    //console.log(demandId);
    console.log(id);
    showLoading();
    setTimeout(() => {
      console.log(id);
      switch (id) {
        case 1:
          //消息详情页
          wx.navigateTo({
            url: '/pages/tidings/messageInfo/messageInfo?id=1',
          });
        case 2: //面试邀请(待面试)
          wx.navigateTo({
            url: '/pages/record/record/record?id=2',
          });
        case 3: //评论消息
          wx.navigateTo({
            url: '/pages/record/record/record?id=3',
          });
        default:;
      }
        
      
    }, 1100)
    // navigateTo('/pages/tidings/discuss/discuss')
  },

  // 清空数据评论消息的数据
  emptytap(e){
    let id = parseInt(e.currentTarget.dataset.target)-1;
    console.log(e.currentTarget.dataset.target);
    let badge = `newslist[${id}].badge` ;
    let notice = `newslist[${id}].notice`;
=======
  cussjump(){
    navigateTo('/pages/tidings/discuss/discuss')
  },
  emptytap(){
    let badge = 'newslist[0].badge';
    let notice = 'newslist[0].notice';
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
    this.setData({
      [notice]: '',
      [badge]: 0
    })
  },
<<<<<<< HEAD



  // 请求投递邀请消息数据,设置消息条数显示
  request() {
    let accessToken = wx.getStorageSync('accessToken') || [];
    // 发送请求,获取后台数据
    wx.request({
      url: url + '/technology/myAcceptDemands',
      data: {
        accessToken: accessToken,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // this.setData({
        //   messageList: res.data.data
        // })
        console.log(res)
        if(res.data.success){
          // let badge = 'newslist[4].badge';
          // this.setData({
          //   [badge]: res.data.data.length
          // })
        }else{
          showToast(res.data.msg,'none',1000)
        }
      }
    })
  },

  onLoad: function(options) {
    this.request();
=======
  onLoad: function(options) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/invitation/myAcceptEvaluation',
      data: {
        accessToken: accessToken,
      },
      success: res => {
        //console.log(res)
        if (res.data.success) {
          //console.log(res.data.data)
          let data = res.data.data;
          let badge = 'newslist[0].badge';
          let notice = 'newslist[0].notice';
          let timer = 'newslist[0].timer';
          this.setData({
            [badge]: data.length,
            [notice]: data[0].evaluationName + ' : ' + data[0].message,
            [timer]: data[0].createTime
          })
        } else {
          showToast(res.data.msg, 'none', 3000)
        }
      }
    })

    setBarColor('#ffffff', '#0081ff', 1500, 'ease');
    setBarTitle('消息');
>>>>>>> 167149cb57bd56aa97be79041d3f31f617cbe609
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
    this.onLoad()
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