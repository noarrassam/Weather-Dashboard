let btn = document.getElementById("btn");
let cities = document.getElementById("search");
var para = document.getElementById("para");
btn.addEventListener("click", function () {
  if (cities.value.trim() != 0) {
    var weather =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cities.value +
      "&limit=5&appid=eff04efa5709d18068cb132cce23a366";

    $.ajax({
      url: weather,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // para.innerHTML = response[0].name;
      para.innerHTML = response[0].state;
      console.log(para);
    });
  }
});
