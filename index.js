
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

/* 
{
        "city": "New York", 
        "growth_from_2000_to_2013": "4.8%", 
        "latitude": 40.7127837, 
        "longitude": -74.0059413, 
        "population": "8405837", 
        "rank": "1", 
        "state": "New York"
    }
*/

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    if (wordToMatch == '') return [];
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatch() {
    matchArray = findMatches(this.value, cities);

    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

        return `<div class="box red">
                   City name: <span class="name">${cityName}</span> </br>
                    <span class="population">${stateName} - ${numberWithCommas(place.population)}</span>
                    <div id="map"></div>
                </div>`
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search_input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatch);
searchInput.addEventListener('keyup', displayMatch);

function initMap(lat, lng) {
    const uluru = { lat: lat, lng: lng };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

window.initMap = initMap;