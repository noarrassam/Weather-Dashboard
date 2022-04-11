function ajaxFunc(val) {
  // https://api.openweathermap.org/data/2.5/forecast?q=London&cnt=5&appid=eff04efa5709d18068cb132cce23a366&units=metric
  var weather =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    val +
    "&cnt=5&appid=eff04efa5709d18068cb132cce23a366&units=metric";

  return $.ajax({
    url: weather,
    method: "GET",
  });
}

export { ajaxFunc };
