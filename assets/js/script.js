// On search,
    // add city to list of searched cities if new
    // function to get data
    // function to print data
    // reprint list of searched cities

var citiesSearched = [];
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var citiesEl = document.querySelector("#previously-searched");
var apiKey = "7fcdffe4db0cbe3ed2fbd7ba33d7dc01";

function displayCities() {
    clearCities();
    for (i = 0; i < citiesSearched.length; i++) {
        var city = document.createElement('button');
        city.classList = 'btn';
        city.textContent = citiesSearched[i];
        citiesEl.appendChild(city);
    }
}

function clearCities() {

    while (citiesEl.hasChildNodes()) {
        citiesEl.removeChild(citiesEl.children[0]);
    }
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
  
    if (city) {
        citiesSearched.push(city);
        displayCities();
        cityInputEl.value = '';
        displayWeather(city);
    } else {
        alert('Please enter a city name!');
    }
  };

function displayWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

userFormEl.addEventListener('submit', formSubmitHandler);  //form submit