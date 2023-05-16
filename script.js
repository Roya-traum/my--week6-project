function displayWeatherImage(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  activateCelsius();
}
function displayHumidity(response) {
  let humdElement = document.querySelector("#humidity");
  humdElement.innerHTML = response.data.main.humidity;
}

function displayWind(response) {
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
}

function convertDateTime(t) {
  let unix_timestamp = 1549312452;
  let date = new Date(t * 1000);
  let day = date.toDateString();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let formattedTime = day + "  " + hours + ":" + minutes;
  return formattedTime;
}

function displayDateTime(response) {
  let dateElement = document.querySelector("#date");
  let dt = convertDateTime(response.data.dt);
  dateElement.innerHTML = dt;
}

function displayInfo(response) {
  weatherData = response.data;
  displayWeatherImage(response);
  displayTemperature(response);
  displayHumidity(response);
  displayWind(response);
  displayDateTime(response);
}

function onFormSubmited(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  let city = cityInputElement.value;
  let apiKey = "85a20eeeb5c60d13f917238c796cb680";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayInfo)
    .catch(function (error) {
      console.log(error);
      let msgElement = document.querySelector("#description");
      msgElement.innerHTML = error.response.data.message;
    });
}

let form = document.querySelector("#cityForm");
form.addEventListener("submit", onFormSubmited);

function activateFahrenheite() {
  celsiusLink.classList.remove("active-unit");
  fahrenheitLink.classList.add("active-unit");
}

function activateCelsius() {
  fahrenheitLink.classList.remove("active-unit");
  celsiusLink.classList.add("active-unit");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenTemp = (weatherData.main.temp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenTemp);
  activateFahrenheite();
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(weatherData.main.temp);
  activateCelsius();
}

let weatherData = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
