let apiKey = "597c40c39084687093b091cd48b366f8";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${apiKey}&&units=metric`;

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
  let icon = document.querySelector("#conImg");
  city.innerHTML = response.data.name;
  tempreture.innerHTML = Math.round(currentTemp);
  console.log(response.data);
  windSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
  condition.innerHTML = `${response.data.weather[0].description}`;
  icon.src = `images/cloudy.svg`;
}

navigator.geolocation.getCurrentPosition(findPosition);
axios.get(apiUrl).then(displayWeather);

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

function getWeekDays() {
  let days = document.querySelectorAll(".weekDay");
  let i = 1;
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
