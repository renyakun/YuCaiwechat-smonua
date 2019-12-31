// pages/technology/mycard/card.js
//获取应用实例
const app = getApp()
var ctx = ""
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  switchTab,
  navigateTo,
} from '../../../utils/WeChatfction';

Page({
  data: {
    InputBottom: 0,
    demandflag: true,
    url: ''
  },

  //跳转修改
  techjump(e) {
    navigateTo('/pages/technology/changecard/changecard');
  },

  //关闭模拟框
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  // 获取屏幕宽高
  getDevInfo() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          canvasWidth: res.windowWidth,//设置宽高为屏幕宽，高为屏幕高减去50
          canvasHeight: res.windowHeight
        })
      },
    })
  },


  //图片路径转base64
  getFileSystemManager(url) {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        let base64 = 'data:image/png;base64,' + res.data;
        console.log(base64);
          this.setData({
            imgavatar: base64
          })
      }
    })
  },

  //生成海报
  tapjump(e) {
    showToast('正在生成...', 'loading', 2000);
    let that = this;
    let avatar = this.data.avatar;
    console.log(avatar);
    //this.getFileSystemManager(avatar);
    console.log(this.data.age);
    setTimeout(()=>{
      console.log(this.data.imgavatar);
    },1000)
    // 获取到当前用户信息
    // let userInfo = this.data;
    // let promise = new Promise((resolve, reject) => {
    //   wx.downloadFile({
    //     url: avatar, //仅为示例，并非真实的资源
    //     success: function (res) {
    //       // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //       if (res.statusCode === 200) {
    //         wx.playVoice({
    //           filePath: res.tempFilePath
    //         })
    //         let filePath = res.tempFilePath;
    //         console.log("ok")
    //         resolve(filePath);
    //       }
    //     }
    //   })

    // });
    // promise.then(res => {
    //   console.log(res);
    //   let data = { user: userInfo, avarUrl: res }
    //   this.canvansWrite(data);
    //   setTimeout(function () {
    //     that.previewImg();
    //   }, 3500)
    // }, err => {
    //   console.log(err)
    // })
    // 绘制画布

  },

  // 绘制画布实现
  canvansWrite(user) {

    let that = this;
    // 1.获取屏幕宽高
    console.log(this.data);
    // 2.获取头像的地址
    let aver = user.avarUrl;
    console.log(aver);

    // 3.画布的参数
    const data = {
      x: 0,
      y: 0,
      wid: that.data.canvasWidth,
      height: that.data.canvasHeight
    }
    // 4.开始绘制
    ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage('/images/bgcimg.png', data.x, data.y, data.wid, data.height)
    // ctx.draw()

    // 5.绘制头像
    let avatarurl_width = data.wid * 0.2, //绘制的头像宽度
      avatarurl_heigth = data.wid * 0.2, //绘制的头像高度
      avatarurl_x = data.wid / 2 - avatarurl_width / 2, //绘制的头像在画布上的位置
      avatarurl_y = 36;
    ctx.save();

    ctx.beginPath();
    ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(aver, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
    ctx.restore();

    // 6.绘制用户名称
    let nickName = user.user.realName;
    console.log(nickName);
    let nickLen = nickName.toString().length;// 用户名长度
    let max_nickname_width = nickLen * 15;//一个汉字的宽度为15,获取文字总宽度

    ctx.setFillStyle('#ffffff'); // 文字颜色
    ctx.setFontSize(15); // 文字字号
    ctx.fillText(nickName, data.wid / 2 - max_nickname_width / 2, avatarurl_y + avatarurl_heigth + 20);
    ctx.font = 'normal 10px sans-serif';

    // 7.绘制描述文字
    let des = '扫码查看招聘需求';
    console.log(nickName);
    let desLen = des.toString().length;// 用户名长度
    let max_des_width = desLen * 15;//一个汉字的宽度为10,获取文字总宽度

    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(15);
    ctx.fillText(des, data.wid / 2 - max_des_width / 2, data.height * 0.6);
    ctx.font = 'normal 10px sans-serif';


    // 8.绘制二维码
    let twoImg_width = data.wid * 0.2, //绘制的二维码宽度
      twoImg_heigth = data.wid * 0.2, //绘制的二维码高度
      twoImg_x = data.wid / 2 - avatarurl_width / 2, //绘制的头像在画布上的位置
      twoImg_y = 36;
    ctx.save();   //
    ctx.beginPath();

    ctx.arc(avatarurl_width / 2 + avatarurl_x, data.height * 0.66 + twoImg_heigth / 2, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage('/images/TwoImg2.png', avatarurl_x, data.height * 0.66, avatarurl_width, avatarurl_heigth);
    ctx.restore();
    ctx.draw(false, function () {
      console.info('绘制成功');
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          quality: '1',
          success: function (res) {
            let tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath,
              hide_poster: false
            });
            console.log("图片下载到临时文件夹了")
          },
          fail: function (res) {
            console.log(res);
          }
        }, that);
      }, 6000);
    });
    //9.将canvas生成好的图片下载到临时文件夹

    // ctx.draw(false, function () {

    // });
  },

  //预览图片
  previewImg() {
    console.log(this.data.imagePath)
    if (this.data.imagePath) {
      //预览图片，预览后可长按保存或者分享给朋友
      wx.previewImage({
        urls: [this.data.imagePath]
      })
    }
  },


  request(token){
    setTimeout(() => {
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
          if (res.data.success) {
            let avatar = res.data.data.avatar;
            let realName = res.data.data.realName;
            let dreamPosition = res.data.data.dreamPosition;
            let email = res.data.data.email;
            let sex = res.data.data.sex;
            let age = res.data.data.age;
            let profession = res.data.data.profession;
            let education = res.data.data.education;
            let graduationTime = res.data.data.graduationTime;
            let school = res.data.data.school;
            let experience = res.data.data.experience;
            let label = res.data.data.label;
            let description = res.data.data.description;
            this.setData({
              avatar: avatar,
              realName: realName,
              dreamPosition: dreamPosition,
              email: email,
              sex: sex,
              age: age,
              profession: profession,
              education: education,
              graduationTime: graduationTime,
              school: school,
              experience: experience,
              label: label,
              description: description,
              demandflag: false,
            });
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        }
      })
    }, 500)
  },

  onLoad: function (options) {
    console.log(options);
    const scene = decodeURIComponent(options.scene);
    console.log(scene)
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type: 'client_credential',
        appid: 'wxbe95cfd0acd54a9d',
        secret: '3539452931531b21c7f8bbba88d4e7cd'
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data);
        console.log(res.data.access_token);
        let token = res.data.access_token;
        setTimeout(() => {
          wx.request({
            url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=token',
            //url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode',
            method: 'post',
            data: {
              //access_token: res.data.access_token,
              scene: scene,
              page:'pages/technology/card/card',
              //path:'pages/technology/card/card',
              //width:500
            },
            contentType: "application/json",
            responseType: 'arraybuffer',
            header: {
              "Content-Type": "application/json;charset=utf-8"
            },
            success: res => {
              console.log(res)
            }
          })
        }, 500)
      }
    })
  },

  onReady: function () {
    let token = wx.getStorageSync('accessToken') || [];
    this.request(token)
    this.getDevInfo();
  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {
    this.onReady()
    wx.stopPullDownRefresh();
  },

})