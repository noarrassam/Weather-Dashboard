import { ajaxFunc } from "./ajaxFunc.js";

let cities = document.getElementById("search");
let arr = [];
let btn = document.getElementById("btn");
//btn.setAttribute("method", "GET");
btn.addEventListener("click", setData);

function setData() {
  if (cities.value.trim() != 0) {
    ajaxFunc(cities.value).then(function (res) {
      arr.push(res.city["name"]);
      localStorage.setItem("key", JSON.stringify(arr));
      location.reload();
    });
  }
}

function getData() {
  if (localStorage.getItem("key") == null) {
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("key"));
    console.log(arr);
    arr.forEach((item, index) => {
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
            ulPrg.appendChild(liPrg);
            ulPrg.appendChild(liPrg1);
            ulPrg.appendChild(liPrg2);
          }
        });
      });
    });
  }
}

getData();
