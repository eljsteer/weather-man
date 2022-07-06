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

// <!--Stashed Code-->
  // let country = data[i].country.val();
  // let state = data[1].state.val();

  // cityArray.each(function(i,value) {
  //   let specificLoc = country&state;
  //   let locations = ("a");
  //   locations.append(specificLoc);

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude +
//   "<br>Longitude: " + position.coords.longitude;
// }

const searchBttn = $("#search-bttn");
const myLocation = $("#my-location")
let dt = dayjs().unix();
let apiKey = "c21a2246b95017f0e7609338479f2597";
let userLocation = $(".userLoc")
let cityArray = [];
let forecastTime = {

}

searchBttn.on("click", function() {
let cityInput = $("#city-input").val();
let geoLocAPIURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityInput+"&limit=20&appid="+apiKey;
let weatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&units=metric&appid="+apiKey;
// let day5APIURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey;

userLocation.toggleClass("hide");

fetch (weatherAPIURL) 
  .then(function (response) {
  return response.json();
  })
  .then(function (data) {
  console.log(data);
  
  fetch ("https://api.openweathermap.org/data/2.5/forecast?units=metric&lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+apiKey) 
  .then(function (response) {
  return response.json();
  })
  .then(function (data) {
  console.log(data);

  for (i=0; i<data.list.length; i+=8) {
    
  };

  });
  });

});
  // let longitude = data.
  // let latitude = data.
  

  

