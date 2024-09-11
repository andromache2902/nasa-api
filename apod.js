fetch("https://api.nasa.gov/planetary/apod?api_key=tSP6sw9PJdudzSWuU6ykcUvu41P3eWSTMtkfRpAK", {
    "method": "GET"
})
.then(response => response.json())
.then(response => {
    console.log(response);
    document.getElementById("apod-info").innerHTML = response.explanation;
    // document.getElementById("apod-date").innerHTML = response.date;
    document.getElementById("apod-title").innerHTML = response.title;
    document.getElementById("apod-image").src = response.url;
})