// ao digitar o valor da cidade e clicar no botão enter deverá pegar o valor do input.value
// atribuir o valor da string à variavel cidade para que possa ser usada no URL posteriormente.
// Assim que a URL for feita, deverá atribuir URL à função fetchResults
// Dentro da função fetchResults deverá atribuir os valores de velocidade de vento(windspeed), umidade(humidity), UV(uvindex), pressão(pressure) aos respectivos filhos pela manipulação de DOM.
// Criar uma div em que se enquadrará todos os elmentos por meio de 4 elementos paragrafos dentro dessa div.

const input = document.querySelector('input');
const btnInput = document.querySelector('#doSearch');
btnInput.addEventListener('click', getElementValue);

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
  getElementValue();
  }
});

function getElementValue() {
	const inputValue = input.value;
	const cidade = inputValue.replaceAll(' ', '%20');
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json`;
	fetchResults(url);
}

async function fetchWeather(url) {
	const fetchResult = await (await fetch(url)).json();
	return fetchResult;
}

async function fetchResults(url) {
	const result = await fetchWeather(url);
	atribuingElements(result);
}

const checkWhichIcon = (condition) => {
	if (condition === 'Partially cloudy') return 'sky-images/cloudy.svg';
	if (condition === 'Clear') return 'sky-images/sunny.svg';
	if (condition === 'Overcast') return 'sky-images/scatered.svg';
	if (condition.includes('rain') || condition.includes('Rain'))
		return 'sky-images/rain.svg';
};

const displayForecast = () => {
  if(document.querySelector('.hidden')) document.querySelector('.hidden').classList.remove('hidden')
}

function atribuingElements(cityObject) {
	const city = document.querySelector('.city');
	const temp = document.querySelector('.temp');
	const sky = document.querySelector('.sky');
	const rain = document.querySelector('.rain');
	const tempMaxtempMin = document.querySelector('#daytemps');
	const wind = document.querySelector('#wind');
	const humidity = document.querySelector('#humidity');
	const uv = document.querySelector('#uv');
	const pressure = document.querySelector('#pressure');
	const rightCard = document.querySelector('#right-card');
  const srcImage = document.querySelector('#dayImage');
	rightCard.innerHTML = ' ';
	city.textContent = cityObject.resolvedAddress;
	temp.textContent = `${cityObject.currentConditions.temp}°`;
	sky.textContent = cityObject.currentConditions.conditions;
	rain.textContent = rainfunction(cityObject.currentConditions.precipprob);
	tempMaxtempMin.textContent = `${cityObject.days[0].tempmax}°/${cityObject.days[0].tempmin}°`;
	wind.textContent = windFunction(cityObject.currentConditions.windspeed);
	humidity.textContent = `${cityObject.currentConditions.humidity}%`;
	uv.textContent = `${cityObject.currentConditions.uvindex} of 10`;
	pressure.textContent = `${cityObject.currentConditions.pressure}mb`;
  srcImage.src = checkWhichIcon(cityObject.currentConditions.conditions);
	asideFunction(rightCard, cityObject);
	displayForecast();
}

function windFunction(windSpeed) {
  if(!windSpeed) return '0 km/h';
  return `${windSpeed}km/h`;
}
const rainfunction = (objectrain) =>
	objectrain === null ? `0% Chance of rain` : objectrain;

const asideFunction = (rightCard, cityObject) => {
	for (let i = 1; i < 7; i++) {
		const div = document.createElement('div');
		div.classList.add('day');
		const tempMAxTempMin = document.createElement('p');
		tempMAxTempMin.textContent = `${cityObject.days[i].tempmax}°/${cityObject.days[i].tempmin}°`;
		tempMAxTempMin.classList.add('temp-max-min');
		const dayOfWeek = document.createElement('p');
		const weekDayString = weekDay(cityObject.days[i].datetime);
		dayOfWeek.textContent = weekDayString;
		dayOfWeek.classList.add('weekDay');
		const descriptionDiv = document.createElement('div');
		const description = document.createElement('p');
		description.textContent = cityObject.days[i].conditions;
		description.classList.add('description');
		descriptionDiv.appendChild(description);
		const descriptionImage = document.createElement('img');
		descriptionImage.src = checkWhichIcon(cityObject.days[i].conditions);
		descriptionDiv.appendChild(descriptionImage);
		descriptionImage.classList.add('description-image');
		const statsDiv = document.createElement('div');
		statsDiv.appendChild(tempMAxTempMin);
		const precipitationImg = document.createElement('img');
		precipitationImg.src = 'sky-images/umbrella.svg';
		precipitationImg.alt = 'image of umbrella to represent chance of raining';
		const rainSpan = document.createElement('span');
		rainSpan.appendChild(precipitationImg);
		const rainChance = document.createElement('p');
		rainChance.textContent = `${cityObject.days[i].precipprob}%`;
		rainSpan.appendChild(rainChance);
		statsDiv.appendChild(rainSpan);
		div.appendChild(dayOfWeek);
		div.appendChild(descriptionDiv);
		div.appendChild(statsDiv);

		rightCard.appendChild(div);
	}
};

const weekDay = (day) => {
	let x = new Date(day);
	const dayString = x.getDay();
	if (dayString === 0) return 'Monday';
	if (dayString === 1) return 'Tuesday';
	if (dayString === 2) return 'Wednesday';
	if (dayString === 3) return 'Thursday';
	if (dayString === 4) return 'Friday';
	if (dayString === 5) return 'Saturday';
	if (dayString === 6) return 'Sunday';
};

// let cidade = "Belo Horizonte".replaceAll(' ', '%20')
// let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json`

// // fetchResult(url);
// console.log(fetchWeather('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Belo%20Horizonte?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json'));
