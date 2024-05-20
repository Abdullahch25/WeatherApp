document.addEventListener("DOMContentLoaded", () => {
    const apikey = '18bcf0f44438d55e2760d1e76c310bcf';
    const cityinput = document.getElementById('city');
    const searchbutton = document.querySelector('.search-button');
    const tempvalue = document.querySelector('.temp');
    const cityname = document.querySelector('.city-name');
    const humidityvalue = document.querySelector('.humidity');
    const windvalue = document.querySelector('.wind');
    const weathericon = document.querySelector('.weather-icon');

    searchbutton.addEventListener('click', () => {
        const city = cityinput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please Enter a City name.');
        }
    });

    function fetchWeather(city) {
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

        fetch(apiurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                return response.json();
            })
            .then(data => {
                UpdateWeather(data);
            })
            .catch(error => {
                alert('Error in fetching data: '+ error.message);
            });
    }

    function UpdateWeather(data) {
        tempvalue.textContent = `${data.main.temp}°C`;
        cityname.textContent = data.name;
        humidityvalue.textContent = `${data.main.humidity}%`;
        windvalue.textContent = `${data.wind.speed} km/h`;
        weathericon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    }
});
