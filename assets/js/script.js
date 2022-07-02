// Search Block Section to search weather in different Cities
// Search Function to access Weather API's Cities
// Cities Must be saved in Local Storage
// Weather Results must also be saved in Local Storage
// Get function to return already searched cities

// Display Weather Today
// Function to retrieve (to save to variable) or display all weather factors for current day
// Loop Function to display all information for day.

// Display Weather with a 5 Day forecast 


var searchBtn = document.getElementById("searchBtn");



searchBtn.addEventListener("click", function() {
var userInput = document.getElementById("user-input").value;

var apiURL = "https://www.loc.gov/search/?q=" + userInput + "&fo=json";

fetch (apiURL) 
  .then(function (response) {
  return response.json();
  })
  .then(function (data) {
  console.log(data);
  });

})