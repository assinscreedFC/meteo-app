const svgContainer = document.querySelector(".temps");

function setTEmps() {}
fetch("./image/assets/SVG/cloud.svg")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((svgContent) => {
    // Injectez le contenu SVG dans l'élément
    svgContainer.innerHTML = svgContent;
  })
  .catch((error) => {
    console.error("Erreur lors du chargement du SVG:", error);
  });
