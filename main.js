const time = document.getElementById("mainTime");
const dayDate = document.getElementById("mainDayDate");

const timeZone = document.getElementById("mainTimeZone");
const timeZoneLocation = document.getElementById("mainLocation");

const image = document.getElementById("imageBox");
const temp = document.getElementById("mainTemp");
const feelsLike = document.getElementById("mainFeelsLikeTemp");
const weatherDescription = document.getElementById("description");
const maxT = document.getElementById("maxTemp");
const minT = document.getElementById("minTemp");
const humidity = document.getElementById("mainHumidity");
const pressure = document.getElementById("mainPressuer");
const wind = document.getElementById("mainWindSpeed");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "db863738f794de7d1baa62c49b1d572c";

// Current Date and Time
setInterval(() => {
  const dateAndTime = new Date();
  const year = dateAndTime.getFullYear();
  const month = dateAndTime.getMonth();
  const day = dateAndTime.getDay();
  const date = dateAndTime.getDate();
  const hour = dateAndTime.getHours();
  if (hour >= 13) {
    hourFormat = hour % 12;
  } else {
    hourFormat = hour;
  }
  const minute = dateAndTime.getMinutes();
  if (hour >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  time.innerHTML = hourFormat + ":" + minute + `<span>${ampm}</span>`;
  dayDate.innerHTML =
    days[day] + "," + " " + date + " " + months[month] + " " + "-" + " " + year;
}, 1000);

function getApiData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    //set latitude and longitude
    timeZoneLocation.innerHTML = latitude + "N" + " " + longitude + "E";

    let cnt = 5;
    fetch(
      // `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=${cnt}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        temp.innerHTML = data.main.temp + "°C";
        feelsLike.innerHTML = data.main.feels_like + "°C";
        maxT.innerHTML = data.main.temp_max + "°C";
        minT.innerHTML = data.main.temp_min + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        pressure.innerHTML = data.main.pressure + "hPa";
        wind.innerHTML = data.wind.speed + "m/s" + " " + data.wind.deg + "°";
        timeZone.innerHTML = data.name + "," + " " + data.sys.country;
        image.innerHTML = `<img src="http://openweathermap.org/img/wn//${data.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">`;
        weatherDescription.innerHTML = data.weather[0].description;
      });
  });
}

getApiData();