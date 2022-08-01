// On search,
    // add city to list of searched cities if new
    // function to get data
    // function to print data
    // reprint list of searched cities

    var citiesSearched = ["ireland", "budapest"];

    function displayCities() {
        var citiesEl = document.querySelector("#previously-searched");
        for (i = 0; i < citiesSearched.length; i++) {
            var city = document.createElement('button');
            city.classList = 'btn';
            city.textContent = citiesSearched[i];
            citiesEl.appendChild(city);
        }
    }

    displayCities();