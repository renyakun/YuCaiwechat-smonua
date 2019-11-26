 function showToast(tit, icon, timer) {
   wx.showToast({
     title: tit,
     icon: icon,
     duration: timer
   })
 };

 function pagesurl(name, title, cur) {
   wx.navigateTo({
     url: '/pages/classify/' + name + '/' + name + '?title=' + title + '&&cur=' + cur,
   });
 };

 function fiflet(arr, value) {
   for (var i = 0, vlen = arr.length; i < vlen; i++) {
     if (arr[i] == value) {
       return i;
     }
   }
   return -1;
 };

 function showModal(msg, name, title) {
   wx.showModal({
     title: '提示',
     content: msg,
     success(res) {
       if (res.confirm) {
         wx.navigateTo({
           url: '/pages/classify/' + name + '/' + name + '?title=' + title,
         })
       } else if (res.cancel) {}
     }
   })
 };

 function showLoading() {
   wx.showLoading({
     title: '加载中',
   });
   setTimeout(() => {
     wx.hideLoading()
   }, 2500);
 };

 function navigateTo(url) {
   wx.navigateTo({
     url: url,
   });
 };

 function switchTab(url) {
   wx.switchTab({
     url: url,
   });
 };

 function navigateBack() {
   setTimeout(() => {
     wx.navigateBack({
       delta: 1
     })
   }, 3000)
 };

 function pageScrollTo(gap, time) {
   wx.pageScrollTo({
     scrollTop: gap,
     duration: time
   })
 };

 function pageScrollTosel(cls, time) {
   wx.pageScrollTo({
     selector: cls,
     duration: time
   })
 };

 function relunique(ary) {
   let newAry = [];
   for (var i = 0; i < ary.length; i++) {
     var flag = true;
     for (var j = 0; j < newAry.length; j++) {
       if (ary[i].name == newAry[j].name) {
         flag = false;
       };
     };
     if (flag) {
       newAry.push(ary[i]);
     };
   };
   return newAry;
 };

 function seaunique(ary) {
   let newAry = [];
   for (let i = 0; i < ary.length; i++) {
     if (newAry.indexOf(ary[i]) === -1) {
       newAry.push(ary[i]);
     }
   }
   return newAry;
 };

 function relremovetag(arr, val) {
   for (var i = 0; i < arr.length; i++) {
     if (arr[i].name == val.name) {
       arr.splice(i, 1);
       break;
     }
   }
 };

 function removeByValue(arr, val) {
   for (var i = 0; i < arr.length; i++) {
     if (arr[i] == val) {
       arr.splice(i, 1);
       break;
     }
   }
 };

 function relstradd(arr) {
   let str = "";
   for (var i = 0; i < arr.length; i++) {
     str = str + arr[i].title + ",";
   }
   return str.substring(0, str.length - 1);
 };

 function makePhoneCall(mobile) {
   wx.makePhoneCall({
     phoneNumber: mobile,
     success: (res) => {
       console.log(res)
     },
     fail: (res) => {
       console.log(res)
     }
   })
 };

 function showBarLoading() {
   wx.showNavigationBarLoading({
     success: (res) => {
       console.log(res)
     }
   })
   setTimeout(() => {
     wx.hideNavigationBarLoading()
   }, 3500)
 };

 function setBarColor(fontcol, bgcol, time, string) {
   wx.setNavigationBarColor({
     frontColor: fontcol,
     backgroundColor: bgcol,
     animation: {
       duration: time,
       timingFunc: string
     }
   })
 };

 function setBarTitle(title) {
   wx.setNavigationBarTitle({
     title: title
   })
 };

 

 export {
   showToast,
   pagesurl,
   fiflet,
   showModal,
   navigateTo,
   switchTab,
   navigateBack,
   showLoading,
   pageScrollTo,
   pageScrollTosel,
   relunique,
   seaunique,
   relremovetag,
   removeByValue,
   relstradd,
   makePhoneCall,
   showBarLoading,
   setBarColor,
   setBarTitle,
 };