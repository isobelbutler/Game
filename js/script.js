// Variables
let soilHTML = '';
let requestBoardHTML = '';
let cropTarget = [];

let lettucePlayer = 0;
let carrotPlayer = 0;
let potatoPlayer = 0;

// Functions
function generateRandomNumber() {
  return (Math.floor(Math.random() * 5) + 1);
}

function generateSoilHTML() {
  for (let i = 0; i < 16; i++) {
    soilHTML +=
    `<div class="barepatch"></div>`;  
  }
}

function generateRequestBoardHTML() {
  cropTarget = [
    generateRandomNumber(),
    generateRandomNumber(),
    generateRandomNumber()
  ];
  requestBoardHTML = `
    <h2>Requests</h2>
    <p id="lettuce_count">Lettuce: ${lettucePlayer}/${cropTarget[0]}</p>
    <p id="carrot_count">Carrots: ${carrotPlayer}/${cropTarget[1]}</p>
    <p id="potato_count">Potatoes: ${potatoPlayer}/${cropTarget[2]}</p>
  `;
}

// Generate soil patches
generateSoilHTML();
document.querySelector('.field_section').insertAdjacentHTML('beforeend', soilHTML); 

// Generate request board
generateRequestBoardHTML();
document.querySelector('.request_section').insertAdjacentHTML('beforeend', requestBoardHTML);
