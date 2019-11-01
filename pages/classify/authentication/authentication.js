// pages/classify/authentication/authentication.js
const {
  $Toast
} = require('../../../colorui/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    companyNick: '',
    idNumber: '',
    legalName: '',
    mobile: ''
  },
  url(name, title, cur) {
    wx.navigateTo({
      url: '/pages/classify/' + name + '/' + name + '?title=' + title + '&&cur=' + cur,
    });
  },
  Toast(tit, icon, timer) {
    $Toast({
      content: tit,
      type: icon,
      duration: timer
    });
  },
  formSubmit(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let companyNick = e.detail.value.companyNick;
    let idNumber = e.detail.value.idNumber;
    let legalName = e.detail.value.legalName;
    let code = e.detail.value.code;
    let mobile = e.detail.value.mobile;
    if (legalName == "" || idNumber == "" || companyNick == "" || mobile == "") {
      this.Toast('请输入完整信息！', 'warning', 3)
    } else {
      //console.log(e.detail.value);
      wx.request({
        url: 'http://192.168.101.7:81/company/companyCertification/add',
        method: 'post',
        data: {
          companyNick: companyNick,
          idNumber: idNumber,
          legalName: legalName,
          mobile: mobile,
          accessToken: accessToken,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.success) {
            this.Toast(res.data.data, 'success', 3)
            setTimeout(() => {
              this.url('certification', '认证信息', 2)
            }, 3500)
          } else {
            this.Toast(res.data.msg, 'warning', 3)
          }
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 3000
    })
    this.setData({
      title: options.title
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