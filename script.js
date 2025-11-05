const apiKey = "f78b2dc4c08fdaef0c160ea755a93e8a";

const searchBtn = document.getElementById("searchBtn");
const inputBox = document.querySelector(".input-box");
const weatherBody = document.querySelector(".weather-body");
const locationNotFound = document.querySelector(".location-not-found");

const weatherIcon = document.querySelector(".weather-icon");
const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function checkWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404" || data.cod === 404) {
      locationNotFound.style.display = "block";
      weatherBody.style.display = "none";
      return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;

    const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
    wind.textContent = `${windSpeedKmh} Km/h`;

    const mainWeather = data.weather[0].main;
    switch (mainWeather) {
      case "Clouds":
        weatherIcon.src = "assets/cloud.png";
        break;
      case "Clear":
        weatherIcon.src = "assets/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "assets/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "assets/drizzle.png";
        break;
      case "Mist":
      case "Haze":
      case "Fog":
        weatherIcon.src = "assets/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "assets/snow.png";
        break;
      default:
        weatherIcon.src = "assets/clear.png";
    }

    //  Snow effect 
    const snowContainer = document.querySelector(".snow-container");
    if (mainWeather === "Snow") {
      snowContainer.style.display = "block";
      createSnowEffect();
    } else if (snowContainer) {
      snowContainer.style.display = "none";
    }

    console.log("Weather fetched successfully:", data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Unable to fetch weather data. Please try again later.");
  }
}

//  Event listener
searchBtn.addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

//  Snow animation function
function createSnowEffect() {
  const snowContainer = document.querySelector(".snow-container");
  snowContainer.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snowflake.style.opacity = Math.random();
    snowflake.style.width = snowflake.style.height = Math.random() * 5 + 2 + "px";
    snowContainer.appendChild(snowflake);
  }
}
