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
let cityInput = $("#city-input").val();
let dt = dayjs().unix();
let apiKey = "c21a2246b95017f0e7609338479f2597";
let userLocation = $(".userLoc")
let cityArray = [];
let day5APIURL;


searchBttn.on("click", function() {
  // let geoLocAPIURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityInput+"&limit=20&appid="+apiKey;
  // userLocation.toggleClass("hide");
  
  let cityCoordAPIURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&units=metric&appid="+apiKey;
  
    fetch (cityCoordAPIURL) 
    .then(function (response) {
      if(response.status = 200) {
        return response.json();
  
      } else if(response.status != 200) {
          response.innerHTML();
        };
    })
    .then(function(data) {
      // <======== Code to fetch and display 5day Weather Forecast ========>
      let lats = data.coord.lat;
      let longs = data.coord.lon;
        });
    
  let day5APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lats+"&lon="+longs+"&exclude=minutely,hourly&appid="+apiKey;

  function forecast5DayAPI () {
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
        displayToday();
      });
    };
  forecast5DayAPI();
});
