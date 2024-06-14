const svgContainer = document.querySelector(".temps");
const svgContainerr = document.querySelectorAll(".cloud");
const API_key="ae9ee47e36fe4d658c9234801241306";
const cnt=7;
const weatherIconMapping = {
  1000: 'sun.svg', // Sunny
  1003: 'cloudy-day.svg', // Partly cloudy
  1006: 'cloudy.svg', // Cloudy
  1009: 'cloud.svg', // Overcast
  1030: 'mist.svg', // Mist
  1063: 'rain.svg', // Patchy rain possible (assumed)
  1066: 'snow.svg', // Patchy snow possible
  1069: 'rain.svg', // Patchy sleet possible (assumed)
  1072: 'rain.svg', // Patchy freezing drizzle possible (assumed)
  1087: 'lightning.svg', // Thundery outbreaks possible
  1114: 'snow.svg', // Blowing snow (assumed)
  1117: 'snow.svg', // Blizzard (assumed)
  1135: 'mist.svg', // Fog
  1147: 'mist.svg', // Freezing fog (assumed)
  1150: 'rain.svg', // Patchy light drizzle (assumed)
  1153: 'rain.svg', // Light drizzle (assumed)
  1168: 'rain.svg', // Freezing drizzle (assumed)
  1171: 'rain.svg', // Heavy freezing drizzle (assumed)
  1180: 'rain.svg', // Patchy light rain (assumed)
  1183: 'rain.svg', // Light rain
  1186: 'rain.svg', // Moderate rain at times (assumed)
  1189: 'rain.svg', // Moderate rain
  1192: 'rain.svg', // Heavy rain at times (assumed)
  1195: 'rain.svg', // Heavy rain
  1198: 'rain.svg', // Light freezing rain (assumed)
  1201: 'rain.svg', // Moderate or heavy freezing rain (assumed)
  1204: 'rain.svg', // Light sleet (assumed)
  1207: 'rain.svg', // Moderate or heavy sleet (assumed)
  1210: 'snow.svg', // Patchy light snow (assumed)
  1213: 'snow.svg', // Light snow
  1216: 'snow.svg', // Patchy moderate snow (assumed)
  1219: 'snow.svg', // Moderate snow
  1222: 'snow.svg', // Patchy heavy snow (assumed)
  1225: 'snow.svg', // Heavy snow
  1237: 'rain.svg', // Ice pellets (assumed)
  1240: 'rain.svg', // Light rain shower (assumed)
  1243: 'rain.svg', // Moderate or heavy rain shower (assumed)
  1246: 'rain.svg', // Torrential rain shower (assumed)
  1249: 'rain.svg', // Light sleet showers (assumed)
  1252: 'rain.svg', // Moderate or heavy sleet showers (assumed)
  1255: 'snow.svg', // Light snow showers (assumed)
  1258: 'snow.svg', // Moderate or heavy snow showers (assumed)
  1261: 'rain.svg', // Light showers of ice pellets (assumed)
  1264: 'rain.svg', // Moderate or heavy showers of ice pellets (assumed)
  1273: 'lightning.svg', // Patchy light rain with thunder
  1276: 'lightning.svg', // Moderate or heavy rain with thunder
  1279: 'lightning.svg', // Patchy light snow with thunder (assumed)
  1282: 'lightning.svg' // Moderate or heavy snow with thunder (assumed)
};
let cityName;
//pour cette les svg
function setTEmps(code) {
fetch(`./image/assets/SVG/${code}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((svgContent) => {
   
    svgContainer.innerHTML = svgContent;
    svgContainerr.forEach((e) => (e.innerHTML = svgContent));
  })
  .catch((error) => {
    console.error("Erreur lors du chargement du SVG:", error);
  });

}
 
  function validateLocation(location) {
    // Expression régulière pour vérifier si la chaîne ne contient que des lettres, chiffres, espaces et tirets
    const regex = /^[a-zA-Z0-9\s-]+$/;
  
    
    return regex.test(location);
  }
  
  const locationn = 'bejaia'; 


async function getPos(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${city}&days=7&aqi=yes`);
    
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status} ${response.statusText}`);
    }
    
    const infoLieu = await response.json();
    console.log(infoLieu);
    displayLeft(infoLieu.current,infoLieu.location.name);
    displayRight(infoLieu.current);
  } catch (error) {
    console.error('Erreur:', error);
  }
}
function displayLeft(info,name) {
  console.log(info);
  const left=document.querySelector(".contains-left");
  const h3=left.querySelector("h3");
  const h2=left.querySelector("h2");
  const h1=left.querySelector("h1");
  const p=left.querySelector("p");
  h2.textContent=info.condition.text;
  h3.textContent=name;
  const temperature=parseInt(info.feelslike_c);
  h1.innerHTML=`${temperature
  } °C`;
  const icon=weatherIconMapping[info.condition.code];
  setTEmps(icon);
}
function displayRight(info) {
  const feel=document.querySelector("#feels-like");
  const humidity=document.querySelector("#humidity");
  const wind=document.querySelector("#wind-speed");
  const lukyrain=document.querySelector("#chance-of-rain");
  feel.textContent=`${info.feelslike_c} °C`
  humidity.textContent=`${info.humidity} %`;
  wind.textContent=`${info.wind_kph} km/h`
  lukyrain.textContent=`${info.cloud} %`

}

getPos("bejaia");
const recherche=document.querySelector(".reacher");
recherche.addEventListener("keydown",(e)=>{
  if(e.key==="Enter"){
    if(validateLocation(e.target.value)){
      getPos(e.target.value);
    }else{
      alert("Invalid location des caracter specaux on etait detecter");
    }
    
    console.log(e.target.value);
  console.log(e);
  console.log(e.key);}
});
