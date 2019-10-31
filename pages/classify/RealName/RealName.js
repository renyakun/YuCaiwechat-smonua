// pages/classify/RealName/RealName.js
const {
  $Toast
} = require('../../../colorui/dist/base/index');
Page({
  /*页面的初始数据*/
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    realName: '',
    mobile: '',
    idCard: '',
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
    let realName = e.detail.value.realName;
    let mobile = e.detail.value.mobile;
    let idCard = e.detail.value.idCard;
    let code = e.detail.value.code;
    if (realName == "" || mobile == "" || idCard == "") {
      this.Toast('请输入完整信息！', 'warning', 3)
    } else {
      console.log(e.detail.value);
      wx.request({
        url: 'http://192.168.101.7:81/user/UserCertification/add',
        method: 'post',
        data: {
          realName: realName,
          mobile: mobile,
          idCard: idCard,
          code: code,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.success) {
            wx.setStorageSync('mobile', mobile)
            this.Toast('认证成功', 'success', 3)
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }, 500)
          } else {
            this.Toast(res.data.msg, 'warning', 3)
          }
        }
      })
    }
  },

  username(e) {
    let user = e.detail.value;
    if (user.length === 5) {
      let checkeduser = this.checkusername(user)
      // this.setData({
      //   disabcode: checkedNum,
      // })
      console.log(user)
    } else {
      // this.setData({
      //   disabcode: false,
      // })
      //console.log(user)
    }
  },

  checkusername(datauser) {
    let str = /^[\u4e00-\u9fa5]{2,5}$/;
    if (str.test(datauser)) {
      return true
    } else {
      wx.showToast({
        title: '请输入中文',
        icon: 'none',
      })
      return false
    }
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function(options) {
    //this.Toast('加载中', 'loading', 3)
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