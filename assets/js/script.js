const searchBttn = $("#search-bttn");
const searchHistoryContainer = $("#search-history-container");

let cityInputEl = $("#city-input");
let timeNow = dayjs().format("DD, MMM, YYYY hh:mm A")
let apiKey = "c21a2246b95017f0e7609338479f2597";
// let userLocation = $(".userLoc")
// const myLocation = $("#my-location")
// let cityArray = [];
let currentCityInfo = {};
let storeCityArray = [];

searchBttn.on("click", function(event){
  let selectedCity = cityInputEl.val().trim();
  cityCoordinates(selectedCity);
});

searchHistoryContainer.on("click", function(event) {
  console.log(event.target.innerHTML);
  let pastCitySearch = event.target.innerHTML;
  cityCoordinates(pastCitySearch);
});

displaySearchHistory();

function cityCoordinates(selectedCity) {

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
};

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

  // Code to display Selected Cities Current Weather Today
  // Bootstrap container Styling for Weather Today 
  let currentWContainer =$("#current-container");
  currentWContainer.addClass("card col-9 mx-3 mb-3 h-100");
  let currentWHeader = $("#current-header");
  currentWHeader.html("");
  currentWHeader.addClass("card-body d-flex flex-row px-3 pt-3 pb-1");
  let currentWeatherBody = $("#current-body");
  currentWeatherBody.html("");
  currentWeatherBody.addClass("card-body px-3 pt-1 pb-3");

  // Code to display city Name and Time
  let weatherTodayEl = $("<div>");
  let currentCityNameEl = $("<h4>");
  let currentTimeEl = $("<h5>");
  currentTimeEl.text(timeNow);
  currentCityNameEl.text(currentCityInfo.cityName);
  currentCityNameEl.css({"text-transform":"capitalize"});
  weatherTodayEl.append(currentCityNameEl);
  weatherTodayEl.append(currentTimeEl);
  currentWHeader.append(weatherTodayEl);
  
    // Code to append Weather Icon
    let currentWeatherIcon = $("<img>");
    currentWeatherIcon.attr({
      src: "https://openweathermap.org/img/w/" + currentIconCode + ".png",
    }).height(50).width(50);
    currentWHeader.append(currentWeatherIcon);

  // Code to Display currentTemp
  let currentTempEl = $("<div>");
  currentTempEl.text(`Temperature: ${currentTemp}℃`);
  currentWeatherBody.append(currentTempEl);

  // Code to Display current WindSpeed
  let currentWindSpeedEl = $("<div>");
  currentWindSpeedEl.text(`Wind Speed : ${currentWindSpd}km/h`);
  currentWeatherBody.append(currentWindSpeedEl);

  // Code to Display Wind direction
  let currentWindDirEl = $("<div>");
  currentWindDirEl.text(`Wind Direction: ${currentWindDirection}`);
  currentWeatherBody.append(currentWindDirEl);

  // Code to Display Humidity
  let currentHumidityEl = $("<div>");
  currentHumidityEl.text(`Humidity: ${currentHumidity}%`);
  currentWeatherBody.append(currentHumidityEl);

  // Code to Display UV Index
  let currentUVIndexEL = $("<div>");
  currentUVIndexEL.addClass("d-flex flex-row");
  let currentUVIndexNum = $("<span>");
  currentUVIndexNum.html(currentUVI);
  currentUVIndexNum.css({"width":"auto","border-radius":"2px", "padding-left":"5px","padding-right":"5px"});
  currentUVIndexEL.html ("UV Index: ");
  currentUVIndexEL.append(currentUVIndexNum);
  currentWeatherBody.append(currentUVIndexEL);

  if(currentUVI < 3) {
    currentUVIndexNum.css("background-color", "green");
  } else if ( currentUVI >= 3 && currentUVI < 6) {
    currentUVIndexNum.css("background-color","yellow");
  } else if (currentUVI >= 6 && currentUVI < 8) {
    currentUVIndexNum.css("background-color","orange");
  } else if (currentUVI >= 8 && currentUVI < 11 ) {
    currentUVIndexNum.css("background-color","red");
  } else if (currentUVI >= 11) {
    currentUVIndexNum.css("background-color","darkviolet");
  }

