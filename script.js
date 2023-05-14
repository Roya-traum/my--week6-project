let day = [
  "sunday",
  "monday",
  "teusday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

let apiKey = "85a20eeeb5c60d13f917238c796cb680";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

function showToday(e) {
  let date = new Date();
  let safar = date.getDay();
  let dayName = day[safar];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let todayElement = document.querySelector(".today");
  todayElement.innerHTML = `${dayName} ${hours}:${minutes}`;
}

function setCityName(e) {
  e.preventDefault();
  let cityElement = document.querySelector(".city");
  let cityInputElement = document.querySelector("#cityInput");
  let tempElement = document.querySelector(".cityTempreture");
  let CityName = cityInputElement.value;
  cityElement.innerHTML = CityName;
  tempElement.innerHTML = "Wait for temp";
  axios
    .get(`${apiUrl}${CityName}&appid=${apiKey}&units=metric`)
    .then(setCityTemp)
    .catch(function (error) {
      // handle error
      tempElement.innerHTML = error.response.data.messages;
    });
}

function setCityTemp(response) {
  let tempElement = document.querySelector(".cityTempreture");
  tempElement.innerHTML = response.data.main.temp;
}

let cityForm = document.querySelector(".cityForm");
cityForm.addEventListener("submit", setCityName);
showToday();
