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
  celciusLink.setAttribute("class", "active");
  fahrenheitLink.removeAttribute("class");
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let result = Math.round(celciusTemperature * 1.8 + 32);
  htmlMainTemperature.innerHTML = result;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelcius(event) {
  event.preventDefault();
  htmlMainTemperature.innerHTML = Math.round(celciusTemperature);
  celciusLink.setAttribute("class", "active");
  fahrenheitLink.removeAttribute("class");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusTemperature = null;
let htmlMainTemperature = document.querySelector("#main-temperature");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

search("Sumy");
