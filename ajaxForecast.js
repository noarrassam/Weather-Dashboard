function ajaxForecast(lat, lon) {
  // https://api.openweathermap.org/data/2.5/forecast?q=London&cnt=5&appid=eff04efa5709d18068cb132cce23a366&units=metric
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid==eff04efa5709d18068cb132cce23a366&units=metric
  var weather =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=eff04efa5709d18068cb132cce23a366&units=metric";

  return $.ajax({
    url: weather,
    method: "GET",
  });
}

export { ajaxForecast };
