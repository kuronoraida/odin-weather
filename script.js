async function fetchWeather(fromLocation) {
    try {
        let weatherPromise = await fetch(`https://api.weatherapi.com/v1/current.json?key=94032da22c874d6284824119230612&q=${fromLocation}`);
        let weatherData = await weatherPromise.json();
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.log('fetch error');
    }
}

async function getWeather(fromLocation) {
    try {
        let weatherData = await fetchWeather(fromLocation);
        let weatherProcessed = {
            tempC: weatherData.current.temp_c,
            tempF: weatherData.current.temp_f,
            feelslikeC: weatherData.current.feelslike_c,
            feelslikeF: weatherData.current.feelslike_f,
            humidity: weatherData.current.humidity,
            condition: weatherData.current.condition.text,
            location: weatherData.location.name + ', '
                + weatherData.location.region + ', '
                + weatherData.location.country
        };
        updateDOM(weatherProcessed);
    } catch (error) {
        console.log(error);
    }
}

const searchBox = document.querySelector("input[type='search']");
const searchSubmit = document.querySelector("input[type='submit']");
searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchBox.value);
})

const tempC = document.querySelector('.tempc');
const tempF = document.querySelector('.tempf');
const feelslikeC = document.querySelector('.feelslikec');
const feelslikeF = document.querySelector('.feelslikef');
const humidity = document.querySelector('.humidity');
const condition = document.querySelector('.condition');
const currentlocation = document.querySelector('.location');
function updateDOM(weatherData) {
    console.log('updating dom');
    tempC.innerHTML = weatherData.tempC;
    tempF.innerHTML = weatherData.tempF;
    feelslikeC.innerHTML = weatherData.feelslikeC;
    feelslikeF.innerHTML = weatherData.feelslikeF;
    humidity.innerHTML = weatherData.humidity;
    condition.innerHTML = weatherData.condition;
    currentlocation.innerHTML = weatherData.location;
}

const unitSwitch = document.querySelector('.unitswitch');
unitSwitch.addEventListener('click', (e) => {
    if (e.target.checked) {
        tempF.classList.remove('hidden');
        feelslikeF.classList.remove('hidden');
        tempC.classList.add('hidden');
        feelslikeC.classList.add('hidden');
    } else {
        tempC.classList.remove('hidden');
        feelslikeC.classList.remove('hidden');
        tempF.classList.add('hidden');
        feelslikeF.classList.add('hidden');
    }
})

function getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getGeolocationWeather);
    }
  }

function getGeolocationWeather(position) {
    getWeather(`${position.coords.latitude},${position.coords.longitude}`);
};

getGeolocation();