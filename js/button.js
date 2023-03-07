// Selecting AND Delescting the WATER tool

let water = document.getElementById('prepare_soil');
let waterClicked = false;

water.addEventListener("click", function changeClickedState() {
    
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

// Selecting an individual SOIL patch with water tool selected and changing state.

const soil = Array.from(document.querySelectorAll('.barepatch'));
let soilClicked = false;

for (let i = 0; i < soil.length; i++) {
    document.querySelectorAll(".barepatch")[i].addEventListener("click", function detectClick(event) {

      var x = document.querySelectorAll(".barepatch")[i];
      if (waterClicked) {
        event.target.setAttribute("class", "watered");
        ;
      } else {
        console.log('Nope, water not selected.');      
    }
      
    });
    }

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

