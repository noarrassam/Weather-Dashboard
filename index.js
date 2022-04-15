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
      loopOverCityList();
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
    });
    let lat = res.coord["lat"];
    let lon = res.coord["lon"];
    ajaxForecast(lat, lon).then(function (res) {
      show5DaysWeatherDetails(res);
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
  let array = [
    res.name + ", " + currentDate(res) + " ",
    "Temp:" + " " + res.main.temp + htmlTemp,
    "Wind:" + " " + res.wind.speed + " " + "MPH",
    "Humidity:" + " " + res.main.humidity + " " + "%",
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
  var mydate = new Date(res);
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
  var iconurl = "http://openweathermap.org/img/w/" + res + ".png";
  img.setAttribute("src", iconurl);
  let image = document.getElementById("cityFiveWeatherForcastUL").append(img);
  return image;
};

let show5DaysWeatherDetails = (res) => {
  var htmlTemp = "°C";

  $("#cityFiveWeatherForcastUL").empty();
  res.daily.forEach((item, index) => {
    //
    if (index > 0 && index < 6) {
      var date = item.dt * 1000;
      var mydate = new Date(date);
      var icons = item.weather[0].icon;
      weatherForecastImage(icons);
      $("#cityFiveWeatherForcastUL").append(
        "<li>" + forecastDates(mydate) + "</li>",
        "<li>" + "Temp:" + " " + item.temp.day + htmlTemp + "</li>",
        "<li>" + "Wind:" + " " + item.humidity + " " + "MPH" + "</li>",
        "<li>" + "Humidity: " + " " + item.wind_speed + " " + "%" + "</li>"
      );
    }
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
          let lon = res.coord.lon;
          let lat = res.coord.lat;
          ajaxForecast(lat, lon).then(function (res) {
            show5DaysWeatherDetails(res);
          });
        });
      });
    });
  }
}

loopOverCityList();
