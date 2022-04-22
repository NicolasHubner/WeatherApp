// ao digitar o valor da cidade e clicar no botão enter deverá pegar o valor do input.value
// atribuir o valor da string à variavel cidade para que possa ser usada no URL posteriormente.
// Assim que a URL for feita, deverá atribuir URL à função fetchResults
// Dentro da função fetchResults deverá atribuir os valores de velocidade de vento(windspeed), umidade(humidity), UV(uvindex), pressão(pressure) aos respectivos filhos pela manipulação de DOM.
// Criar uma div em que se enquadrará todos os elmentos por meio de 4 elementos paragrafos dentro dessa div.

const input = document.querySelector('input');
const btnInput = document.querySelector('#doSearch');
btnInput.addEventListener('click', getElementValue);

function getElementValue(){
    const inputValue = input.value;
    const cidade = inputValue.replaceAll(' ', '%20');
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json`
    fetchResults(url);
}

async function fetchWeather(url) {
    const fetchResult = await (await fetch(url)).json();
    return fetchResult;
}

async function fetchResults(url){
    const result = await fetchWeather(url);
    atribuingElements(result);
}

function atribuingElements(cityObject){
    console.log(cityObject);
    const city = document.querySelector('.city');
    const temp = document.querySelector('.temp');
    const sky = document.querySelector('.sky');
    const rain = document.querySelector('.rain');
    const tempMaxtempMin = document.querySelector('#daytemps');
    const wind = document.querySelector('#wind');
    const humidity = document.querySelector('#humidity');
    const uv = document.querySelector('#uv');
    const pressure = document.querySelector('#pressure');
    city.textContent = cityObject.address;
    temp.textContent = `${cityObject.currentConditions.temp}°`;
    sky.textContent = cityObject.currentConditions.conditions;
    rain.textContent = cityObject.currentConditions.precipprob;
    tempMaxtempMin.textContent = `${cityObject.days[0].tempmax}°/${cityObject.days[0].tempmin}°`
    wind.textContent = `${cityObject.currentConditions.windspeed}km/h`;
    humidity.textContent = `${cityObject.currentConditions.humidity}%`;
    uv.textContent = `${cityObject.currentConditions.uvindex} of 10`;
    pressure.textContent = `${cityObject.currentConditions.pressure}mb`;
}




// let cidade = "Belo Horizonte".replaceAll(' ', '%20')
// let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json`

// // fetchResult(url);
// console.log(fetchWeather('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Belo%20Horizonte?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json'));
