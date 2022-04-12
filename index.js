import { ajaxFunc } from "./ajaxFunc.js";

var cities = document.getElementById("search");
var citiesNamesUl = document.querySelector("#citiesNamesUl");

var cityNamesList = [];
var btn = document.getElementById("btn");
//btn.setAttribute("method", "GET");
btn.addEventListener("click", setData);

function setData() {
  if (cities.value.trim() != 0) {
    ajaxFunc(cities.value).then(function (res) {
      updateCityList(res.city["name"], res);
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
    showWeatherDetails(res);
  });
};

let showWeatherDetails = (res) => {
  var htmlTemp = "°C";
  let array = [
    "Temp:" + " " + res.list[0].main.temp + htmlTemp,
    "Wind:" + " " + res.list[0].wind.speed,
    "Humidity: " + " " + res.list[0].main.humidity,
  ];

  $("#cityWeatherForcastUL").empty();
  $.each(array, function (key, value) {
    $("#cityWeatherForcastUL").append("<li>" + value + "</li>");
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
        ajaxFunc(item).then(function (res) {
          showWeatherDetails(res);
        });
      });
    });
  }
}

loopOverCityList();
