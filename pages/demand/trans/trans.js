// pages/demand/trans/trans.js
const {
  url
} = require('../../../utils/url.js');
var ctx = ""
import {
  showToast,
  navigateTo,
  pageScrollTo,
  pageScrollTosel,
  switchTab,
  makePhoneCall,
} from '../../../utils/WeChatfction';

import {
  formatTime
} from '../../../utils/util';

const app = getApp();

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 1,
    InputBottom: 0,
    scrollTop: 0,
    tranlist: app.globalData.tranlist,
    swiperList: ['https://image.weilanwl.com/gif/loading-1.gif', ],
    visible: false,
    actions: [{
      name: '去分享',
      icon: 'share',
      openType: 'share'
    }, {
      name: '生成海报分享',
      icon: 'share'
    }],
    avatar: '/../../images/timg.jpg'
  },

  touchmove() {
    return false;
  },

  // 获取屏幕宽高
  getDevInfo() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          canvasWidth: res.windowWidth, //设置宽高为屏幕宽，高为屏幕高减去50
          canvasHeight: res.windowHeight
        })
      },
    })
  },

  getBase64Data: function() {
    let str = this.data.imgavatar.toString();
    let str1 = str.substring(22);
    return str1;
  },

  //生成海报
  tapjump(e) {
    showToast('正在生成...', 'loading', 2000);
    let that = this;
    // 获取到当前用户信息
    let userInfo = this.data;
    let promise = new Promise((resolve, reject) => {
      const filePath = `${wx.env.USER_DATA_PATH}/temp_image.jpeg`;
      const buffer = wx.base64ToArrayBuffer(this.getBase64Data());
      wx.getFileSystemManager().writeFile({
        filePath,
        data: buffer,
        encoding: 'binary',
        success() {
          resolve(filePath);
        },
        fail() {
          reject(new Error('ERROR_BASE64SRC_WRITE'));
        },
      });
    });
    promise.then(res => {
      console.log(res);
      let data = {
        user: userInfo,
        avarUrl: res
      }
      this.canvansWrite(data);
      setTimeout(function() {
        that.previewImg();
      }, 3500)
    }, err => {
      console.log(err)
    })
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
    let nickLen = nickName.toString().length; // 用户名长度
    let max_nickname_width = nickLen * 15; //一个汉字的宽度为15,获取文字总宽度

    ctx.setFillStyle('#ffffff'); // 文字颜色
    ctx.setFontSize(15); // 文字字号
    ctx.fillText(nickName, data.wid / 2 - max_nickname_width / 2, avatarurl_y + avatarurl_heigth + 20);
    ctx.font = 'normal 10px sans-serif';

    // 7.绘制描述文字
    let des = '扫码查看招聘需求';
    console.log(nickName);
    let desLen = des.toString().length; // 用户名长度
    let max_des_width = desLen * 15; //一个汉字的宽度为10,获取文字总宽度

    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(15);
    ctx.fillText(des, data.wid / 2 - max_des_width / 2, data.height * 0.6);
    ctx.font = 'normal 10px sans-serif';


    // 8.绘制二维码
    let twoImg_width = data.wid * 0.2, //绘制的二维码宽度
      twoImg_heigth = data.wid * 0.2, //绘制的二维码高度
      twoImg_x = data.wid / 2 - avatarurl_width / 2, //绘制的头像在画布上的位置
      twoImg_y = 36;
    ctx.save(); //
    ctx.beginPath();

    ctx.arc(avatarurl_width / 2 + avatarurl_x, data.height * 0.66 + twoImg_heigth / 2, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage('/images/TwoImg2.png', avatarurl_x, data.height * 0.66, avatarurl_width, avatarurl_heigth);
    ctx.restore();
    ctx.draw(false, function() {
      console.info('绘制成功');
      setTimeout(function() {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          quality: '1',
          success: function(res) {
            let tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath,
              hide_poster: false
            });
            console.log("图片下载到临时文件夹了")
          },
          fail: function(res) {
            console.log(res);
          }
        }, that);
      }, 3000);
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

  //tab跳转
  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    let demlen = this.data.demlen;
    this.setData({
      TabCur: TabCurs,
    })
    if (TabCurs == 1) {
      pageScrollTo(0, 500)
    } else if (TabCurs == 2) {
      pageScrollTosel('.cardpost', 500)
    } else if (TabCurs == 3) {
      if (demlen == 0) {
        showToast('目前还没有评价', 'none', 1000)
      } else {
        pageScrollTosel('.cardcuss', 500)
      }
    }
  },

  //回到首页
  tapind() {
    switchTab('/pages/index/index');
  },

  //电话联系
  taptel(e) {
    let mobile = e.currentTarget.dataset.target;
    makePhoneCall(mobile);
  },

  //推送名片
  tappush() {
    let token = wx.getStorageSync('accessToken') || [];
    let demandId = this.data.demandId;
    console.log(demandId)
    wx.request({
      url: url + '/technology/sendMyBusinessCard',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.success) {
          showToast(res.data.data, 'success', 800)
          setTimeout(() => {
            navigateTo('/pages/record/record/record')
          }, 1000)
        } else {
          if (res.data.msg == '您还未制作个人名片,立即制作专属名片，让更多人与您合作吧') {
            setTimeout(() => {
              let falg = true;
              this.tapjump(falg)
            }, 1000)
          } else if (res.data.msg == '您已经推送过了，【需求方】有意向会尽早联系您') {
            showToast(res.data.msg, 'none', 800)
            setTimeout(() => {
              navigateTo('/pages/record/record/record')
            }, 1000)
          } else if (res.data.msg == '您的名片已关闭，开启后才能推送哦') {
            setTimeout(() => {
              let falg = false;
              this.tapjump(falg)
            }, 1000)
          }

        }

      },
    })
  },

  //打开模态框
  tapjump(falg) {
    let modalName = 'showModal';
    this.setData({
      modalName: modalName,
      modalfalg: falg
    })
    if (falg) {
      this.setData({
        modalfalg:'addjump',
        modaltxt: '您还未制作个人名片，制作名片后让更多人/企业发现您，获得更多合作机会',
        btntxt: '确认'
      })
    } else {
      this.setData({
        modalfalg: 'checkflag',
        modaltxt: '您的名片已关闭,是否要开启',
        btntxt: '开启'
      })
    }
  },

  //关闭模拟框
  hideModal() {
    this.setData({
      modalName: null
    })
  },

  checkflag() {
    console.log('已关闭，要开启');
    this.reqchkflag(1);
    this.hideModal();
  },

  addjump(){
    navigateTo('/pages/technology/add/add')
  },

  //开启、关闭名片
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

  //页面滚动执行方式
  onPageScroll(e) {
    //console.log(e.scrollTop);
    let demlen = this.data.demlen;
    if (e.scrollTop == 0) {
      this.setData({
        TabCur: 1
      })
    } else if (e.scrollTop >= 200) {
      this.setData({
        TabCur: 2
      })
    }
    // else if (demlen == 0&&e.scrollTop >= 750) {
    //   this.setData({
    //     TabCur: 3
    //   })
    // }
  },

  //分享
  tapshare() {
    this.onShareAppMessage()
  },

  //获取需求详情
  getDemand(token, demandId) {
    wx.request({
      url: url + '/demand/getDemandById',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let demanditem = res.data.data;
        console.log('需求详情:', demanditem)
        if (res.data.success) {
          if (demanditem.label != '') {
            let label = demanditem.label.split(",")
            this.setData({
              label: label
            })
          }
          this.setData({
            demanditem: demanditem,
          })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      },
    })
  },

  //获取评论详情
  getEvaluations(token, demandId) {
    wx.request({
      url: url + '/invitation/getEvaluations',
      data: {
        demandId: demandId,
        accessToken: token,
      },
      success: res => {
        console.log('评论详情:', res.data.data)
        if (res.data.success) {
          let data = res.data.data;
          let demlen = res.data.data.length;
          this.setData({
            cusslist: data,
            demlen: demlen
          })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //获取岗位发布者详情
  getReleaseMessage(token, demandId) {
    wx.request({
      url: url + '/demand/getReleaseMessage',
      data: {
        accessToken: token,
        demandId: demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let publisherInfo = res.data.data;
        console.log('发布者详情:', publisherInfo);
        if (res.data.success) {
          this.setData({
            publisherInfo: publisherInfo,
            userId: res.data.data.userId
          })
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      },
    })
  },

  //获取公司主页图片
  getCompanyHomepage(token, demandId) {
    setTimeout(() => {
      let userId = this.data.userId;
      wx.request({
        url: url + '/company/getCompanyHomepage',
        data: {
          accessToken: token,
          userId: userId
        },
        success: res => {
          console.log('图片:', res.data.data)
          let details = res.data.data;
          if (res.data.success) {
            if (details.length != 0) {
              let oneImage = "swiperList[0]";
              let twoImage = "swiperList[1]";
              let threeImage = "swiperList[2]";
              let fourImage = "swiperList[3]";
              let fiveImage = "swiperList[4]";
              if (details.oneImage != null) {
                this.setData({
                  [oneImage]: details.oneImage,
                })
              }else{
                this.setData({
                  [oneImage]: 'http://www.yucai-sz.com:8079/imgs/front/images/nodata.jpg',
                })
              }
              if (details.twoImage != null) {
                this.setData({
                  [twoImage]: details.twoImage,
                })
              }
              if (details.threeImage != null) {
                this.setData({
                  [threeImage]: details.threeImage,
                })
              }
              if (details.fourImage != null) {
                this.setData({
                  [fourImage]: details.fourImage,
                })
              }
              if (details.fiveImage != null) {
                this.setData({
                  [fiveImage]: details.fiveImage,
                })
              }
            }
          }else{
            this.setData({
              [oneImage]: 'http://www.yucai-sz.com:8079/imgs/front/images/nodata.jpg',
            })
          }
        }
      })
    }, 1000)
  },

  request(demandId) {
    let token = wx.getStorageSync('accessToken') || '';
    this.getDemand(token, demandId)
    this.getEvaluations(token, demandId)
    this.getReleaseMessage(token, demandId)
    this.getCompanyHomepage(token, demandId)

  },

  // 查看更多的招聘职位,页面跳转
  toMoreJobs() {
    console.log('查看热招职位跳转');
    let userId = this.data.userId;
    let demandId = this.data.demandId;
    setTimeout(function() {
      navigateTo('/pages/demand/morejobs/morejobs?userId=' + userId + '&demandId=' + demandId)
    }, 500)
  },

  handleOpen() {
    this.setData({
      visible: true
    });
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClickItem({
    detail
  }) {
    const index = detail.index + 1;
    if (index == 2) {
      //console.log('index:',index)
      //this.tapjump()
      showToast('即将上线，敬请期待!', 'none', 1000)
    }

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

  onLoad: function(options) {
    let demandId = options.demandId;
    this.setData({
      demandId: demandId,
      jobName: options.jobName
    })
    this.request(demandId);
    this.getDevInfo();
  },

  onReady: function() {
    // let url = '/images/bgcimg.png';
    // console.log(url);
    // this.getFileSystemManager(url)
    var my_carvas = wx.createCanvasContext('myCanvas', this) //1.创建carvas实例对象，方便后续使用。
    my_carvas.setStrokeStyle('red') //设置边框颜色。
    my_carvas.moveTo(20, 100) //设置绘画路线的起点 （20,100）>>>（当前画布对象的 x 轴，当前画布对象的 y 轴）
    my_carvas.lineTo(120, 100) //增加一个新点，然后创建一条从上次指定点到目标点的线。（120,100）>>>（当前画布对象的 x 轴，当前画布对象的 y 轴)
    my_carvas.stroke() //画出当前路径的边框。默认颜色色为黑色。
    my_carvas.draw() //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。

  },

  onShow: function() {

  },


  onHide: function() {

  },

  onUnload: function() {

  },


  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },

  onReachBottom: function() {

  },

  onShareAppMessage() {
    return {
      title: '需求详情',
      imageUrl: '../../../images/123456.jpg'
    };
  }
})