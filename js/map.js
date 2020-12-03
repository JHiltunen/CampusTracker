// button that starts locating user
const locateButton = document.getElementById("locate");
// add event listener for the button
locateButton.addEventListener("click", locateUser);
const locationInfo = document.getElementById("location-info");

// create variables for map and infoWindow (users location)
let map, infoWindow;

// options for locating user
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// function to start locating user
function locateUser() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}

// function that's executed after locating user
function success(position) {
    // create infoWindow for users current location
    infoWindow = new google.maps.InfoWindow();
    // get coordinates
    const coords = position.coords;
    // Log location info to console
    console.log('Your current position is:');
    console.log(`Latitude : ${coords.latitude}`);
    console.log(`Longitude: ${coords.longitude}`);
    console.log(`More or less ${coords.accuracy} meters.`);
    locationInfo.innerHTML = `You appear to be at: ${position.coords.latitude}, ${position.coords.longitude}`;

    // create google maps latlng object
    const pos = new google.maps.LatLng(coords.latitude, coords.longitude);
    console.log("pos: " + pos);

    // initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 10,
    });

    // set infoWindow position
    infoWindow.setPosition(pos);
    // set text for infoWindow
    infoWindow.setContent("Location found.");
    infoWindow.open(map);
    // center the map to users location
    map.setCenter(pos);

    // add all campus locations to map
    addCampusMarkersToMap();
}

// function that's executed if there is problem locating user
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function addCampusMarkersToMap() {
    // list of all campus
    let kampukset = [
        ["Metropolia",
            ["Karamalmin kampus", 60.2240338956865, 24.758148999008544],
            ["Myyrmäen kampus", 60.258708097644394, 24.845516925997117],
            ["Myllypuron kampus", 60.22375301266314, 25.078436729691585],
            ["Arabian kampus", 60.21005148402739, 24.976759734731154]
        ],
        ["Haaga-Helia",
            ["Haagan kampus", 60.217925079166534, 24.906908770122506],
            ["Malmin kampus", 60.24659996972551, 25.014864327793546],
            ["Pasilan kampus", 60.2017606788331, 24.934177770122044],
            ["Porvoon kampus", 60.38779792036629, 25.655074081775318],
            ["Vierumäen kampus", 61.114238550659586, 26.00833815665166]
        ],
        ["Laurea",
            ["Leppävaaran kampus", 60.223192737040975, 24.805250306896685],
            ["Tikkurilan kampus", 60.295372893460545, 25.044311770124544],
            ["Otaniemen kampus", 60.186026474783034, 24.805485714297493],
            ["Hyvinkään kampus", 60.62660689454684, 24.855032754792514],
            ["Lohjan kampus", 60.25076695105747, 24.06911337012335],
            ["Porvoon kampus", 60.38775651767422, 25.65511781245651]
        ]
    ];
    console.log(kampukset);
    console.log(kampukset[0][0]); // Metropolia
    console.log(kampukset[0][1][0]); // Karamalmin kampus
    console.log(kampukset[0][1][1]); // Karamalmin kampus latitude
    console.log(kampukset[0][1][2]); // Karamalmin kampus longnitude
    console.log("---------------");
    console.log(kampukset[1][0]); // Haaga-Helia
    console.log(kampukset[1][1][0]); // Haagan kampus
    console.log("---------------");
    console.log(kampukset[2][0]); // Laurea
    console.log(kampukset[2][1][0]); // Leppävaaran kampus
    console.log("---------------");

    // loop through the campus location list
    let marker, row, column;
    for (row = 0; row < kampukset.length; row++) {
        for (column = 1; column < kampukset[row].length; column++) {
            let school = kampukset[row][0];
            let campus = kampukset[row][column][0];
            let campusLat = kampukset[row][column][1];
            let campusLng = kampukset[row][column][2];
            console.log("Korkeakoulu:" + school + "->Kampus: " + campus + "; lat: " + campusLat + "; lng: " + campusLng);
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(campusLat, campusLng),
              map: map,
              title: campus,
              label: campus
            });
        }
    }
}
