const time = document.getElementById("mainTime");
const dayDate = document.getElementById("mainDayDate");

const timeZone = document.getElementById("mainTimeZone");
const timeZoneLocation = document.getElementById("mainLocation");

const temp = document.getElementById("mainTemp");
const feelsLike = document.getElementById("mainFeelsLikeTemp");

const humoidity = document.getElementById("mainHumidity");
const pressure = document.getElementById("mainPressuer");
const wind = document.getElementById("mainWindSpeed");
const sunrise = document.getElementById("mainSunrise");
const sunset = document.getElementById("mainSunset");

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

getApiData();
function getApiData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
}
