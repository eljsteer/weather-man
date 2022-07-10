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
let storeCityArray = [];

searchBttn.on("click", cityCoordinates);

displaySearchHistory();

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
      displayWeather(currentCityInfo, dataCurrent,dataDaily);
      storeSearchHistory(currentCityInfo);
    });
};

function displayWeather (currentCityInfo, dataCurrent, dataDaily) {
  let currentIconCode = dataCurrent.weather[0].icon;
  let currentTemp = dataCurrent.temp;
  let currentWindSpd = dataCurrent.wind_speed;
  let currentWindDirection = dataCurrent.wind_deg;
  let currentHumidity = dataCurrent.humidity;
  let currentUVI = dataCurrent.uvi;
  let currentWeatherBody = $("#current-body");

  // Code to display Selected Cities Current Weather Today
  // Bootstrap container Styling for Weather Today 
  let currentWContainer =$("#current-container");
  let currentWHeader = $("#current-header");
  currentWContainer.addClass("card col-9 mx-3");
  currentWHeader.addClass("card-body d-flex flex-row");
  currentWeatherBody.addClass("card-body");

  // Code to display city Name and Time
  let weatherTodayEl = $("<div>");
  let currentCityNameEl = $("<h4>");
  let currentTimeEl = $("<h5>");
  currentTimeEl.text(timeNow);
  currentCityNameEl.text(currentCityInfo.cityName);
  weatherTodayEl.append(currentCityNameEl);
  weatherTodayEl.append(currentTimeEl);
  currentWHeader.append(weatherTodayEl);
  
    // Code to append Weather Icon
    let currentWeatherIcon = $("<img>");
    currentWeatherIcon.attr("src", "https://openweathermap.org/img/w/" + currentIconCode + ".png");
    currentWHeader.append(currentWeatherIcon);

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
  currentUVIndexEL.text(`UV Index: ${currentUVI}`)
  currentWeatherBody.append(currentUVIndexEL);


  // <==========Code to dynamically generate 5day Forecast ==========>//
  
  // // Date Conversions
  // const dailyUnixDate = dataDaily[i].dt;
  // const dailyConvDate = new Date(dailyUnixDate*1000)
  // const dailyDate = dayjs(dailyConvDate).format("DD/MM/YYYY");
  // console.log(dailyDate);

  // // Code to Dynamically create Forecast Container styling
  // let forecastContainer = $("#forecast-container");
  // forecastContainer.addClass("card col-9 mx-3");
  // let forecastHeader = $("<h5>");
  // forecastHeader.addClass("card-header");
  // let forecastCardBody = $("<div>");
  // forecastCardBody.addClass("card-body");
  // let forecastCardDeck = $("<div>");
  // forecastCardDeck.addClass("card-deck");

  // forecastCardBody.append(forecastCardDeck);
  // forecastContainer.append(forecastHeader);
  // forecastContainer.append(forecastCardBody);

  // // ForLoop to dynamically display 5day forecast
  // let dailyIconCode = dataDaily[i].weather[0].icon;
  // let dailyTemp = dataDaily[i].temp.day;
  // let dailyWindSpd = dataDaily[i].wind_speed;
  // let dailyHumidity = dataDaily[i].humidity;

  // for (i=0; i < dataDaily.length-3; i++) {;

  // // Code to Dynamically create Daily Forecast Cards
  // let dailyCard = $("<div>");
  // dailyCard.addClass("card");
  // let dailyCardTitle = $("<h6>");
  // dailyCardTitle.addClass("card-title");
  // let dailyCardIcon = $("<img>");
  // dailyCardIcon.attr("src", "https://openweathermap.org/img/w/" + dailyIconCode + ".png");
  // let dailyCardBody = $("<div>");
  // let dailyTempEl = $
  // currentTempEl.text(`Temperature: ${currentTemp}℃`)
  // };

};

function storeSearchHistory (currentCityInfo) {
  storeCityArray.push(currentCityInfo);
  localStorage.setItem("searchHistory",JSON.stringify(storeCityArray));
  console.log(storeCityArray);
  displaySearchHistory();
};

function displaySearchHistory () {
  let historyContainer = $("#search-history-container");
  historyContainer.html("");
  if (localStorage.getItem("searchHistory") !== null) {
    let searchedCityArray = JSON.parse(localStorage.getItem("searchHistory"));
    for (let i = 0; i < searchedCityArray.length; i++) {
    let cityHistorical = $("<button>");
    cityHistorical.text(searchedCityArray[i].cityName);
    historyContainer.append(cityHistorical);
    };
  };
};