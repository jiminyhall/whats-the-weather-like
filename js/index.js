$(document).ready(function() {
  globalLat = 53.060;
  globalLon = -2.211;
  globalUnit = 'f';
  document.getElementById("demo").innerHTML = "(" + globalLat + "," + globalLon + ")";
  loadWeather(globalLat + ',' + globalLon, '');
  document.getElementById("map").innerHTML = "<img class='img-rounded' src='http://maps.google.com/maps/api/staticmap?center=" + globalLat + ',' + globalLon + "&markers=" + globalLat + ',' + globalLon + "&zoom=3&size=400x250&sensor=TRUE_OR_FALSE'/>";
});

var x = document.getElementById("demo");
var y = document.getElemetById("map");
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
      document.getElementById("map").innerHTML = "<img class='img-rounded' src='http://maps.google.com/maps/api/staticmap?center=" + position.coords.latitude + ',' + position.coords.longitude + "&markers=" + position.coords.latitude + ',' + position.coords.longitude + "&zoom=3&size=400x250&sensor=TRUE_OR_FALSE'/>";
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
  document.getElementById("map").innerHTML = "<img class='img-rounded' src='http://maps.google.com/maps/api/staticmap?center=" + lat + ',' + long + "&markers=" + lat + ',' + long + "&zoom=3&size=400x250&sensor=TRUE_OR_FALSE'/>";
}

function showPosition(position) {
  x.innerHTML = " (" + position.coords.latitude.toFixed(3) + "),(" + position.coords.longitude.toFixed(3) + ")";
}

function weatherBackground(code, currently) {
  
  currently = currently.replace(" ",",");
  var jsonURL = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + currently + "&size=b&lang=en-us&format=json&jsoncallback=?";
  console.log("API Call: " + jsonURL);

  $.getJSON(jsonURL, function(data) {

      console.log('getJson');
      console.log("size: " + data.items[0].media.m.replace("_m","_h"));
      document.body.style.backgroundImage = "url('"+data.items[0].media.m.replace("_m","_h")+"')";
      // document.body.style.backgroundImage = "url('http://pioneerinstitute.org/wp-content/u')";

    })
    .success(function() {
      console.log("JSON success");
    })
    .error(function(jqXHR, textStatus, errorThrown) {
        console.log("error: " + textStatus);
        console.log("errorThrown: " + errorThrown);
        console.log("incoming Text " + jqXHR.responseText);
    })
    .complete(function() {
      console.log("JSON complete");
    });
/*
  if (jQuery.inArray(code, ['20', '21', '22', '26', '28', '30', '44']) >= 0) {
    // Cloudy: 20,21,22,26,28,30,44
    document.body.style.backgroundImage = "url('http://pioneerinstitute.org/wp-content/uploads/cloudy-road1.jpg')";
  } else if (jQuery.inArray(code, ['0', '1', '2', '3', '4', '37', '38', '39', '45', '47']) >= 0) {
    // Bad: 0,1,2,3,4,37,38,39,45,47
    document.body.style.backgroundImage = "url('http://pioneerinstitute.org/wp-content/uploads/cloudy-road1.jpg')";
  } else if (jQuery.inArray(code, ['5', '6', '7', '8', '9', '10', '13', '14', '15', '16', '17', '18', '25', '41', '42', '43', '46']) >= 0) {
    //   Cold: 5,6,7,8,10,13,14,15,16,17,18,25,41,42,43,46
    document.body.style.backgroundImage = "url('http://pioneerinstitute.org/wp-content/uploads/cloudy-road1.jpg')";
  } else if (jQuery.inArray(code, ['23', '24']) >= 0) {
    //  Clear: 23,24,
    document.body.style.backgroundImage = "url('http://pioneerinstitute.org/wp-content/uploads/cloudy-road1.jpg')";
  } else if (jQuery.inArray(code, ['9', '11', '12', '35', '40']) >= 0) {
    // Wet: 9,11,12,35,40,
    document.body.style.backgroundImage = "url('http://www.sampletekk.com/image/data/product_desc/Rain%20Piano%20MkII/050713rain-620x413.jpg')";
  } else if (jQuery.inArray(code, ['19', '32', '34', '35']) >= 0) {
    // Sunny/Hot: 19,32,34,36
    document.body.style.backgroundImage = "url('http://7-themes.com/data_images/out/57/6965058-sunny-breeze.jpg')";
  } else if (jQuery.inArray(code, ['27', '29', '31', '33']) >= 0) {
    //   Night:27,29,31,33,
    document.body.style.backgroundImage = "url('http://weknowyourdreams.com/images/night/night-04.jpg')";
  }
  
  */
}

function loadWeather(location) {
  console.log('loadWeather');

  $.simpleWeather({
    location: location,
    unit: globalUnit,
    success: function(weather) {
      
      weatherBackground(weather.code, weather.currently);

      html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
      html += '<ul><li>' + weather.city + ', ' + weather.country + '</li>';
      html += '<li class="currently">' + weather.currently + '</li>';
      html += '<li>' + weather.temp + '&deg;' + globalUnit + '</li></ul>';

      $("#weather").html(html);
    },
    error: function(error) {

      console.log('error!');
      document.body.style.backgroundImage = "";

      $("#weather").html('</p>No weather data</p>');
    }
  });
}