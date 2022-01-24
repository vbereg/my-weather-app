function formatDate() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let fullDate = day + " " + hour + ":" + minutes;

  return fullDate;
}

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = formatDate();

//global variable
let key = "7ad1c9cfecb93e807114677719bcddf2";

function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°`;

  let city = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;

  let hum = document.querySelector("#humidity-info");
  let humidity = response.data.main.humidity;
  hum.innerHTML = `Humidity: ${humidity}%`;

  //changes depending metric or imperial choice
  let wind = document.querySelector("#wind-speed-info");
  let wind_speed = response.data.wind.speed;
  wind.innerHTML = `Wind speed: ${wind_speed}`;
}

//👨‍🏫Your task
//On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("#current-city");

  let city = `${searchInput.value}`;
  currentCity.innerHTML = city;

  //console.log(city);

  //update temperature as well
  let key = "7ad1c9cfecb93e807114677719bcddf2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(url).then(displayTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

function cClicked(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  city = city.innerHTML;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayTemp);
}

function fClicked(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  city = city.innerHTML;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  axios.get(url).then(displayTemp);
}

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);

  //let currentPosition = `Your Latitude is ${lat} and your longitude is ${lon}`;
  //console.log(currentPosition);

  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;

  axios.get(url).then(displayTemp);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let cTempLink = document.querySelector("#c-toggle");
cTempLink.addEventListener("click", cClicked);

let fTempLink = document.querySelector("#f-toggle");
fTempLink.addEventListener("click", fClicked);

document
  .getElementById("current_location")
  .addEventListener("click", getCurrentLocation);
