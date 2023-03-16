// This script contains the functions for generating HTML 
// content that is displayed upon page load: 
//    - The soil patches
//    - The request board
//    - The random number generator which is displayed on the request board.

// Contents:
// 1. Variables
// 2. Functions
// 3. Call Functions and Access DOM

// Variables

let soilHTML = '';
let requestBoardHTML = '';

let cropTarget = []; /* is an array so that index numbers can be accessed */

let lettucePlayer = 0;
let carrotPlayer = 0;
let potatoPlayer = 0;

// Functions

  // Generates a random whole number between 1 and 5
function generateRandomNumber() {
  return (Math.floor(Math.random() * 5) + 1); /* n.b. math.floor rounds down */
}

  // Generates 16 identical soil patches
function generateSoilHTML() {
  for (let i = 0; i < 16; i++) {
    soilHTML +=
    `<div class="barepatch"></div>`;  
  }
}
  // Assigns three of the random numbers from the generateRandomNumber 
  // function to the cropTarget array and then interpolates them into 
  // an HTML request board, with the three different numbers accessed via 
  // their index number. Note: indexes start at 0.
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

// Call Functions and Access DOM

  // Calls soil generating function and renders the HTML on the page
generateSoilHTML();
document.querySelector('.field_section').insertAdjacentHTML('beforeend', soilHTML); 

  // Calls request board generating function and renders the board HTML on the page
generateRequestBoardHTML();
document.querySelector('.request_section').insertAdjacentHTML('beforeend', requestBoardHTML);

