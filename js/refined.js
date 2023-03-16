// This script contains all the functions and listeners which 
// are needed in gameplay rather than on page load (which are in script.js):
//  - Toggling controls.
//  - Using controls on soil patches.
//  - Changing the state of the soil.
//  - Updating the request board.
//  - Completing a round.
//  - Completing the game.

// Contents:
// 1. Variables
// 2. Functions
// 3. Event Listeners.

// Variables

  // User Controls
let waterButton = document.getElementById('prepare_soil');
let carrotButton = document.getElementById('sow_carrot');
let lettuceButton = document.getElementById('sow_lettuce');
let potatoButton = document.getElementById('sow_potato');
let harvestButton = document.getElementById('harvest');

  // Soilpatch states - empty/seed sown
let soilPatches = document.querySelectorAll('.barepatch');
let carrots = document.querySelectorAll('.carrot_ready');
let potatoes = document.querySelectorAll('.potato_ready');
let lettuces = document.querySelectorAll('.lettuce_ready');

  // Counters for how many crops user has harvested 
let carrotPlayerCount = document.getElementById('carrot_count');
let lettucePlayerCount = document.getElementById('lettuce_count');
let potatoPlayerCount = document.getElementById('potato_count');

  // Booleans for toggling controls (default = off)
let isWatering = false;
let isHarvesting = false;
let isPlantingCarrots = false;
let isPlantingLettuce = false;
let isPlantingPotato = false;

  // Counter for gold coins which = rounds completed
let numCoinsShown = 0;

  // The onload screen and the game complete screen 
let completedGameText = document.getElementById('completed-game'); /* shown at game completion */
let pageWrapper = document.querySelector('.wrapper'); /* shown on load */

  // 'You earnt a coin' pop-up wrapper and 'okay' button for when user completes a round
let stageButton = document.getElementById('next-round-button');
let popUp = document.getElementById('popup-wrap');

// Functions

  // The next 5 'toggleX' functions toggle user control states and call the toggleButtons 
  // function which changes the active button display and makes sure all other 
  // controls are off. This prevents multiple buttons being selected simultaneously, 
  // which would allow the user to do things like water and sow a seed at the same time.
function toggleWatering() {
  isWatering = !isWatering; // negation operator sets isWatering to whatever the other boolean state is
  toggleButtons(waterButton);
  console.log(`Watering is ${isWatering ? 'on' : 'off'}`); // ternary operator 'isWatering' is/? truthy = 'on' or/: falsy = 'off'
}

function togglePlantingCarrots() {
  isPlantingCarrots = !isPlantingCarrots;
  toggleButtons(carrotButton);
  console.log(`Planting carrots is ${isPlantingCarrots ? 'on' : 'off'}`);
}

function togglePlantingLettuce() {
    isPlantingLettuce = !isPlantingLettuce;
    toggleButtons(lettuceButton);
    console.log(`Planting lettuce is ${isPlantingLettuce ? 'on' : 'off'}`);
  }

function togglePlantingPotato() {
    isPlantingPotato = !isPlantingPotato;
    toggleButtons(potatoButton);
    console.log(`Planting potato is ${isPlantingPotato ? 'on' : 'off'}`);
  }

function toggleHarvesting() {
    isHarvesting = !isHarvesting;
    toggleButtons(harvestButton);
    console.log(`Harvesting is ${isHarvesting ? 'on' : 'off'}`);
}

  // Toggle active control display, and turn all other controls off.
    // toggleButtons is called by the previous 5 'toggleX' functions. It passes the clicked 
    // control (represented by 'activeButton') as the argument and then loops through all 
    // other controls and turns them off if not the clicked control by setting their boolean value
    // to false. It also reduces the opacity of the clicked control so that it's clear it's selected
function toggleButtons(activeButton) {
    for (let button of [waterButton, carrotButton, lettuceButton, potatoButton, harvestButton]) {
      
      // true if the control was not the clicked control */
      if (button !== activeButton) { 

        // this is the default styling, but will mean previously clicked buttons will change back to the default when another is clicked */
        button.style.opacity = 1; 
        
        // set the corresponding boolean variable to false
        if (button === waterButton) isWatering = false;
        if (button === carrotButton) isPlantingCarrots = false;
        if (button === lettuceButton) isPlantingLettuce = false;
        if (button === potatoButton) isPlantingPotato = false;
        if (button === harvestButton) isHarvesting = false;
      }
    }
    // turn on the active button
    activeButton.style.opacity = 0.7;
  }

  // The next 3 'countX' functions run only if the player has not already harvested the target amount of that crop.
  // This prevents the request board from displaying a score such as 'Carrots: 5/3'.
  // It is called in the harvestPatch function (below), adds 1 to the harvested crop counter, and replaces the
  // request board HTML with the updated number. 
