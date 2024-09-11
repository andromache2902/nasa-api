let solNumber = 1000;
let photoNumber = 0;
let photoCount;
let roverData;

window.onload = function() {
    solNumber = 1000;
    photoNumber = 0;
    fetchRover();
}

document.getElementById("previous-button").addEventListener("click", () => {
    if(photoNumber === 0) {
        return;
    }
    photoNumber -= 1;
    updateRoverInfo();
});
  
document.getElementById("next-button").addEventListener("click", () => {
    if(photoNumber === photoCount-1) {
        return;
    }
    photoNumber += 1;
    updateRoverInfo();
});

document.getElementById("photo-input").addEventListener("input", () => {
    let userInput = parseInt(document.getElementById("photo-input").value);
    if(userInput >= 1 && userInput <= photoCount) {
        photoNumber = userInput - 1;
        updateRoverInfo();
    }
});


function fetchRover() {
    let adress = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solNumber}&api_key=tSP6sw9PJdudzSWuU6ykcUvu41P3eWSTMtkfRpAK`;
    fetch(adress.toString(), {
        "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        roverData = response;
        photoCount = response.photos.length;
        console.log(photoCount);
        
        launch_date =  response.photos[photoNumber].rover.launch_date;
        landing_date = response.photos[photoNumber].rover.landing_date;
        // max_sol = response.photos[0].rover.max_sol;
        document.getElementById("rover-info").innerHTML = "Launch date: " + launch_date + " / Landing date: " + landing_date;

        updateRoverInfo();
    });
}

function updateRoverInfo() {
    console.log(photoNumber);
    document.getElementById("photo-input").value = photoNumber+1;
    document.getElementById("rover-image").src = roverData.photos[photoNumber].img_src;
}