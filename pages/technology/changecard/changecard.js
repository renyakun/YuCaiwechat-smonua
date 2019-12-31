// pages/technology/changecard/changecard.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  pageScrollTosel,
} from '../../../utils/WeChatfction';
Page({
  data: {
    InputBottom: 0,
    chkflag: true,
    check: true,
    flagtxt: '已开启',
    showflag: false,
    realName: '',
    sex: '',
    dreamPosition: '',
    mobile: '',
    email: '',
    age: '',
    imgList: [],
  },

  //获取名片详情
  reqchkflag(flagnum) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    wx.request({
      url: url + '/technology/changeMyBusinessCard',
      data: {
        accessToken: accessToken,
        flag: flagnum
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        //console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 1000)
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //名片开关
  checkflag(e) {
    let flag = e.detail.value;
    if (flag) {
      this.setData({
        chkflag: flag,
        flagtxt: '已开启'
      })
      this.reqchkflag(1);
    } else {
      this.setData({
        chkflag: flag,
        flagtxt: '已关闭'
      })
      this.reqchkflag(0);
    }
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
        //console.log(res.tempFilePaths[0])
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
    let age = e.detail.value.age;
    let profession = e.detail.value.profession;
    let education = e.detail.value.education;
    let graduationTime = e.detail.value.graduationTime;
    let school = e.detail.value.school;
    let experience = e.detail.value.experience;
    let label = e.detail.value.label;
    let description = e.detail.value.description;
    let avatar = this.data.imgbase;
    if (realName == "" || sex == "" || dreamPosition == "" || mobile == "" || email == "" || age == "") {
      showToast('请输入完整信息！', 'none', 1000)
    } else {
      console.log(realName, age, sex, dreamPosition, mobile, email, profession, education, graduationTime, school, experience, label, description);
      wx.request({
        url: url + '/technology/updateMyBusinessCard',
        method: 'post',
        data: {
          avatar: avatar,
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
          console.log(res.data.data)
          if (res.data.success) {
            showToast(res.data.data, 'success', 800);
            setTimeout(() => {
              navigateTo('/pages/technology/card/card');
            }, 1000)
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        }
      })
    }
  },

  onLoad: function(options) {

  },

  onReady: function() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      let token = wx.getStorageSync('accessToken') || [];
      wx.request({
        url: url + '/technology/getMyBusinessCard',
        data: {
          accessToken: token,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res.data.data)
          let realName = res.data.data.realName;
          let dreamPosition = res.data.data.dreamPosition;
          let email = res.data.data.email;
          let mobile = res.data.data.mobile;
          let age = res.data.data.age;
          let profession = res.data.data.profession;
          let education = res.data.data.education;
          let graduationTime = res.data.data.graduationTime;
          let school = res.data.data.school;
          let experience = res.data.data.experience;
          let label = res.data.data.label;
          let description = res.data.data.description;
          let avatar = res.data.data.avatar;
          let img = 'imgList[0]';
          if (res.data.success) {
            wx.hideLoading();
            if (res.data.data.sex == "男") {
              this.setData({
                check: true,
              })
            } else if (res.data.data.sex == "女") {
              this.setData({
                check: false,
              })
            }
            this.setData({
              realName: realName,
              dreamPosition: dreamPosition,
              email: email,
              mobile: mobile,
              age: age,
              profession: profession,
              education: education,
              graduationTime: graduationTime,
              school: school,
              experience: experience,
              label: label,
              description: description,
              [img]: avatar
            })
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        }
      })
      wx.request({
        url: url + '/technology/checkMyBusinessCard',
        data: {
          accessToken: token,
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          //console.log(res)
          if (res.data.success) {
            wx.hideLoading();
            if (res.data.data) {
              this.setData({
                chkflag: res.data.data,
                flagtxt: '已开启'
              })
            } else {
              this.setData({
                chkflag: res.data.data,
                flagtxt: '已关闭'
              })
            }
          } else {
            showToast(res.data.msg, 'none',1000)
          }
        }
      })
    }, 1000)

    

  },


  onShow: function() {

  },

  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {
    this.onReady()
    wx.stopPullDownRefresh();
  },


  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})