function countCarrots() {
    if ( carrotPlayer < cropTarget[1] ) {
        carrotPlayer++;
        carrotPlayerCount.innerHTML = `Carrots: ${carrotPlayer}/${cropTarget[1]}`;
  }
}

function countLettuce() {
    if ( lettucePlayer < cropTarget[0] ) {
        lettucePlayer++;
        lettucePlayerCount.innerHTML = `Lettuce: ${lettucePlayer}/${cropTarget[0]}`;
    }
  }

function countPotatoes() {
    if (potatoPlayer < cropTarget[2] ) {
        potatoPlayer++;
        potatoPlayerCount.innerHTML = `Potatoes: ${potatoPlayer}/${cropTarget[2]}`;
}
}

  // Changes the class of the soilpatch from the default 'barepatch' to 'watered'
  // upon click. (Event listener is at bottom of script). This changes the appearance
  // of the soilpatch, and also means the 'plantX' functions (below) will now work on the 
  // targeted soilpatch.
function waterPatch(patch) {
  // checks that the watering control is active 
  if (isWatering) {
    // adds the watered class
    patch.classList.add('watered');
    // removes the default barepatch class
    patch.classList.remove('barepatch');
    // logs which patch was watered in the console
    console.log(`Watered patch ${patch.dataset.id}`);
  } else {
    // logs that watering is not on (helps with debugging)
    console.log('Watering is not on');
  }
}

  // The next three 'plantX' functions work similarly to the above 'waterPatch' function but 
  // contain an extra conditional, two class changes, and a timer function.
function plantCarrot(patch) {
  
  // checks that the sow carrots control is active, and that the soil patch has been watered.
  if (isPlantingCarrots && patch.classList.contains('watered')) {
    patch.classList.add('carrot_sown');
    patch.classList.remove('watered');
    console.log(`Planted carrot in patch ${patch.dataset.id}`);

    // adds a three second delay between the class change from seed_sown to seed_ready
    setTimeout(() => {
      patch.classList.add('carrot_ready');
      patch.classList.remove('carrot_sown');
      console.log(`Carrot in patch ${patch.dataset.id} is ready`);
    }, 3000);
  } else {
    console.log('Planting carrots is not on');
  }
}

function plantLettuce(patch) {
  if (isPlantingLettuce && patch.classList.contains('watered')) {
    patch.classList.add('lettuce_sown');
    patch.classList.remove('watered');

    console.log(`Planted lettuce in patch ${patch.dataset.id}`);
    setTimeout(() => {
      patch.classList.add('lettuce_ready');
      patch.classList.remove('lettuce_sown');

      console.log(`Lettuce in patch ${patch.dataset.id} is ready`);
    }, 3000);
  } else {
    console.log('Planting lettuce is not on');
  }
}

function plantPotato(patch) {
    if (isPlantingPotato && patch.classList.contains('watered')) {
      patch.classList.add('potato_sown');
      patch.classList.remove('watered');
  
      console.log(`Planted potato in patch ${patch.dataset.id}`);
      setTimeout(() => {
        patch.classList.add('potato_ready');
        patch.classList.remove('potato_sown');
        console.log(`Potato in patch ${patch.dataset.id} is ready`);
      }, 3000);
    } else {
      console.log('Planting potato is not on');
    }
  }

  // Again works similarly to the above functions, but this time the 'countXCrop' function 
  // is called which updates the request board totals. The soilpatch class changes back 
  // to the original 'barepatch' so that the soilpatch can be used again. 
  // The 'winning' function is called here.