// <==========Code to dynamically generate 5day Forecast ==========>//

  // Code to Dynamically create Forecast Container styling
  let forecastContainer = $("#forecast-container");
  forecastContainer.html("");
  forecastContainer.addClass("card col-9 mx-3");
  let forecastHeader = $("<h5>");
  forecastHeader.addClass("card-header");
  forecastHeader.text("5 Day Forecast:");
  let forecastCardBody = $("<div>");
  forecastCardBody.addClass("card-body");
  let forecastCardDeck = $("<div>");
  forecastCardDeck.addClass("card-deck");

  forecastCardBody.append(forecastCardDeck);
  forecastContainer.append(forecastHeader);
  forecastContainer.append(forecastCardBody);

  // ForLoop to dynamically display 5day forecast


  for (i=1; i < dataDaily.length-2; i++) {
    // Date Conversions
    const dailyUnixDate = dataDaily[i].dt;
    const dailyConvDate = new Date(dailyUnixDate*1000)
    const dailyDate = dayjs(dailyConvDate).format("DD/MM/YYYY");

    // Daily Weather Data
    let dailyIconCode = dataDaily[i].weather[0].icon;
    let dailyTemp = dataDaily[i].temp.day;
    let dailyWindSpeed = dataDaily[i].wind_speed;
    let dailyHumidity = dataDaily[i].humidity;
    // Code to Dynamically create Daily Forecast Cards
    let dailyCard = $("<div>");
    dailyCard.addClass("card p-2 m-2");

    let dailyCardTitle = $("<h6>");
    dailyCardTitle.addClass("card-title");
    dailyCardTitle.text(dailyDate);
    dailyCard.append(dailyCardTitle);
    
    let dailyCardIcon = $("<img>");
    dailyCardIcon.attr({
      src: "https://openweathermap.org/img/w/" + dailyIconCode + ".png",
    }).height(50).width(50);
    
    dailyCard.append(dailyCardIcon);

    let dailyCardBody = $("<div>");
    
    // Code to Add in all daily Weather Data
    let dailyTempEl = $("<div>");
    dailyTempEl.text(`Temperature: ${dailyTemp}℃`);
    dailyCardBody.append(dailyTempEl);
    dailyCard.append(dailyCardBody);
    
    let dailyWindSpeedEl = $("<div>");
    dailyWindSpeedEl.text(`Wind Speed: ${dailyWindSpeed}km/h`);
    dailyCardBody.append(dailyWindSpeedEl);
    
    let dailyHumidityEl = $("<div>");
    dailyHumidityEl.text(`Humidity: ${dailyHumidity}%`);
    dailyCardBody.append(dailyHumidityEl);

    dailyCard.append(dailyCardBody);
    forecastCardDeck.append(dailyCard);
  };
};

function storeSearchHistory (currentCityInfo) {
  storeCityArray.push(currentCityInfo);
  localStorage.setItem("searchHistory",JSON.stringify(storeCityArray));
  console.log(storeCityArray);
  displaySearchHistory(currentCityInfo);
};

function displaySearchHistory () {
  let historyContainer = $("#search-history-container");
  historyContainer.html("");
  if (localStorage.getItem("searchHistory") !== null) {
    let searchBody = $("#search-body");
    searchBody.css("border-bottom","2px solid black");
    historyContainer.addClass("card-body mx-3 p-2")
    let searchedCityArray = JSON.parse(localStorage.getItem("searchHistory"));
    for (let i = 0; i < searchedCityArray.length; i++) {
    let searchedCity = $("<button>");
    searchedCity.addClass("btn btn-outline-info w-100 m-1")
    searchedCity.text(searchedCityArray[i].cityName);
    searchedCity.css({"text-transform":"capitalize"});
    searchedCity.attr("data-city", searchedCityArray[i].cityName);
    historyContainer.append(searchedCity);
    };
  };
};
