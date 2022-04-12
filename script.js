import { ajaxFunc } from "./ajaxFunc.js";

let cities = document.getElementById("search");
let cityNamesList = [];
let btn = document.getElementById("btn");
//btn.setAttribute("method", "GET");
btn.addEventListener("click", setData);

function setData() {
  if (cities.value.trim() != 0) {
    ajaxFunc(cities.value).then(function (res) {
      cityNamesList.push(res.city["name"]);
      localStorage.setItem("key", JSON.stringify(cityNamesList));
      // location.reload();
      updateCitiesList(res.city["name"]);
      showWeatherDetails(res);
    });
  }
}

let updateCitiesList = (city) => {
  let CitiesNameUL = document.querySelector("#citiesNamesUl");
  let liPrg = document.createElement("li");
  liPrg.innerHTML = city;
  CitiesNameUL.append(liPrg);
  console.log(liPrg);
};

let showWeatherDetails = (res) => {
  console.log(res);
  let ulPrg = document.getElementById("ulPrg");
  let tempul = document.createElement("ul");
  let liPrg = document.createElement("li");

  let liPrg1 = document.createElement("li");
  let liPrg2 = document.createElement("li");
  var htmlTemp = "°C";
  liPrg.innerHTML = "Temp:" + " " + res.list[0].main.temp + htmlTemp;
  liPrg1.innerHTML = "Wind:" + " " + res.list[0].wind.speed;
  liPrg2.innerHTML = "Humidity: " + " " + res.list[0].main.humidity;
  tempul.appendChild(liPrg);
  tempul.appendChild(liPrg1);
  tempul.appendChild(liPrg2);
  ulPrg.innerHTML = tempul.innerHTML;
  //replaceChild
  console.log(liPrg);
};

function getData() {
  if (localStorage.getItem("key") == null) {
    cityNamesList = [];
  } else {
    cityNamesList = JSON.parse(localStorage.getItem("key"));
    console.log(cityNamesList);
    cityNamesList.forEach((item, index) => {
      let li = document.createElement("li");
      li.setAttribute("id", "li");
      var text = document.createTextNode(item);
      li.appendChild(text);
      document.getElementById("ul").appendChild(li);
      console.log(ul);
      li.addEventListener("click", function () {
        //console.log(item);
        ajaxFunc(item).then(function (res) {
          if (item) {
            let ulPrg = document.getElementById("ulPrg");
            let liPrg = document.createElement("li");
            let liPrg1 = document.createElement("li");
            let liPrg2 = document.createElement("li");
            var htmlTemp = "°C";
            liPrg.innerHTML = "Temp:" + " " + res.list[0].main.temp + htmlTemp;
            liPrg1.innerHTML = "Wind:" + " " + res.list[0].wind.speed;
            liPrg2.innerHTML = "Humidity: " + " " + res.list[0].main.humidity;
            ulPrg.replaceChild(liPrg);
            ulPrg.replaceChild(liPrg1);
            ulPrg.replaceChild(liPrg2);
          }
        });
      });
    });
  }
}

//getData();