function harvestPatch(patch) {
    if (isHarvesting && patch.classList.contains('carrot_ready')) {
        countCarrots();
        console.log(`You've harvested ${carrotPlayer}/${cropTarget[1]} carrots!`);
        patch.classList.add('barepatch');
        patch.classList.remove('carrot_ready');
    } else if (isHarvesting && patch.classList.contains('lettuce_ready')) {
        countLettuce();
        console.log(`You've harvested ${lettucePlayer}/${cropTarget[0]} lettuce!`);
        patch.classList.add('barepatch');
        patch.classList.remove('lettuce_ready');
    } else if (isHarvesting && patch.classList.contains('potato_ready')) {
        countPotatoes();
        console.log(`You've harvested ${potatoPlayer}/${cropTarget[2]} potatoes!`);
        patch.classList.add('barepatch');
        patch.classList.remove('potato_ready');
    } else {
        console.log('Nothing harvested.');
    }
    winning();
}

  // Checks to see if the player has completed all of the requests on the request board.
  // If they have then the following happens: 
  //  1. The console logs 'You did it!'
  //  2. The user crop counters all reset to 0 ready for the next round.
  //  3. The 'winGoldCoin' function is called which replaces a greyed out coin with a gold coin.
  //  4. The 'generateRequestBoardHTML' function generates a new request board with three new crop targets  
  //    and the reset counters for the player to work towards.
  //  5. The 'popUpShow' function displays a pop-up which tells the player they've earnt a gold coin.
          // n.b. popUpShow has to be called after winGoldCoin, otherwise the popup appears on the endgame screen.
  //  6. Renders the above onto the page by replacing the old request board.

function winning () {
  if (carrotPlayer === cropTarget [1] && lettucePlayer === cropTarget[0] && potatoPlayer === cropTarget[2]) {
      console.log('You did it!');
      carrotPlayer = 0;
      lettucePlayer = 0;
      potatoPlayer = 0;
      winGoldCoin();
      generateRequestBoardHTML();
      popUpShow();
      carrotPlayerCount.innerHTML = `Carrots: ${carrotPlayer}/${cropTarget[1]}`;
      potatoPlayerCount.innerHTML = `Potatoes: ${potatoPlayer}/${cropTarget[2]}`;
      lettucePlayerCount.innerHTML = `Lettuce: ${lettucePlayer}/${cropTarget[0]}`;
  }
}


  // Replaces the entire document with an end game screen that announces the game is over.
  // Only works when the player has earnt all 3 gold coins.
  // Called in winGoldCoin function (below).
function endGame () {
  if ( numCoinsShown === 3 ) {
    completedGameText.style.display = 'flex';
    pageWrapper.style.display = 'none';
  }
}

  // Makes a pop-up appear telling the user they've earnt a gold coin by switching display: none, to flex.
  // After the user clicks 'okay' (stageButton), the pop-up hides again.
  // Only appears if the user has less then three gold coins as on the third coin we want to call the endGame function instead.
  // Called in winning function (above).
function popUpShow () { 
  if ( numCoinsShown < 3 ) {
  popUp.style.display = 'flex';

  stageButton.addEventListener('click', () => {
    popUp.style.display = 'none';
  });}
}

  // Changes the appearance of the coins when round completed.
  // Accesses which coin to affect through using the numCoinsShown counter as an index number.
  // Adds 1 to the numCoinsShown counter.
  // Calls endGame, which will only work if the numCoinsShown counter has reached 3.
  // Again only appears if user has less than three gold coins.
  // Also called in winning function (above).
function winGoldCoin () {
  let greyCoins = document.querySelectorAll('.grey_coin');
  let goldCoins = document.querySelectorAll('.gold_coin');

  if ( numCoinsShown < greyCoins.length ) {
   greyCoins[numCoinsShown].style.display = 'none'; 
   goldCoins[numCoinsShown].style.display = 'flex';
   numCoinsShown++;
   endGame();
  }
}

// Event listeners

  // Listeners for all the user controls. 
  // When clicked a toggleX function is called, which changes the active button 
  // apearance, switches the boolean value, and turns all other controls to false (off).
waterButton.addEventListener('click', toggleWatering);
carrotButton.addEventListener('click', togglePlantingCarrots);
lettuceButton.addEventListener('click', togglePlantingLettuce);
potatoButton.addEventListener('click', togglePlantingPotato);
harvestButton.addEventListener('click', toggleHarvesting);

  // Loops through the soilPatches and attaches a listener to every individual patch.
  // 'patch' represents one tile on the board.
  // Each patch listens for multiple functions: watering, planting, harvesting.
for (let i = 0; i < soilPatches.length; i++) {
  const patch = soilPatches[i];
  patch.dataset.id = i + 1; // numbers the patches so you can tell which is working in the console

  patch.addEventListener('click', () => {
    waterPatch(patch);
    plantCarrot(patch);
    plantLettuce(patch);
    plantPotato(patch);
    harvestPatch(patch);
  });
}




