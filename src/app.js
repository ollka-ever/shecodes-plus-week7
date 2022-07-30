function formatDate(timestamp) {
  let date = new Date(timestamp);

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[date.getDay()];
  let hour = date.getHours();

  if (hour < 10) {
    hour = "0" + hour;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${hour}:${minutes}`;
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#main-temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  let icon = response.data.weather[0].icon;
  let imgIcon = document.querySelector("#main-icon");
  imgIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  imgIcon.setAttribute("alt", response.data.weather[0].description);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Sumy");
