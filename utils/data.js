// data.js
 function changingtime(timestamp) {
   var diff = timestamp; //时间差的毫秒数 
   //计算出相差天数 
   var days = Math.floor(diff / (24 * 3600 * 1000));
   // console.log("计算出的天数", days);
   //计算出小时数 
   var leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数 
   var hours = Math.floor(leave1 / (3600 * 1000));
   // console.log("计算出的小时");
   //计算相差分钟数 
   var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数 
   var minutes = Math.floor(leave2 / (60 * 1000));
   // console.log("计算出的分钟");
   //计算相差秒数 
   var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数 
   var seconds = Math.round(leave3 / 1000);
   // console.log("计算出的秒", seconds);
   var returnStr = seconds + "秒";
   if (minutes > 0) {
     returnStr = minutes + "分" + returnStr;
   }
   if (hours > 0) {
     returnStr = hours + "小时" + returnStr;
   }
   if (days > 0) {
     returnStr = days + "天" + returnStr;
   }
   return returnStr;
 }

 function changingtime2(timestamp) {
   var diff = timestamp; //时间差的毫秒数 
   //计算出相差天数 
   var days = Math.floor(diff / (24 * 3600 * 1000));
   // console.log("计算出的天数", days);
   //计算出小时数 
   var leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数 
   var hours = Math.floor(leave1 / (3600 * 1000));
   // console.log("计算出的小时");
   //计算相差分钟数 
   var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数 
   var minutes = Math.floor(leave2 / (60 * 1000));
   // console.log("计算出的分钟");
   //计算相差秒数 
   var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数 
   var seconds = Math.round(leave3 / 1000);
   // console.log("计算出的秒", seconds);
   var returnStr = [{
     hours
   }, {
     minutes
   }, {
     seconds
   }];
   return returnStr;
 }

 /**时间戳转换  hh:mm:ss */
 function hhmmss(timer) {
   var hours = parseInt((timer / (1000 * 60 * 60)));
   var minutes = parseInt((timer % (1000 * 60 * 60)) / (1000 * 60));
   var seconds = (timer % (1000 * 60)) / 1000;
   hours = hours < 10 ? ('0' + hours) : hours;
   minutes = minutes < 10 ? ('0' + minutes) : minutes;
   seconds = seconds < 10 && seconds >= 1 ? ('0' + seconds) : seconds;
   return hours + " :" + minutes + " :" + seconds;
 }

 /**时间戳转换  mm */
 function hhmmss2(timer) {
   var hours = parseInt((timer / (1000 * 60 * 60)));
   var minutes = parseInt((timer % (1000 * 60 * 60)) / (1000 * 60));
   return minutes + (hours * 60);
 }

 module.exports = {
   changingtime: changingtime,
   changingtime2: changingtime2,
   hhmmss: hhmmss,
   hhmmss2: hhmmss2
 }