const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function getDay(day){
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = doHandleMonth(tMonth + 1);
      tDate = doHandleMonth(tDate);
      return tYear+"-"+tMonth+"-"+tDate;
  }
  function doHandleMonth(month){
      var m = month;
      if(month.toString().length == 1){
       m = "0" + month;
      }
      return m;
  }
  function compareDate(dateTime1,dateTime2)
  {
      var formatDate1 = new Date(dateTime1)
      var formatDate2 = new Date(dateTime2)
      return formatDate1 > formatDate2
  }
module.exports = {
  formatTime,
  getDay,
  compareDate
}
