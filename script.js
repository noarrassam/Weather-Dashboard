let cities = document.getElementById("search");
let arr = [];
let btn = document.getElementById("btn");
//btn.setAttribute("method", "GET");
btn.addEventListener("click", setData);

function setData() {
  if (cities.value.trim() != 0) {
    // https://api.openweathermap.org/data/2.5/forecast?q=London&cnt=5&appid=eff04efa5709d18068cb132cce23a366&units=metric
    var weather =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cities.value +
      "&cnt=5&appid=eff04efa5709d18068cb132cce23a366&units=metric";

    $.ajax({
      url: weather,
      method: "GET",
    }).then(function (response) {
      arr.push(response.city["name"]);
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
      var text = document.createTextNode(item);
      li.appendChild(text);
      document.getElementById("ul").appendChild(li);
      console.log(ul);
    });
  }
}

getData();
