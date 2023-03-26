let apiKey = "597c40c39084687093b091cd48b366f8";
let forecastKey = "bc2cd97eaa209e7d22d8f3c84081655f";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${apiKey}&&units=metric`;
let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=0&lon=0&appid=${forecastKey}`;

let currentDate = new Date();
let today = document.querySelector("#date");
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function findPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#searchBox");
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  input.value = "";
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let tempreture = document.querySelector("#tempreture");
  let currentTemp = response.data.main.temp;
  let city = document.querySelector("h1");
  let windSpeed = document.querySelector("#wind");
  let condition = document.querySelector("#condition");
  let icon = document.querySelector("#weatherIcon");
  let humidity = document.querySelector("#humidity");
  let max = document.querySelector("#dayMax");
  let min = document.querySelector("#dayMin");
  city.innerHTML = response.data.name;
  tempreture.innerHTML = Math.round(currentTemp);
  console.log(response.data);
  windSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
  condition.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  icon.innerHTML = `<img
            src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png"
            alt="Semi Cloudy"
            class="weather"
            id="conImg"
          />`;
  max.innerHTML = `${Math.round(response.data.main.temp_max)}`;
  min.innerHTML = `${Math.round(response.data.main.temp_min)}`;
  forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${forecastKey}&units=metric`;
  axios.get(forecastUrl).then(forecastWeather);
}

function forecastWeather(response) {
  console.log(response.data);
  let week = document.querySelector(".week");
  console.log(currentDate.getDay());
  let weekDay = currentDate.getDay() + 1;
  week.innerHTML = "";
  for (let i = 0, j = currentDate.getDay() + 1; i < 6; i++, j++) {
    week.innerHTML =
      week.innerHTML +
      `<div class="col-2">
          <p class="weekDay">${
            weekDaysShort[(currentDate.getDay() + j) % 7]
          }</p>
          <img
            src="https://openweathermap.org/img/wn/${
              response.data.daily[i + 1].weather[0].icon
            }@4x.png"
            alt="${response.data.daily[i + 1].weather[0].main}"
            class="weather"
          />
          <p class="temp">
            <span class="max">${Math.round(
              response.data.daily[i + 1].temp.max
            )}</span>° / <span class="min">${Math.round(
        response.data.daily[i + 1].temp.min
      )}</span>°
          </p>
        </div>`;
  }
}

navigator.geolocation.getCurrentPosition(findPosition);

function toFahrenheit(cels) {
  return (cels * 9) / 5 + 32;
}

function toCelsius(fahr) {
  return ((fahr - 32) * 5) / 9;
}

function changeMaxTemp(method) {
  let max = document.querySelectorAll(".max");
  if (method === "fahrenheit") {
    max.forEach(
      (element) =>
        (element.innerHTML = Math.round(toFahrenheit(element.innerHTML)))
    );
  } else {
    max.forEach(
      (element) =>
        (element.innerHTML = Math.round(toCelsius(element.innerHTML)))
    );
  }
}

function changeMinTemp(method) {
  let max = document.querySelectorAll(".min");
  if (method === "fahrenheit") {
    max.forEach(
      (element) =>
        (element.innerHTML = Math.round(toFahrenheit(element.innerHTML)))
    );
  } else {
    max.forEach(
      (element) =>
        (element.innerHTML = Math.round(toCelsius(element.innerHTML)))
    );
  }
}

function changeToFahrenheit() {
  this.disabled = true;
  let temp = document.querySelector("#tempreture");
  changeMaxTemp("fahrenheit");
  changeMinTemp("fahrenheit");
  temp.innerHTML = Math.round((temp.innerText * 9) / 5 + 32);
  document.querySelector("#celsius").disabled = false;
}

function changeToCelsius() {
  this.disabled = true;
  let temp = document.querySelector("#tempreture");
  changeMaxTemp("celsius");
  changeMinTemp("celsius");
  temp.innerHTML = Math.round(((temp.innerText - 32) / 9) * 5);
  document.querySelector("#fahrenheit").disabled = false;
}

function getWeekDays() {
  let days = document.querySelectorAll(".weekDay");
  let i = currentDate.getDay() + 1;
  days.forEach((element) => {
    element.innerHTML = weekDaysShort[(currentDate.getDay() + i) % 7];
    i++;
  });
}

today.innerHTML = `${
  weekDays[currentDate.getDay()]
}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;

getWeekDays();

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

let far = document.querySelector("#fahrenheit");
far.addEventListener("click", changeToFahrenheit);

let cel = document.querySelector("#celsius");
cel.addEventListener("click", changeToCelsius);
