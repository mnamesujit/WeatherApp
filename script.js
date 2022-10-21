const API_KEY = 'db84c7f39a93a6eac948176817b03717';

const container = document.querySelector(".container");
const btn = document.querySelector(".search-box button");
const weatherData = document.querySelector(".weather-data");
const moreInfo = document.querySelector(".more-info");
const errorPage = document.querySelector(".not-found");
const search = document.querySelector(".search-box input");
console.log(search)

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hello")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your Browser dosn't support Geolocation api");
  }
});
function onSuccess(position) {
  console.log(position);
  const { latitude, longitude } = position.coords;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  console.log(url);
  fetchData(url);
}
function onError(error) {
  console.log(error);
}

search.addEventListener("keyup", e => {
  if (e.key == "Enter" && search.value != "") {
    requestAPI(search.value);
  }
})

btn.addEventListener("click", () => {
   requestAPI(search.value);
});



const requestAPI = (city) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetchData(url)
}

const fetchData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      updateWeather(res);
    });
}

const updateWeather = (res) => {
          if (res.cod === "404") {
        container.style.height = "400px";

        weatherData.style.display = "none";
        moreInfo.style.display = "none";

        errorPage.style.display = "block";
        errorPage.classList.add("fadeIn");

        return;
      }
      search.value = `${res.name}`,
      errorPage.style.display = "none";
      errorPage.classList.remove("fadeIn");

      const country_name=document.querySelector('.country-name')
      const image = document.querySelector(".weather-data img");
      const temperature = document.querySelector(".weather-data .temperature");
      const description = document.querySelector(".weather-data .description");
      const humidity = document.querySelector(
        ".more-info .humidity span"
      );
      const wind = document.querySelector(".more-info .wind span");
      
  
      country_name.innerHTML=`${res.sys.country}`
  
  
      switch (res.weather[0].main) {
        case "Clear":
          image.src = "img/clear.png";
          break;

        case "Rain":
          image.src = "img/rain.png";
          break;

        case "Snow":
          image.src = "img/snow.png";
          break;

        case "Clouds":
          image.src = "img/cloud.png";
          break;

        case "Haze":
          image.src = "img/mist.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(res.main.temp)}<span>°C</span>`;
      description.innerHTML = `${res.weather[0].description}`;
      humidity.innerHTML = `${res.main.humidity}%`;
      wind.innerHTML = `${parseInt(res.wind.speed)}Km/h`;

      weatherData.style.display = "";
      moreInfo.style.display = "";
      weatherData.classList.add("fadeIn");
      moreInfo.classList.add("fadeIn");
      if (window.innerWidth < 400) {
        container.style.height = "470px";
        console.log("code Executed");
      } else {
        container.style.height = "550px";
      }
      
      console.log(window.innerWidth)
  
}
