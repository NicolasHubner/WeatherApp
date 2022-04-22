// ao digitar o valor da cidade e clicar no botão enter deverá pegar o valor do input.value
// atribuir o valor da string à variavel cidade para que possa ser usada no URL posteriormente.
// Assim que a URL for feita, deverá atribuir URL à função fetchResults
// Dentro da função fetchResults deverá atribuir os valores de velocidade de vento(windspeed), umidade(humidity), UV(uvindex), pressão(pressure) aos respectivos filhos pela manipulação de DOM.
// Criar uma div em que se enquadrará todos os elmentos por meio de 4 elementos paragrafos dentro dessa div.

const input = document.querySelector('input')
input.addEventListener('click', getElementValue);

function getElementValue(){
    const inputValue = input.value;
    let cidade = inputValue.replaceAll(' ', '%20');
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json`

    
}

function creatingElements(){
    const divAll = document.createElement('div');
    const wind = document.createElement('p');
    const pressure = document.createElement('p')
    const humidity = document.createElement('p');
    const uv = document.createElement('p');
}
async function fetchWeather(url) {
    const fetchResult = await (await fetch(url)).json();
    return fetchResult;
}

async function fetchResults(url){
    const result = await fetchWeather(url);
    console.log(result);
}




let cidade = "Belo Horizonte".replaceAll(' ', '%20')
let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json`

fetchResult(url);
// console.log(fetchWeather('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Belo%20Horizonte?unitGroup=metric&key=5FQDS36YRY7PBV98ZGJ9GMYGX&contentType=json'));
