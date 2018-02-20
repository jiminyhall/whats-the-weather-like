$(document).ready(function() {
  globalLat = 53.060;
  globalLon = -2.211;
  globalUnit = 'f';
  document.getElementById("demo").innerHTML = "(" + globalLat + "," + globalLon + ")";
  loadWeather(globalLat + ',' + globalLon, '');
  var width = window.innerWidth;
  if (width > 400) width=400;
  var height = width/1.6;


  // use API key: AIzaSyCNw7pMg76mwnAMIiC98l9AY8zsERMn_vA
  document.getElementById("map").innerHTML = "<img class='img-rounded' src='https://maps.google.com/maps/api/staticmap?center=" + globalLat + ',' + globalLon + "&markers=" + globalLat + ',' + globalLon + "&zoom=3&size="+width+"x"+height+"&sensor=TRUE_OR_FALSE&key=AIzaSyCNw7pMg76mwnAMIiC98l9AY8zsERMn_vA'/>";
});

var x = document.getElementById("demo");
var y = document.getElementById("map");
var globalUnit = 'C';
var globalLat;
var globalLon;

function switchUnits() {
  if (globalUnit === 'f')
    globalUnit = 'c';
  else
    globalUnit = 'f';
  loadWeather(globalLat + ',' + globalLon);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    navigator.geolocation.getCurrentPosition(function(position) {
      loadWeather(position.coords.latitude + ',' + position.coords.longitude);
      globalLat = position.coords.latitude;
      globalLon = position.coords.longitude;
      document.getElementById("map").innerHTML = "<img class='img-rounded' src='https://maps.google.com/maps/api/staticmap?center=" + position.coords.latitude + ',' + position.coords.longitude + "&markers=" + position.coords.latitude + ',' + position.coords.longitude + "&zoom=3&size=400x250&sensor=TRUE_OR_FALSE&key=AIzaSyCNw7pMg76mwnAMIiC98l9AY8zsERMn_vA'/>";
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getRandomLocation() {

  var lat = (Math.random() * 180) - 90;
  var long = (Math.random() * 360) - 180;
  x.innerHTML = " (" + lat.toFixed(3) + "),(" + long.toFixed(3) + ")";
  loadWeather(lat + ',' + long)
  globalLat = lat;
  globalLon = long;
  document.getElementById("map").innerHTML = "<img class='img-rounded' src='https://maps.google.com/maps/api/staticmap?center=" + lat + ',' + long + "&markers=" + lat + ',' + long + "&zoom=3&size=400x250&sensor=TRUE_OR_FALSE&key=AIzaSyCNw7pMg76mwnAMIiC98l9AY8zsERMn_vA'/>";
}

function showPosition(position) {
  x.innerHTML = " (" + position.coords.latitude.toFixed(3) + "),(" + position.coords.longitude.toFixed(3) + ")";
}

function weatherBackground(code, currently) {

  currently = currently.replace(" ",",");
  var jsonURL = "https://api.flickr.com/services/feeds/photos_public.gne?tags=" + currently + ",weather&size=b&lang=en-us&format=json&jsoncallback=?";
  console.log("API Call: " + jsonURL);



  $.getJSON(jsonURL, function(data) {

    var rand = Math.floor(Math.random() * data.items.length);
    console.log("Rand: " + rand);

      console.log('getJson');
      console.log("size: " + data.items[rand].media.m.replace("_m","_h"));
      document.body.style.backgroundImage = "url('"+data.items[rand].media.m.replace("_m","_h")+"')";

    })
    /*
    .error(function(jqXHR, textStatus, errorThrown) {
        console.log("error: " + textStatus);
        console.log("errorThrown: " + errorThrown);
        console.log("incoming Text " + jqXHR.responseText);
    })
    .complete(function() {
      console.log("JSON complete");
    })
    */
    ;

}

function loadWeather(location) {
  console.log('loadWeather');

  $.simpleWeather({
    location: location,
    unit: globalUnit,
    success: function(weather) {

      weatherBackground(weather.code, weather.currently);

      console.log("Weather code: " + weather.code);
      console.log("Weather currently: " + weather.currently);
      console.log("Weather temp: " + weather.temp);


      html = '<ul><li>' + weather.city + ', ' + weather.country + '</li>';
      html += '<li class="currently">' + weather.currently + '</li>';
      html += '<li>' + weather.temp + '&deg;' + globalUnit + '</li></ul>';

      console.log(html);

      $("#weather").html(html);
    },
    error: function(error) {

      console.log('error!');
      document.body.style.backgroundImage = "";

      $("#weather").html('</p>No weather data</p>');
    }
  });
}
