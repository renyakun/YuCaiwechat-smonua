// my-component/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    starNum: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 4,//后端给的分数,显示相应的星星
    one_1: '',
    two_1: '',
  },

  ready: function () {
    let num = parseInt(this.properties.starNum);
    console.log(num);
    this.setStar(num); 
   },

  /**
   * 组件的方法列表
   */
  methods: {
    setStar(num){
      //情况一:展示后台给的评分
      this.setData({
        one_1: num,
        two_1: 5 - num
      })
    }
  }
})
