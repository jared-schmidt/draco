weather = {
  start:function(slack){
    var zipCode = '15904';

    if (slack['text']){
      zipCode = slack['text'];
    }

    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',us&units=imperial'

    try{
      var weatherData = get_call(weatherURL);

      var currentTemp = weatherData.main.temp;
      var currentWeatherType = weatherData.weather[0].description;
      var townName = weatherData.name;

      message = 'It is currently ' + currentTemp + ' degrees in ' + townName + ' with ' + currentWeatherType;
    }catch(err){
      console.log(err);
      message = 'failed to find weather.';
    }
    return message;
  }
}
