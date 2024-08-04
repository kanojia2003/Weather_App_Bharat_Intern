let inputValue = document.querySelector('#cityinput');
let btn = document.querySelector('#add');
let city = document.querySelector('#cityoutput');
let description = document.querySelector('#description');
let temp = document.querySelector('#temp');
let wind = document.querySelector('#wind');

const apik = "4d54398cb343577b5cc2fb60ed014071";

function conversion(val) {
    return (val - 273.15).toFixed(2);
}

btn.addEventListener('click', function () {
    let cityValue = inputValue.value.trim();

    if (cityValue === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apik}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('City not found');
            }
            return res.json();
        })
        .then(data => {
            let nameval = data.name;
            let des = data.weather[0].description;
            let temperature = data.main.temp;
            let windspeed = data.wind.speed;

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)} °C</span>`;
            description.innerHTML = `Sky condition: <span>${des}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} km/h</span>`;
        })
        .catch(err => {
            console.error(err);
            alert(err.message);
        });
});
