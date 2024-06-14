const svgContainer = document.querySelector(".temps");
const svgContainerr = document.querySelectorAll(".cloud");
function setTEmps() {}
fetch("./image/assets/SVG/cloud.svg")
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

  const t= fetch(`https://api.weatherapi.com/v1/forecast.json?key=ae9ee47e36fe4d658c9234801241306&q=${bejaia}&days=7&aqi=yes`).then(res=>res.json()).then(ress=>console.log(ress));
 
  function validateLocation(location) {
    // Expression régulière pour vérifier si la chaîne ne contient que des lettres, chiffres, espaces et tirets
    const regex = /^[a-zA-Z0-9\s-]+$/;
  
    
    return regex.test(location);
  }
  
  const location = 'bejaia'; 

if (!validateLocation(location)) {
  console.error('Erreur: La localisation contient des caractères non autorisés.');
} else {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    
    });
}
