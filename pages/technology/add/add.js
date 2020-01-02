// pages/technology/add/add.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  pageScrollTosel,
  switchTab,
  navigateTo,
  urlTobase64,
} from '../../../utils/WeChatfction';
const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    showflag: false,
    realName: '',
    sex: '',
    dreamPosition: '',
    mobile: '',
    email: '',
    age: '',
    check: true,
    imgList: [],
  },

  //更多信息
  dishow() {
    this.setData({
      showflag: true
    })
    pageScrollTosel('.showcard', 1000)
  },

  //图片路径转base64
  getFileSystemManager(url) {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        let base64 = 'data:image/png;base64,' + res.data;
        this.setData({
          imgbase: base64
        })
      }
    })
  },

  //获取图片
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log(res.tempFilePaths[0])
        this.getFileSystemManager(res.tempFilePaths[0])
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  //删除图片
  DelImg(e) {
    wx.showModal({
      //title: '召唤师',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  //判断
  formSubmit(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let realName = e.detail.value.realName;
    let sex = e.detail.value.sex;
    let dreamPosition = e.detail.value.dreamPosition;
    let mobile = e.detail.value.mobile;
    let email = e.detail.value.email;
    let age = parseInt( e.detail.value.age);
    let profession = e.detail.value.profession;
    let education = e.detail.value.education;
    let graduationTime = e.detail.value.graduationTime;
    let school = e.detail.value.school;
    let experience = e.detail.value.experience;
    let label = e.detail.value.label;
    let description = e.detail.value.description;
    let imgList = this.data.imgList;
    let imgbase = this.data.imgbase;
    let avatar ='';
    if (imgbase != undefined){
      avatar = imgbase;
    }else{
      avatar = imgList[0];
    }
    //console.log(avatar, realName, age, sex, dreamPosition, mobile, email, profession, education, graduationTime, school, experience, label, description);
    console.log( realName, age, sex, dreamPosition, mobile, email);
    if (realName == "" || age == ""  || sex == "" || dreamPosition == "" || mobile == "" || avatar == undefined) {
      showToast('请输入完整信息！', 'none', 1000)
    } else {
      wx.request({
        url: url + '/technology/add',
        method: 'post',
        data: {
          avatar:avatar,
          realName: realName,
          sex: sex,
          dreamPosition: dreamPosition,
          mobile: mobile,
          email: email,
          age: age,
          profession: profession,
          education: education,
          graduationTime: graduationTime,
          school: school,
          experience: experience,
          label: label,
          description: description,
          accessToken: accessToken,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          showToast(res.data.success, 'none', 1000)
          if (res.data.success) {
            showToast(res.data.data, 'success', 800)
            setTimeout(()=>{
              navigateTo('/pages/technology/card/card?falg=falg')
            },1000)          
          } else {
            showToast(res.data.msg, 'none', 1000);
          }
        }
      })
    }
  },

  //重置
  formReset(e) {
    console.log('form发生了reset事件')
    this.setData({
      check: true
    })
  },

  //重置
  reset() {
    this.setData({
      realName: '',
      sex: '',
      dreamPosition: '',
      mobile: '',
      email: '',
      age: '',
      check: true,
      imgList: [],
    })
  },

  teltap() {
    console.log("123456")
    wx.chooseLocation({
      success(res) {
        console.log(res.address)
      }
    })

  },


  onLoad: function(options) {},


  onReady: function() {
   showToast('正在获取头像...','loading',500)
    setTimeout(() => {
      let avatarUrl = wx.getStorageSync('unionId').avatarUrl || '';
      //console.log(avatarUrl)
      let img = 'imgList[0]'
      this.setData({
        [img]: avatarUrl
      })
    }, 800)
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
    wx.stopPullDownRefresh();
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