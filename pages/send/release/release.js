// pages/send/release/release.js
const {
  $Message,
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
    title: '',
    mobile: '',
    code: '',
  },
  Toast(tit, icon, timer) {
    $Toast({
      content: tit,
      type: icon,
      duration: timer
    });
  },
  // 判定输入为非空字符
  formSubmit(e) {
    let title = e.detail.value.title;
    let mobile = e.detail.value.mobile;
    let code = e.detail.value.code;
    if (title == "" || mobile == "" || code == "") {
      this.Toast('请输入完整信息！', 'warning', 3)
    } else {
      //console.log(e.detail.value);
      wx.request({
        url: 'http://192.168.101.7:81/demand/add',
        method: 'post',
        data: {
          title: title,
          mobile: mobile,
          code: code,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.success) {
            this.Toast('发布成功', 'success', 3)
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/index/index',
              })
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let mobile = wx.getStorageSync('mobile') || [];
    this.setData({
      mobile: mobile
    })
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