// Variables
let waterButton = document.getElementById('prepare_soil');
let carrotButton = document.getElementById('sow_carrot');
let lettuceButton = document.getElementById('sow_lettuce');
let potatoButton = document.getElementById('sow_potato');
let harvestButton = document.getElementById('harvest');
let soilPatches = document.querySelectorAll('.barepatch');
let carrots = document.querySelectorAll('.carrot_ready');
let potatoes = document.querySelectorAll('.potato_ready');
let lettuces = document.querySelectorAll('.lettuce_ready');

let carrotPlayerCount = document.getElementById('carrot_count');
let lettucePlayerCount = document.getElementById('lettuce_count');
let potatoPlayerCount = document.getElementById('potato_count');

let isWatering = false;
let isHarvesting = false;
let isPlantingCarrots = false;
let isPlantingLettuce = false;
let isPlantingPotato = false;

let numCoinsShown = 0;
let completedGameText = document.getElementById('completed-game');
let pageWrapper = document.querySelector('.wrapper');

let stageButton = document.getElementById('next-round-button');
let popUp = document.getElementById('popup-wrap');

// Functions

function toggleWatering() {
  isWatering = !isWatering;
  toggleButtons(waterButton);
  console.log(`Watering is ${isWatering ? 'on' : 'off'}`); // ternary operator 'isWatering' is truthy='on' or falsy='off'
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

function toggleButtons(activeButton) {
    // activeButton passes the button just clicked as the argument
    // Loop through all buttons and turn them off if not the clicked button.
    for (let button of [waterButton, carrotButton, lettuceButton, potatoButton, harvestButton]) {
      if (button !== activeButton) {
        button.style.opacity = 1;
        // Set the corresponding boolean variable to false
        if (button === waterButton) isWatering = false;
        if (button === carrotButton) isPlantingCarrots = false;
        if (button === lettuceButton) isPlantingLettuce = false;
        if (button === potatoButton) isPlantingPotato = false;
        if (button === harvestButton) isHarvesting = false;
      }
    }
    // Turn on the active button
    activeButton.style.opacity = 0.7;
  }

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

function waterPatch(patch) {
  if (isWatering) {
    patch.classList.add('watered');
    patch.classList.remove('barepatch');
    console.log(`Watered patch ${patch.dataset.id}`);
  } else {
    console.log('Watering is not on');
  }
}

function plantCarrot(patch) {
    // BUG FIX - without the && the user could water patches if water tool had been used anywhere
  if (isPlantingCarrots && patch.classList.contains('watered')) {
    patch.classList.add('carrot_sown');
    patch.classList.remove('watered');

    console.log(`Planted carrot in patch ${patch.dataset.id}`);
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

function winning () {
    if (carrotPlayer === cropTarget [1] && lettucePlayer === cropTarget[0] && potatoPlayer === cropTarget[2]) {
        console.log('You did it!');
        carrotPlayer = 0;
        lettucePlayer = 0;
        potatoPlayer = 0;
        // gold += 100;
        winGoldCoin();
        generateRequestBoardHTML();
        popUpShow();
        // document.querySelector('.score_text').innerHTML = gold;
        // document.querySelector('.request_section').innerHTML = requestBoardHTML;
        carrotPlayerCount.innerHTML = `Carrots: ${carrotPlayer}/${cropTarget[1]}`;
        potatoPlayerCount.innerHTML = `Potatoes: ${potatoPlayer}/${cropTarget[2]}`;
        lettucePlayerCount.innerHTML = `Lettuce: ${lettucePlayer}/${cropTarget[0]}`;
    }
}

function endGame () {
  if ( numCoinsShown === 3 ) {
    completedGameText.style.display = 'flex';
    pageWrapper.style.display = 'none';
  }
}

function popUpShow () { 
  if ( numCoinsShown < 3 ) {
  popUp.style.display = 'flex';

  stageButton.addEventListener('click', () => {
    popUp.style.display = 'none';
  });}
}

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
waterButton.addEventListener('click', toggleWatering);
carrotButton.addEventListener('click', togglePlantingCarrots);
lettuceButton.addEventListener('click', togglePlantingLettuce);
potatoButton.addEventListener('click', togglePlantingPotato);
harvestButton.addEventListener('click', toggleHarvesting);


for (let i = 0; i < soilPatches.length; i++) {
  const patch = soilPatches[i];
  patch.dataset.id = i + 1; // numbers the patches so you can tell which is working

  patch.addEventListener('click', () => {
    waterPatch(patch);
    plantCarrot(patch);
    plantLettuce(patch);
    plantPotato(patch);
    harvestPatch(patch);
  });
}




