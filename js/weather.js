'use strict';
// valitaan elementit
const notificationElement = document.querySelector(".notification")
const locationElement = document.querySelector(".location p");

// API:n data säiliöidään tänne: //
const weather = {};

weather.temperature = {
	unit : "celsius"
}

const KELVIN = 273;
// API avain //
const key = "";

// Tarkistetaan tukeeko käyttäjän nettisivu geolokaatiota //
if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = "<p>Selaimesi ei tue Geolokaatiota</p>";
}

// Haetaan käyttäjän paikka //
function setPosition(position){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	console.log(position.coords.longitude, position.coords.latitude);

	getWeather(latitude, longitude);
}
// Jos käyttäjä ei anna paikantamis oikeutta. Tulostetaan virheilmoitus //
function showError(error) {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Haetaan säätietio API:n sivulta //
function getWeather(latitude, longitude) {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
	fetch(api)
			.then(function(response){
				let data = response.json();
				return data;
	})
			.then(function(data){
				weather.temperature.value = Math.floor(data.main.temp - KELVIN);
				weather.country = data.sys.country;
				weather.name = data.name;
				weather.country = data.sys.country;
				weather.icon = data.weather[0].icon;
	})
			.then(function(){
				displayWeather();
	})
}
// Tulostetaan Lämpötila näkyviin sivulle DOM:n avulla //
function displayWeather(){
	locationElement.innerHTML = `${weather.name}, ${weather.temperature.value}°<span>C</span>  <img src='https://openweathermap.org/img/w/${weather.icon}.png'>`;
}
// Tulostetaan konsoliin käyttäjän koordinaatit //
console.log(navigator.geolocation.getCurrentPosition);
