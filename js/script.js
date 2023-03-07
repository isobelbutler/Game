// Generate 16 soil patches

let soilHTML = '';

  for (let i = 0; i < 16; i++) {
    soilHTML +=
    `<div class="barepatch"></div>
      `;  
}

document.querySelector('.field_section').insertAdjacentHTML('beforeend', soilHTML); 

// Generate random number request board

let cropPlayer = 0;
const randomNumber = new Set();

    // creates a loop which adds 3x random number between 1 and 5 to a set
while ( randomNumber.size !== 3 ) {
    randomNumber.add(Math.floor(Math.random() * 5) + 1);
    }

    // stores the numbers from the set in an array to make each value easily accesible via it's index number
let cropTarget = Array.from(randomNumber);
let requestBoard =
    `
    <h2>Requests</h2>
    <p>Lettuce: ${cropPlayer}/${cropTarget[0]}</p>
    <p>Carrots: ${cropPlayer}/${cropTarget[1]}</p>
    <p>Potatoes: ${cropPlayer}/${cropTarget[2]}</p>
    `
document.querySelector('.request_section').insertAdjacentHTML('beforeend', requestBoard); 

// Selecting a tile - has it been selected?



