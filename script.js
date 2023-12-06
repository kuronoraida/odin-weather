async function fetchWeather(location) {
    let weatherPromise = await fetch('https://api.weatherapi.com/v1/current.json?key=94032da22c874d6284824119230612&q=melbourne');
    let weatherData = await weatherPromise.json();
    return weatherData;
}

async function getWeather(location) {
    let weatherData = await fetchWeather(location);
    let weatherObject = {
        tempC: weatherData.current.temp_c,
        tempF: weatherData.current.temp_f
    };
    console.log(weatherObject);
    return weatherObject;
}