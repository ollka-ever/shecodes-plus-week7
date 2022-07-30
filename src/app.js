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
}

let apiKey = "616b6d14eb70524f242eb75242106f0a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sumy&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
