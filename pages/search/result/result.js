// pages/search/result/result.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  showLoading,
} from '../../../utils/WeChatfction';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandflag: true,
    loadflag: true,
    page: 1,
    size: 4,
    resultList: [],
    tiptxt: ''
  },

  // 搜索结果数据
  result(options) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let val = options.search.toString();
    let page = this.data.page;
    let size = this.data.size;
    wx.request({
      url: url + '/demand/getDemands',
      data: {
        accessToken: accessToken,
        search: val,
        page: page,
        size: size,
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res)
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setTimeout(() => {
              console.log("清除动画")
              this.setData({
                resultList: [...this.data.resultList, ...res.data.data],
                demandflag: false,
                loadflag: true,
                tiptxt: '',
              })
            }, 1000)
          } else {
            // 加载更多没有更多的数据,隐藏加载动画,显示底线框
            if (this.data.resultList.length > 0) {
              console.log("没有数据了")
              setTimeout(()=>{
                this.setData({
                  loadflag: true,
                  demandflag: false,
                  tiptxt: '我也是有底线的',
                })
              },1000)
            } else {
              // 请求成功后台没有数据,显示整体没有数据框
              this.setData({
                loadflag: false,
                demandflag: true,
                tiptxt: '我也是有底线的',
              })
              setTimeout(() => {
                this.setData({
                  demandflag: false,
                })
              },1000)
            }

          }
        } else {
          // 请求失败,显示没有数据
          setTimeout(() => {
            console.log("没有数据")
            this.setData({
              demandflag: false,
              loadflag: false
            })
          }, 1000)
        }
      },
      fail: res => {
        setTimeout(() => {
          this.setData({
            demandflag: false,
            loadflag: false
          })
        }, 1000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取搜索内容
    this.setData({
      val: options
    })
    console.log(options);
    this.result(options);
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



  // 刷新页面
  refresh() {
    // 初始化page,size,resultList,demandflag
    this.setData({
      page: 1,
      size: 4,
      demandflag: true,
      resultList: [],
    })
    this.result(this.data.val);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.refresh();
  },
  // 上拉加载更多
  getMore() {
    let page = this.data.page + 1;
    console.log((page));
    // 加载更多
    this.setData({
      page: page,
      size: 4
    })
    showLoading();
    this.result(this.data.val);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 只有底部通知栏没有内容才执行加载更多
    if (this.data.tiptxt == '')
      this.getMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})