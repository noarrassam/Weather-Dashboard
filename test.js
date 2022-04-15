// console.log(response);
// var htmlTemp = "°C";
import { ajaxFunc } from "./ajaxFunc.js";
// prg.innerHTML = "Current Temp" + " " + res.list[0].main.temp + htmlTemp;
function callLon() {
  ajaxFunc("London").then(function (response) {
    let img = document.createElement("img");
    let div = document.createElement("div");
    img.setAttribute("id", "wicon");
    let icon = response.list[0].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    img.setAttribute("src", iconurl);
    div.appendChild(img);
  });
}
callLon();

// let dates = document.createElement("p");
// var date = response.list[0].dt_txt;
// var mydate = new Date(date);
// console.log(mydate);
// var day = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ][mydate.getDay()];

// var month = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ][mydate.getMonth()];
// var str =
//   day +
//   " " +
//   month +
//   " " +
//   mydate.getDate() +
//   ", " +
//   mydate.getFullYear();
// dates.innerHTML = str;

// div.appendChild(dates);
