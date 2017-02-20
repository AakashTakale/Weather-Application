var APPID = "0c383e678981af08631c8d16fa3263ab";
var icon;
var loc;
var descrp;
var temp;
var humidity;
var wind;
var direction;
var pressure;
var city;

function updateByCity(name) {
 var url = "http://api.openweathermap.org/data/2.5/weather?" +
           "q=" + name +
           "&APPID=" + APPID;
 sendRequest(url);
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      var weather = {};
      weather.icon = data.weather[0].id;
      weather.loc = data.name;
      weather.con = data.sys.country;
      weather.descrp = data.weather[0].description;
      weather.temp = K2C(data.main.temp);
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.direction = degreestodirection(data.wind.deg);
      weather.pressure = data.main.pressure;
      update(weather);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function degreestodirection(degrees) {
  var range = 360/8;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  for(i in angles){
    if(degrees >= low && degrees < high)
      return angles[i];
      low = (low + range) % 360;
      high = (high + range) % 360;
  }
  return "N";
}

function K2C(k) {
  return Math.round((k - 273.15) * 10)/10;
}

function update(weather) {
  icon.src = "imgs/codes/" + weather.icon + ".png";
  loc.innerHTML = weather.loc;
  con.innerHTML = weather.con;
  descrp.innerHTML = weather.descrp;
  temp.innerHTML = weather.temp;
  humidity.innerHTML = weather.humidity;
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  pressure.innerHTML = weather.pressure;
}

function weatherApp(){
  icon = document.getElementById('icon');
  loc = document.getElementById('location');
  con = document.getElementById('country');
  descrp = document.getElementById('description');
  temp = document.getElementById('temperature');
  humidity = document.getElementById('humidity');
  wind = document.getElementById('wind');
  direction = document.getElementById('direction');
  pressure = document.getElementById('atm-press');
  city = document.getElementById('city').value;
  updateByCity(city);

}
window.onload = weatherApp;
