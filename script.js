// ================ GET VARIABLES NEEDED =================== //
const canvas = document.getElementById("icon-canvas");
var ctx = canvas.getContext("2d");

const generate = document.getElementById("generate");
const heightInput = document.getElementById("height");
const widthInput = document.getElementById("width");
const probInput = document.getElementById("probability");
const strokeInput = document.getElementById("stroke");
const bgInput = document.getElementById("bg");
const lineColorInput = document.getElementById("line-color");


let height = heightInput.value; 
let width = widthInput.value; 
let prob = probInput.value;
let stroke = strokeInput.value;
let bg = bgInput.value;
let lineColor = lineColorInput.value;


// ================ FUNCTIONS NEEDED =================== //
function init() { // Reset canvas settings, then generate Icon
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  generateIcon();
}

function generateIcon() {
  let coordinates = [];

  // Select random x,y coordinates
  for (let x = 0; x < width; x += 2) {
    const selectX = Math.random() < prob;
    for (let y = 0; y < height; y += 2) {
      const selectY = Math.random() < prob;
      if (selectX && selectY) coordinates.push([x,y]);
    }
  }

  // Draw lines randomly between coordinates
  draw(coordinates);
}

function draw(coordinates) {
  do {
    // Select random pair of coordinates
    const randI = Math.floor(Math.random() * coordinates.length);
    const randJ = Math.floor(Math.random() * coordinates.length); 

    // Draw line between those coordinates
    ctx.strokeStyle = lineColor; ctx.lineWidth = stroke;
    ctx.beginPath(); 
    ctx.moveTo(coordinates[randI][0], coordinates[randI][1]);
    ctx.lineTo(coordinates[randJ][0], coordinates[randJ][1]); ctx.stroke();

    // Delete those coordinates
    coordinates.splice(randI,1); coordinates.splice(randJ,1);
  } while (coordinates.length > 1)
}

init();

// ================ EVENT LISTENERS FOR CONTROLS =================== //
function updateSettings (setting, value) {
  if (setting == "height") height = value;
  else if (setting == "width") width = value;
  else if (setting == "prob") prob = value;
  else if (setting == "stroke") stroke = value;
  else if (setting == "bg") bg = value;
  else if (setting == "lineColor") lineColor = value;

  init();
}

heightInput.oninput = (e) => updateSettings("height", e.target.value);
widthInput.oninput = (e) => updateSettings("width", e.target.value);
probInput.oninput = (e) => updateSettings("prob", e.target.value);
strokeInput.oninput = (e) => updateSettings("stroke", e.target.value);
bgInput.oninput = (e) => updateSettings("bg", e.target.value);
lineColorInput.oninput = (e) => updateSettings("lineColor", e.target.value);


generate.onclick = init;