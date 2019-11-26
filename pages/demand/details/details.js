// pages/demand/details/details.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  pageScrollTosel,
  switchTab,
  navigateTo,
  showLoading,
  relunique,
  relremovetag,
  relstradd,
  setBarTitle,
  setBarColor,
} from '../../../utils/WeChatfction';

Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    TabCur: 1,
    index: 2,
    jobName: '',
    jobType: '',
    jobNumber: '',
    jobRequire: '',
    label: '',
    salary: '',
    ageRequire: '',
    city: '',
    address: '',
    deadline: '',
    releaseType: '',
    mobile: '',
    check: true,
    ind: null,
    jobind: null,
    ageind: null,
    cityind: null,
    deadind: null,
    citypicker: ['广东省', '广州市', '海珠区'],
    jobpicker: ['普工', '合同工', '暑假工', '学生工'],
    agepicker: ['18~30', '20~40', '18~40', '30~50'],
    taglist: [{
      name: 'red',
      title: '五险一金'
    }, {
      name: 'cyan',
      title: '包底'
    }, {
      name: 'yellow',
      title: '包吃'
    }, {
      name: 'green',
      title: '年底双薪'
    }, {
      name: 'mauva',
      title: '加班补助'
    }, {
      name: 'blue',
      title: '周末双休'
    }],
    jobtag: [],
    tagflag: true,
    txtput: 0,
    demandflag: true,
    switchflag: false
  },
  switchChange(e) {
    let val = e.detail.value;
    console.log(val)
    if (val) {
      showLoading();
      setTimeout(() => {
        this.setData({
          switchflag: val,
          TabCur: 2,
        })
      }, 3500)
    }else{
      this.setData({
        switchflag: val,
        TabCur: 1,
      })
    }
  },
  tabSelect(e) {
    let TabCurs = e.currentTarget.dataset.id;
    if (TabCurs == 2) {
      showLoading();
      setTimeout(() => {
        this.setData({
          title: '修改需求',
          TabCur: TabCurs,
        })
      }, 3500)
    } else {
      this.setData({
        TabCur: TabCurs,
      })
    }
  },
  formSubmit(e) {
    let accessToken = wx.getStorageSync('accessToken') || [];
    let jobName = e.detail.value.jobName;
    let jobType = this.data.jobpicker[e.detail.value.jobType];
    let jobNumber = e.detail.value.jobNumber;
    let jobRequire = e.detail.value.jobRequire;
    let salary = e.detail.value.salary;
    let ageRequire = this.data.agepicker[e.detail.value.ageRequire];
    let city = e.detail.value.city;
    let address = e.detail.value.address;
    let deadline = e.detail.value.deadline;
    let mobile = e.detail.value.mobile;
    let jobtag = this.data.jobtag;
    let label = relstradd(jobtag);
    let id = this.data.id;
    if (jobName == "" || jobType == undefined || jobNumber == "" || salary == "" || ageRequire == undefined || city == undefined || deadline == undefined || mobile == "" || address == "") {
      showToast('请输入完整信息！', 'none', 3000)
    } else {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        wx.hideLoading()
        //console.log(jobName, jobType, jobNumber, jobRequire, label, salary, ageRequire, deadline, city, mobile, );
        wx.request({
          url: url + '/demand/updateMyDemand',
          method: 'post',
          data: {
            jobName: jobName,
            jobType: jobType,
            jobNumber: jobNumber,
            jobRequire: jobRequire,
            label: label,
            salary: salary,
            ageRequire: ageRequire,
            city: city,
            deadline: deadline,
            mobile: mobile,
            id: id,
            accessToken: accessToken,
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res)
            if (res.data.success) {
              showToast(res.data.data, 'success', 3000)
              setTimeout(() => {
                this.setData({
                  TabCur: 1,
                  title: '需求详情'
                })
              }, 2000)
              setTimeout(() => {
                this.onReady()
              }, 3500)
            } else {
              showToast(res.data.msg, 'none', 3000)
            }
          }
        })
      }, 2000)


    }
  },
  reset(e) {
    this.setData({
      TabCur: 1,
    })
  },
  jobPicker(e) {
    this.setData({
      jobind: e.detail.value
    })
  },
  agePicker(e) {
    this.setData({
      ageind: e.detail.value
    })
  },
  cityPicker(e) {
    this.setData({
      citypicker: e.detail.value
    })
  },
  deadPicker(e) {
    this.setData({
      deadind: e.detail.value
    })
  },
  jobtab(e) {
    let jobtag = this.data.jobtag;
    let taglist = this.data.taglist;
    let jobitem = e.currentTarget.dataset.target;
    if (taglist.length === 1) {
      this.setData({
        tagflag: false,
      })
    }
    relremovetag(taglist, jobitem);
    jobtag.unshift(jobitem);
    let jobtags = relunique(jobtag);
    this.setData({
      jobtag: jobtags,
      taglist: taglist
    })
  },
  textareaBInput(e) {
    console.log(e.detail.value);
    let val = e.detail.value;
    let len = val.length;
    this.setData({
      txtput: len,
    })
    if (len > 499) {
      showToast('输入值字数最大为500！', 'none', 3000)
    }
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function(options) {
    this.setData({
      demandId: options.demandId
    })
    
    setBarColor('#ffffff', '#0081ff', 1500, 'ease');
    setBarTitle('职位详情');
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function() {
    setTimeout(() => {
      this.setData({
        demandflag: false,
      })
    }, 3000)
    let accessToken = wx.getStorageSync('accessToken') || [];
    let demandId = this.data.demandId;
    wx.request({
      url: url + '/demand/getDemandById',
      data: {
        accessToken: accessToken,
        demandId: demandId
      },
      success: res => {
        console.log(res.data.data)
        let label = res.data.data.label.split(",");
        let address = res.data.data.city;
        //let mobileitem = res.data.data.mobile.substring(3, 7);
        let jobType = res.data.data.jobType;
        let len = res.data.data.jobRequire.length;
        let id = res.data.data.id;
        this.setData({
          demandlist: res.data.data,
          label: label,
          txtput: len,
          id: id,
          //jobind: jobType
        })
      }
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
    this.setData({
      demandflag: true,
    })
    this.onReady()
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