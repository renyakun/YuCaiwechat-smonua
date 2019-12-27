// pages/tempf/tempf.js

function transformArrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
Page({

  data: {

  },
  //https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=XXX&scene=XXX

  tapind() {
    let token = this.data.token;
    let scene = this.data.scene;
    wx.request({
      //url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
      url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode',
      method: 'post',
      data: {
        access_token: token,
        //scene: scene,
        path: 'pages/technology/card/card',
        width: 500
      },
      dataType:'json',
      contentType: "application/json",
      responseType: 'arraybuffer',
      header: {
        "Content-Type": "application/json;charset=utf-8"
      },
      success: res => {
        console.log(res.data)
        const base64 = wx.arrayBufferToBase64(res.data);
        //const base64 = transformArrayBufferToBase64(res.data)
        console.log(base64)
        this.setData({
          //imgavatar: base64,
          //imgavatar:res.data
        })


      }
    })
  },


  onLoad: function(options) {
    console.log(options);
    const scene = decodeURIComponent(options.scene);
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type: 'client_credential',
        appid: 'wxbe95cfd0acd54a9d',
        secret: '3539452931531b21c7f8bbba88d4e7cd'
      },
      success: res => {
        console.log(res.data.access_token);
        setTimeout(()=>{
          wx.request({
            url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
            method: 'post',
            data: {
              access_token: res.data.access_token,
              scene: scene
            },
            success: res => {
              console.log(res)
            }
          })
        },500)
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
    wx.getLaunchOptionsSync({
      success: res => {
        console.log(res)
      }
    })
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