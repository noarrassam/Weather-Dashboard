import { ajaxForecast } from "./ajaxForecast.js";
import { ajaxCurrentWeather } from "./ajaxCurrentWeather.js";

var cities = document.getElementById("search");
var citiesNamesUl = document.querySelector("#citiesNamesUl");

var cityNamesList = [];
var btn = document.getElementById("btn");
btn.addEventListener("click", setData);

function setData() {
  if (cities.value.trim() != 0) {
    ajaxCurrentWeather(cities.value).then(function (res) {
      updateCityList(res.name, res);
    });
  }
}

let updateCityList = (city, res) => {
  cityNamesList.push(city);
  localStorage.setItem("key", JSON.stringify(cityNamesList));
  citiesNamesUl = document.querySelector("#citiesNamesUl");
  let citiesLi = document.createElement("li");
  citiesLi.innerHTML = city;
  citiesNamesUl.appendChild(citiesLi);
  citiesLi.addEventListener("click", function () {
    ajaxCurrentWeather(cities.value).then(function (res) {
      showCurrentWeatherDetails(res);
      currentDate(res);
    });
    ajaxForecast(cities.value).then(function (res) {
      // show5DaysWeatherDetails(res);
      // forecastDates(res);
    });
  });
};

let cuurentWeatherImage = (res) => {
  let img = document.createElement("img");
  img.setAttribute("id", "wicon");
  let icon = res.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  img.setAttribute("src", iconurl);
  return img;
};

let showCurrentWeatherDetails = (res) => {
  var htmlTemp = "°C";
  //let cuurentWeatherImage = cuurentWeatherImage(res);
  let array = [
    res.name + ", " + currentDate(res) + " ",
    "Temp:" + " " + res.main.temp + htmlTemp,
    "Wind:" + " " + res.wind.speed,
    "Humidity:" + " " + res.main.humidity,
  ];

  $("#cityWeatherForcastUL").empty();
  $("#cityWeatherForcastUL").append(cuurentWeatherImage(res));
  $.each(array, function (index, value) {
    $("#cityWeatherForcastUL").append("<li>" + value + "</li>");
  });
};

let currentDate = (res) => {
  const mydate = new Date(res.sys.sunrise * 1000);
  var day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][mydate.getDay()];

  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][mydate.getMonth()];
  var str =
    day + " " + month + " " + mydate.getDate() + ", " + mydate.getFullYear();
  return str;
};

let forecastDates = (res) => {
  res.list.forEach((item) => {
    console.log(item.dt_txt);
  });

  var date = res.list[0].dt_txt;
  var mydate = new Date(date);
  console.log(mydate);
  var day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][mydate.getDay()];

  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][mydate.getMonth()];
  var str =
    day + " " + month + " " + mydate.getDate() + ", " + mydate.getFullYear();
  return str;
};

let weatherForecastImage = (res) => {
  let img = document.createElement("img");
  img.setAttribute("id", "wicon");
  let icon = res.list[0].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  img.setAttribute("src", iconurl);
  return img;
};

let show5DaysWeatherDetails = (res) => {
  var htmlTemp = "°C";

  $("#cityFiveWeatherForcastUL").empty();
  res.list.forEach((item, index) => {
    //if (index > 0) {
    $("#cityFiveWeatherForcastUL").append(
      "<li>" + forecastDates(res) + "</li>",
      "<li>" + "Temp:" + " " + item.main.temp + htmlTemp + "</li>",
      "<li>" + "Wind:" + " " + item.wind.speed + "</li>",
      "<li>" + "Humidity: " + " " + item.main.humidity + "</li>"
    );
    //$("#cityWeatherForcastUL").append(weatherForecastImage(res));
    //}
  });
};

function loopOverCityList() {
  if (localStorage.getItem("key") == null) {
    cityNamesList = [];
  } else {
    cityNamesList = JSON.parse(localStorage.getItem("key"));
    cityNamesList.forEach((item) => {
      let cityNamesLi = document.createElement("li");
      cityNamesLi.setAttribute("id", "li");
      var text = document.createTextNode(item);
      cityNamesLi.appendChild(text);
      citiesNamesUl.appendChild(cityNamesLi);
      cityNamesLi.addEventListener("click", function () {
        ajaxCurrentWeather(item).then(function (res) {
          showCurrentWeatherDetails(res);
          //currentDate(res);
        });
        ajaxForecast(item).then(function (res) {
          show5DaysWeatherDetails(res);
          //forecastDates(res);
        });
      });
    });
  }
}

loopOverCityList();
