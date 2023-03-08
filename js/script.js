// Variables

let soilHTML = '';


let requestBoard = '';

let lettucePlayer = 0;
let carrotPlayer = 0;
let potatoPlayer = 0;
let cropTarget = '';

const randomNumber = new Set();


// Loops

// Generate 16 soil patches
  // 1. creates a for loop which generates the soilHTML 16 times.
  // 2. inserts this HTML into the document.

for (let i = 0; i < 16; i++) {
  soilHTML +=
  `<div class="barepatch"></div>`;  
}
  
document.querySelector('.field_section').insertAdjacentHTML('beforeend', soilHTML); 
    
// Generate random number request board

  // 1. creates a while loop which runs until 3x random number between 1 and 5 have been added to a set
  // 2. stores the numbers from the set in the cropTarget array to make each value easily accesible via it's index number
  // 3. Adds the array to the HTML laid over the request board.

while ( randomNumber.size !== 3 ) {
  randomNumber.add(Math.floor(Math.random() * 5) + 1);
}

cropTarget = Array.from(randomNumber);
requestBoard =
  `
  <h2>Requests</h2>
  <p id="lettuce_count">Lettuce: ${lettucePlayer}/${cropTarget[0]}</p>
  <p id="carrot_count">Carrots: ${carrotPlayer}/${cropTarget[1]}</p>
  <p id="potato_count">Potatoes: ${potatoPlayer}/${cropTarget[2]}</p>
  `
document.querySelector('.request_section').insertAdjacentHTML('beforeend', requestBoard); 

    
    
    