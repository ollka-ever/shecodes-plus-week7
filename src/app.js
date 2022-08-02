function formatDate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let day = weekdays[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${hour}:${minutes}`;
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let icon = response.data.weather[0].icon;
  let imgIcon = document.querySelector("#main-icon");

  city.innerHTML = response.data.name;
  htmlMainTemperature.innerHTML = Math.round(response.data.main.temp);
  celciusTemperature = response.data.main.temp;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  imgIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  imgIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord.lat, response.data.coord.lon);
}

function search(city) {
  let apiKey = "616b6d14eb70524f242eb75242106f0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function dtToDay(dt) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[new Date(dt * 1000).getDay()];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  for (let i = 0; i < 6; i++) {
    let day = dailyForecast[i];
    let icon = day.weather[0].icon;
    let dayTemp = Math.round(day.temp.day);
    let nightTemp = Math.round(day.temp.night);
    let weekDay = dtToDay(day.dt);

    forecastHTML += `<div class="col-2">
  <div class="forecast-day">${weekDay}</div>
  <img
    src="https://openweathermap.org/img/wn/${icon}@2x.png"
    alt=""
    width="36"
  />
  <div class="forecast-temperature">
    <span class="forecast-temerature-day">${dayTemp}°</span>
    <span class="forecast-temerature-night">${nightTemp}°</span>
  </div>
</div>`;
  }

  forecastHTML += `<\div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(lat, lon) {
  let apiKey = "616b6d14eb70524f242eb75242106f0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let htmlMainTemperature = document.querySelector("#main-temperature");

search("Sumy");
