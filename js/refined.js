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


let isWatering = false;
let isHarvesting = false;
let isPlantingCarrots = false;
let isPlantingLettuce = false;
let isPlantingPotato = false;

// Functions
function toggleWatering() {
  isWatering = !isWatering;
  waterButton.style.opacity = isWatering ? 0.7 : 1;
  console.log(`Watering is ${isWatering ? 'on' : 'off'}`);
}

function togglePlantingCarrots() {
  isPlantingCarrots = !isPlantingCarrots;
  carrotButton.style.opacity = isPlantingCarrots ? 0.7 : 1;
  console.log(`Planting carrots is ${isPlantingCarrots ? 'on' : 'off'}`);
}

function togglePlantingLettuce() {
    isPlantingLettuce = !isPlantingLettuce;
    lettuceButton.style.opacity = isPlantingLettuce ? 0.7 : 1;
    console.log(`Planting lettuce is ${isPlantingLettuce ? 'on' : 'off'}`);
  }

function togglePlantingPotato() {
    isPlantingPotato = !isPlantingPotato;
    potatoButton.style.opacity = isPlantingPotato ? 0.7 : 1;
    console.log(`Planting potato is ${isPlantingPotato ? 'on' : 'off'}`);
  }

function toggleHarvesting() {
    isHarvesting = !isHarvesting;
    harvestButton.style.opacity = isHarvesting ? 0.7 : 1;
    console.log(`Harvesting is ${isHarvesting ? 'on' : 'off'}`);
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
        cropTarget[0] += 1;
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