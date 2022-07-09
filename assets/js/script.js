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
let timeNow = dayjs().format("DD, MMM, YYYY hh:mm A")
let apiKey = "c21a2246b95017f0e7609338479f2597";
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
      
      currentCityInfo = {
        cityName: selectedCity,
        lats: data.coord.lat,
        longs: data.coord.lon,
      };
      console.log(currentCityInfo);

      weatherData(currentCityInfo);
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
      displayWeather(currentCityInfo, dataCurrent,dataDaily)
    });
};

function displayWeather (currentCityInfo, dataCurrent, dataDaily) {
  let iconcode = dataCurrent.weather[0].icon;
  let currentTemp = dataCurrent.temp;
  let currentWindSpd = dataCurrent.wind_speed;
  let currentWindDirection = dataCurrent.wind_deg;
  let currentHumidity = dataCurrent.humidity;
  let currentUVI = dataCurrent.uvi;
  let currentWeatherBody = $("#weather-today-body");
  
  // let currentWeatherArray = [];
  // currentWeatherArray.push[currentTemp,currentWindSpd,currentWindDirection,currentHumidity,currentUVI]

  // Code to display Selected Cities Current Weather Today
  // Bootstrap container Styling for Weather Today 
  let currentWeatherEl = $("#weather-today-header")
  currentWeatherEl.addClass("card col-9 mx-3 row");
  currentWeatherBody.addClass("card-body")

  // Code to display city Name and Time
  let weatherTodayEl = $("<div>");
  let currentCityNameEl = $("<h4>");
  let currentTimeEl = $("<h5>");
  currentTimeEl.text(timeNow);
  currentCityNameEl.text(currentCityInfo.cityName);

  weatherTodayEl.append(currentCityNameEl);
  weatherTodayEl.append(currentTimeEl);
  currentWeatherEl.append(weatherTodayEl);
  
    // Code to append Weather Icon
    let currentWeatherIcon = $("<img>");
    currentWeatherIcon.attr("src", "https://openweathermap.org/img/w/" + iconcode + ".png")
    currentWeatherEl.append(currentWeatherIcon);


  // Code to Display currentTemp
  let currentTempEl = $("<div>");
  currentTempEl.text(`Temperature: ${currentTemp}℃`)
  currentWeatherBody.append(currentTempEl);

  // Code to Display current WindSpeed
  let currentWindSpeedEl = $("<div>");
  currentWindSpeedEl.text(`Wind Speed : ${currentWindSpd}km/h`)
  currentWeatherBody.append(currentWindSpeedEl);

  // Code to Display Wind direction
  let currentWindDirEl = $("<div>");
  currentWindDirEl.text(`Wind Direction: ${currentWindDirection}`)
  currentWeatherBody.append(currentWindDirEl);

  // Code to Display Humidity
  let currentHumidityEl = $("<div>");
  currentHumidityEl.text(`Humidity: ${currentHumidity}%`)
  currentWeatherBody.append(currentHumidityEl);

  // Code to Display UV Index
  let currentUVIndexEL = $("<div>");
  currentUVIndexEL.text(`Current Temp: ${currentTemp}`)
  currentWeatherBody.append(currentTempEl);
};