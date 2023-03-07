// Variables
    // Compile at end to avoid confusion

// Selecting AND Deselecting the WATER tool

let water = document.getElementById('prepare_soil');
let waterClicked = false;

water.addEventListener("click", function changeClickedState() {
    
    // toggles water tool true/false state 
    if(waterClicked) {
      waterClicked = false;
      this.style.opacity = "1";
      console.log('Water tool deselected');
    } else {
        this.style.opacity = "0.7";
        waterClicked = true;
        console.log('Water tool selected');
    }
  }); 

// Selecting CARROTS

let carrot = document.getElementById('sow_carrot');
let carrotClicked = false;

carrot.addEventListener("click", function changeClickedState() {
    
    // toggles water tool true/false state 
    if(carrotClicked) {
      carrotClicked = false;
      this.style.opacity = "1";
      console.log('Carrot tool deselected');
    } else {
        this.style.opacity = "0.7";
        carrotClicked = true;
        console.log('Carrot tool selected');
    }
  }); 


// Selecting an individual SOIL patch with water tool selected and changing state.

const bareSoil = Array.from(document.querySelectorAll('.barepatch'));
let soilWatered = false;
let wateredSoil = '';

for (let i = 0; i < bareSoil.length; i++) {
    bareSoil[i].addEventListener("click", function detectClick(event) {
        if (waterClicked) {
            event.target.outerHTML = `<div class="watered"></div>`;
            soilWatered = true;
        } else {
            console.log('Nope, water not selected.');      
        }
        wateredSoil = Array.from(document.querySelectorAll('.watered'));
        for (let j = 0; j < wateredSoil.length; j++) {
            wateredSoil[j].addEventListener("click", function checkClick(event) {
                if (carrotClicked) {
                    event.target.setAttribute("class", "carrot_sown");
                    carrotSown = true;
                    console.log('Carrot planted!');
                } else {
                    console.log('Nope, carrot not planted.');      
                }
            })
        };
    })
};

// for (let i = 0; i < bareSoil.length; i++) {
//     // this query selector loops through all the soil patches and adds a listener to each tile
//     bareSoil[i].addEventListener("click", function detectClick(event) {
//       if (waterClicked) {
//         // using target means only the clicked on tile will be affected 
//         // event.target.setAttribute("class", "watered");
//         event.target.outerHTML = `<div class="watered"></div>`;
//         soilWatered = true;
//       } else {
//         console.log('Nope, water not selected.');      
//         }
//     wateredSoil = Array.from(document.querySelectorAll('.watered'));
//     })
// };

// // Selecting WATERED soil patch

// let carrotSown = false;
// console.log(wateredSoil);

// for (let i = 0; i < wateredSoil.length; i++) {
//     wateredSoil[i].addEventListener("click", function checkClick(event) {
//       if (carrotClicked) {
//         // using target means only the clicked on tile will be affected 
//         event.target.setAttribute("class", "carrot_sown");
//         carrotSown = true;
//         console.log('Carrot planted!');
//       } else {
//         console.log('Nope, carrot not planted.');      
//         }
//     })
// };

// Why isn't this working?!



// OLD CODE - 

    // Originally used this but couldn't find a way to easily 
    // add in a conditional statement for waterClicked = true.

    // soil.forEach(barepatch => {
    //     barepatch.addEventListener('click', function detectClick(event) {
    //     barepatch.setAttribute('style', 'background-image: none;');
    //     event.target.setAttribute("id", "selected");
    //     soilClicked = true;
    //     console.log('Patch selected');
    //   });
    // });

    // Listening for clicks OFF soilpatch

    // document.addEventListener('click', function clickedOff(event) {
    //     console.log('What was clicked?:', event.target);
    //     if ('.barepatch' !== event.target) {
    //         soilClicked = false;
    //         console.log('Clicked off Soilpatch');
    //     }
    // });

