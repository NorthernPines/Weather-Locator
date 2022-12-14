// On search,
    // add city to list of searched cities if new
    // function to get data
    // function to print data
    // reprint list of searched cities

var citiesSearched = [];
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var citiesEl = document.querySelector("#previously-searched");
var apiKey1 = "7fcdffe4db0cbe3ed2fbd7ba33d7dc01";
var apiKey2 = "bc277b439c09d1e02763266e01e3e7b7";
var lattitude;
var longitude;

function displayCities() {
    clearCities();
    savedCities = JSON.parse(window.localStorage.getItem('cities'));
    console.log(savedCities); 
    if (savedCities) {
        citiesSearched = savedCities;
    }
    
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
        window.localStorage.setItem('cities', JSON.stringify(citiesSearched));

        displayCities();
        cityInputEl.value = '';
        displayDailyWeather(city);
        displayWeeklyWeather(city);
    } else {
        alert('Please enter a city name!');
    }
  };

var cityClickHandler = function (event) {
    event.preventDefault();

    var city = event.target.textContent;
    displayDailyWeather(city);
    displayWeeklyWeather(city);
}

function displayDailyWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey1;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.querySelector('#city-display').textContent = city + moment().format(' (M, D, YYYY)');
            document.querySelector('#temp').textContent = "Temp: " + data.main.temp + " Fahrenheit";
            document.querySelector('#wind').textContent = "Wind: " + data.wind.speed + " MPH";
            document.querySelector('#humidity').textContent = "Humidity: " + data.main.humidity + "%";
            lattitude = data.coord.lat;
            longitude = data.coord.lon;
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude +"&appid=" + apiKey1;
            fetch(queryURL2)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var uvIndex = data.daily[0].uvi;
                    
                    var uv = document.querySelector('#uv');
                    uv.style.borderRadius = "5px";
                    uv.textContent = uvIndex;
                    if (uvIndex < 3) {
                        uv.style.backgroundColor = "green";
                    } else if (uvIndex < 7) {
                        uv.style.backgroundColor = "orange";
                    } else {
                        uv.style.backgroundColor = "red";
                    }
                })
        });
}

function displayWeeklyWeather(city) {
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=6&units=imperial&appid=" + apiKey2;
    // fetch(queryURL)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
            
    //     });
}

displayCities();

userFormEl.addEventListener('submit', formSubmitHandler);  //form submit
citiesEl.addEventListener('click', cityClickHandler);