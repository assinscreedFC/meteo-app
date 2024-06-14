
const svgContainerr = document.querySelectorAll(".cloud");
const API_key="ae9ee47e36fe4d658c9234801241306";
const cnt=7;
const weatherIconMapping = {
  1000: 'sun.svg', // Sunny
  1003: 'cloudy-day.svg', // Partly cloudy
  1006: 'cloudy.svg', // Cloudy
  1009: 'cloud.svg', // Overcast
  1030: 'mist.svg', // Mist
  1063: 'rainy.svg', // Patchy rain possible (assumed)
  1066: 'snow.svg', // Patchy snow possible
  1069: 'rainy.svg', // Patchy sleet possible (assumed)
  1072: 'rainy.svg', // Patchy freezing drizzle possible (assumed)
  1087: 'lightning.svg', // Thundery outbreaks possible
  1114: 'snow.svg', // Blowing snow (assumed)
  1117: 'snow.svg', // Blizzard (assumed)
  1135: 'mist.svg', // Fog
  1147: 'mist.svg', // Freezing fog (assumed)
  1150: 'rainy.svg', // Patchy light drizzle (assumed)
  1153: 'rainy.svg', // Light drizzle (assumed)
  1168: 'rainy.svg', // Freezing drizzle (assumed)
  1171: 'rainy.svg', // Heavy freezing drizzle (assumed)
  1180: 'rainy.svg', // Patchy light rain (assumed)
  1183: 'rainy.svg', // Light rain
  1186: 'rainy.svg', // Moderate rain at times (assumed)
  1189: 'rainy.svg', // Moderate rain
  1192: 'rainy.svg', // Heavy rain at times (assumed)
  1195: 'rainy.svg', // Heavy rain
  1198: 'rainy.svg', // Light freezing rain (assumed)
  1201: 'rainy.svg', // Moderate or heavy freezing rain (assumed)
  1204: 'rainy.svg', // Light sleet (assumed)
  1207: 'rainy.svg', // Moderate or heavy sleet (assumed)
  1210: 'snow.svg', // Patchy light snow (assumed)
  1213: 'snow.svg', // Light snow
  1216: 'snow.svg', // Patchy moderate snow (assumed)
  1219: 'snow.svg', // Moderate snow
  1222: 'snow.svg', // Patchy heavy snow (assumed)
  1225: 'snow.svg', // Heavy snow
  1237: 'rainy.svg', // Ice pellets (assumed)
  1240: 'rainy.svg', // Light rain shower (assumed)
  1243: 'rainy.svg', // Moderate or heavy rain shower (assumed)
  1246: 'rainy.svg', // Torrential rain shower (assumed)
  1249: 'rainy.svg', // Light sleet showers (assumed)
  1252: 'rainy.svg', // Moderate or heavy sleet showers (assumed)
  1255: 'snow.svg', // Light snow showers (assumed)
  1258: 'snow.svg', // Moderate or heavy snow showers (assumed)
  1261: 'rainy.svg', // Light showers of ice pellets (assumed)
  1264: 'rainy.svg', // Moderate or heavy showers of ice pellets (assumed)
  1273: 'lightning.svg', // Patchy light rain with thunder
  1276: 'lightning.svg', // Moderate or heavy rain with thunder
  1279: 'lightning.svg', // Patchy light snow with thunder (assumed)
  1282: 'lightning.svg' // Moderate or heavy snow with thunder (assumed)
};

let cityName;
window.onload=()=>{
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log("La géolocalisation n'est pas supportée par ce navigateur.");
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getPos(`${latitude},${longitude}`);

  
  console.log("Latitude :", latitude);
  console.log("Longitude :", longitude);
  
  
}

function errorCallback(error) {
  getPos("bejaia");
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("L'utilisateur a refusé la demande de géolocalisation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Les informations de localisation ne sont pas disponibles.");
      break;
    case error.TIMEOUT:
      console.log("La demande de géolocalisation a expiré.");
      break;
    default:
      console.log("Une erreur inconnue s'est produite.");
      break;
  }
}
}

//pour set les svg
function setTEmps(code,svgContainer) {
fetch(`./image/assets/SVG/${code}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((svgContent) => {
   
    svgContainer.innerHTML = svgContent;
   
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
   

//recuper les information de l"est les envoyer au different function
async function getPos(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${city}&days=8&aqi=yes`);
    
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status} ${response.statusText}`);
    }
    
    const infoLieu = await response.json();
    console.log(infoLieu);
    displayLeft(infoLieu.current,infoLieu.location);
    displayRight(infoLieu.current); console.log(infoLieu.forecast.forecastday);
    forAll(infoLieu.forecast.forecastday);
   
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// set le container a gauche
function displayLeft(info,nom) {
  console.log(info);
  const left=document.querySelector(".contains-left");
  const h3=left.querySelector("h3");
  const h2=left.querySelector("h2");
  const h1=left.querySelector("h1");
  const p=left.querySelector("p");
  h2.textContent=info.condition.text;
  h3.textContent=nom.name;
  const tab=nom.localtime.split(" ");
  p.innerHTML=`${tab[0]} </br>${tab[1]}`;
  const temperature=parseInt(info.temp_c);
  h1.innerHTML=`${temperature
  } °C`;
  const icon=weatherIconMapping[info.condition.code];const svgContainer = document.querySelector(".temps");
  setTEmps(icon,svgContainer);
}
//set le container a droit
function displayRight(info) {
  const feel=document.querySelector("#feels-like");
  const humidity=document.querySelector("#humidity");
  const wind=document.querySelector("#wind-speed");
  const lukyrain=document.querySelector("#chance-of-rain");
  feel.textContent=`${parseInt(info.feelslike_c)} °C`
  humidity.textContent=`${info.humidity} %`;
  wind.textContent=`${info.wind_kph} km/h`
  lukyrain.textContent=`${info.cloud} %`

}
//function pour avoirr une date a parti du format yyyy/mm/jj
function jour(dateStr) {
  
  const dateObj = new Date(dateStr);
  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ];

  // const numeroJour = dateObj.getDay();
  return jours[dateObj.getDay()];
}

function forAll(forecast) {
  const contain = document.querySelector(".contains-card");
  const cards = contain.querySelectorAll(".card");

  cards.forEach((card, index) => {
    const h3 = card.querySelector("h3");
    const h2 = card.querySelector("h2");
    const h4 = card.querySelector("h4");
    const cloud = card.querySelector(".cloud");

    // Obtention de la date en format français
    const date = forecast[index + 1].date;
    const D = jour(date); // Assumant que jour() retourne le jour en français
console.log(date);
    h3.textContent = D;

    const day = forecast[index + 1].day;
    h2.textContent = `${day.maxtemp_c}°C`;
    h4.textContent = `${day.avgtemp_c}°C`;

    const icon = weatherIconMapping[day.condition.code];
    console.log(icon);
    setTEmps(icon,cloud); // Assumant que setTEmps() est une fonction qui gère les icônes météo
  });
}





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
