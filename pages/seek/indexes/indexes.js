const app = getApp();
import {
  cityData
} from '../../../component/city.js';
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true
  },
  onLoad() {
    console.log(cityData)
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    console.log(storeCity)
    cityData.forEach((item) => {
        // let firstName = item.name;
        // let index = words.indexOf(firstName);
        // storeCity[index].list.push({
        //   name: item.name,
        //   key: firstName
        // });
        //const list = item;
      console.log(item)
    })

    this.data.cityData = storeCity;
    // this.setData({
    //   cities: this.data.cities
    // })
  },
  onReady() {},
});
