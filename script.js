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
        // console.log(item);
        ajaxFunc(item).then(function (res) {
          console.log(res.list[0].main.temp);
          res.list[0].main.temp;
        });
      });
    });
  }
}

getData();
