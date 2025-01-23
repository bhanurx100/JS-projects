const apikey = "b916d816e2da12d41d2b329d92c6637c";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="images/weather-icon.png" type="image/png">');

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherIcons = {
  Clouds: "images/clouds.png",
  Clear: "images/clear.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
};

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

function updateWeatherUI(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°c`;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
  weatherIcon.src = weatherIcons[data.weather[0].main] || "images/default.png";
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") checkWeather(searchBox.value);
});
