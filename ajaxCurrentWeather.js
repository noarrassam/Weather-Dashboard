function ajaxCurrentWeather(val) {
  // https://api.openweathermap.org/data/2.5/weather?q=London&appid=eff04efa5709d18068cb132cce23a366&units=metric
  var weather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    val +
    "&appid=eff04efa5709d18068cb132cce23a366&units=metric";

  return $.ajax({
    url: weather,
    method: "GET",
  });
}

export { ajaxCurrentWeather };
