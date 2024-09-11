let solNumber = 1000;
let photoNumber = 0;
let photoCount;
let roverData;
let roverName;

window.onload = function() {
    roverName = "curiosity";
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

document.querySelectorAll(".dropdown-content li a").forEach((element) => {
    element.addEventListener("click", async (event) => {
        roverName = event.target.getAttribute("data-rover");
        console.log(roverName);
        fetchRover();
    });
});

 function fetchRover() {
    solNumber = 3000;
    photoNumber = 0;

    if(roverName == "spirit") {
        solNumber = 1000;
    }

    if(roverName == "opportunity") {
        solNumber = 2000;
    }

    roverName = "curiosity";

    let adress = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${solNumber}&api_key=tSP6sw9PJdudzSWuU6ykcUvu41P3eWSTMtkfRpAK`;
    fetch(adress.toString(), {
        "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        roverData = response;
        photoCount = response.photos.length;
        let maxSol = response.photos[photoNumber].rover.max_sol;
        console.log(photoCount);
        console.log(maxSol);
        
        launch_date =  response.photos[photoNumber].rover.launch_date;
        landing_date = response.photos[photoNumber].rover.landing_date;
        // max_sol = response.photos[0].rover.max_sol;
        document.getElementById("rover-name").innerHTML = response.photos[photoNumber].rover.name;
        document.getElementById("rover-info").innerHTML = "Launch date: " + launch_date + " / Landing date: " + landing_date;

        updateRoverInfo();
    });
}

function updateRoverInfo() {
    console.log(photoNumber);
    document.getElementById("photo-input").value = photoNumber+1;
    document.getElementById("rover-image").src = roverData.photos[photoNumber].img_src;
}