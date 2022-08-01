// On search,
    // add city to list of searched cities if new
    // function to get data
    // function to print data
    // reprint list of searched cities

var citiesSearched = ["ireland", "budapest"];
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var citiesEl = document.querySelector("#previously-searched");

function displayCities() {
    for (i = 0; i < citiesSearched.length; i++) {
        var city = document.createElement('button');
        city.classList = 'btn';
        city.textContent = citiesSearched[i];
        citiesEl.appendChild(city);
    }
}

function clearCities() {
      
    console.log(citiesEl.firstChild);

    while (citiesEl.hasChildNodes()) {
        citiesEl.removeChild(citiesEl.children[0]);
    }
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    citiesSearched.push(city);
    clearCities();
    displayCities();

    // var username = nameInputEl.value.trim();
  
    // if (username) {
    //   getUserRepos(username);
  
    //   repoContainerEl.textContent = '';
    //   nameInputEl.value = '';
    // } else {
    //   alert('Please enter a GitHub username');
    // }
  };

userFormEl.addEventListener('submit', formSubmitHandler);  //form submit