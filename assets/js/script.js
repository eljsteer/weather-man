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
const myLocation = $("#my-location")
let cityInputEl = $("#city-input");
let dt = dayjs().unix();
let apiKey = "c21a2246b95017f0e7609338479f2597";
let userLocation = $(".userLoc")
let cityArray = [];

function cityCoordinates() {
  selectedCity = cityInputEl.val().trim();
  let cityCoordAPIURL = "https://api.openweathermap.org/data/2.5/weather?q="+selectedCity+"&units=metric&appid="+apiKey;
  
    fetch (cityCoordAPIURL) 
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data)
      let lats = data.coord.lat;
      let longs = data.coord.lon;
      forecast5DayAPI(lats,longs)
    });
}

  // <======== Code to fetch and display 5day Weather Forecast ========>
  function forecast5DayAPI (lats,longs) {
    let day5APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lats+"&lon="+longs+"&exclude=minutely,hourly&appid="+apiKey;
    
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
      });
    };



searchBttn.on("click", cityCoordinates);