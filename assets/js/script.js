// Search Block Section to search weather in different Cities
// Search Function to access Weather API's Cities
// Cities Must be saved in Local Storage
// Weather Results must also be saved in Local Storage
// Get function to return already searched cities

// Display Weather Today
// Function to retrieve (to save to variable) or display all weather factors for current day
// Loop Function to display all information for day.

// Display Weather with forecast 
  // Retrieve attributes and set against variables
  // append variables to container.

// Display Weather with a 5 Day forecast 
  // For loop function
    // create let variable for each attribute
    // create variables for the card to display each attribute
    // append to Container


const searchBttn = $("#search-bttn");

let cityInputEl = $("#city-input");
let timeNow = dayjs().format("DD-MM-YYYY HH:mm")
let apiKey = "c21a2246b95017f0e7609338479f2597";
let currentWeatherEl = $("#weather-today")
let currentTimeEl = $("#current-time")
let cityTodayEl = $("#city-today")
// let userLocation = $(".userLoc")
// const myLocation = $("#my-location")
// let cityArray = [];
let currentCityInfo = {};

searchBttn.on("click", cityCoordinates);

function cityCoordinates() {
  selectedCity = cityInputEl.val().trim();
  let cityCoordAPIURL = "https://api.openweathermap.org/data/2.5/weather?q="+selectedCity+"&units=metric&appid="+apiKey;
  
    fetch (cityCoordAPIURL) 
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data)
      
      let currentCityInfo = {
        cityName: selectedCity,
        lats: data.coord.lat,
        longs: data.coord.lon,
      };
      console.log(currentCityInfo);

      weatherData(currentCityInfo);
      displayWeather(currentCityInfo);
    });
}

  // <======== Code to fetch and display 5day Weather Forecast ========>
function weatherData(currentCityInfo) {
  let day5APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+currentCityInfo.lats+"&lon="+currentCityInfo.longs+"&units=metric&exclude=minutely,hourly&appid="+apiKey;
  
  fetch (day5APIURL) 
    .then(function (response) {
      if(response.status = 200) {
      return response.json();

      } else if(response.status != 200) {
        response.innerHTML();
      };
    })
    .then(function (data) {
      console.log(data);
      let dataCurrent = data.current;
      let dataDaily = data.daily;
      displayWeather(dataCurrent,dataDaily)
    });
};

function displayWeather (dataCurrent, currentCityInfo) {
  currentCityName = currentCityInfo.cityName;
  console.log(currentCityName);
  let currentTime = dataCurrent.dt;
  let currentTemp = dataCurrent.temp;
  let currentWindSpd = dataCurrent.wind_speed;
  let currentWindDirection = dataCurrent.wind_deg;
  let currentHumidity = dataCurrent.humidity;
  let currentUVI = dataCurrent.uvi;
  
  // let currentWeatherArray = [];
  // currentWeatherArray.push[currentTemp,currentWindSpd,currentWindDirection,currentHumidity,currentUVI]

  cityTodayEl.text(currentCityInfo.cityName)
  
  $("#current-time").text(timeNow);
  
  // // Code to append currentTemp
  // let currentWeatherData = $("li");
  // currentWeatherData.text("")
};