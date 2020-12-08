// button that starts locating user
const locateButton = document.getElementById("locate");
// add event listener for the button
locateButton.addEventListener("click", locateUser);
const routeDuration = document.getElementById("routeDuration");
const routeDistance = document.getElementById("routeDistance");

// create variables
let map;
let infoWindow;
let usersPosition;
let destination;
let directionsService;
let directionsDisplay;
let distanceMatrixService;
let placesService;

// user locating options
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// function to start locating user
function locateUser() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}

// function that's executed after locating user finishes successfully
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

    // create google maps latlng object
    usersPosition = new google.maps.LatLng(coords.latitude, coords.longitude);
    console.log("usersPosition: " + usersPosition);

    // initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        center: usersPosition, // center map to users location
        zoom: 10, // zoom level: City
    });

    // initialize directionsService and directionsDisplay
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    // tell directionsDisplay which map shows the directions
    directionsDisplay.setMap(map);

    // set infoWindow position
    infoWindow.setPosition(usersPosition);
    // set text for infoWindow
    infoWindow.setContent("You are here!");
    infoWindow.open(map);
    // center the map to users location
    map.setCenter(usersPosition);

    // add all campus locations to map
    addCampusMarkersToMap();
}

// function that's executed if there is problem locating user
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function addCampusMarkersToMap() {
    // list of all campus locations
    let kampukset = [
        ["Metropolia",
            ["Karamalmin kampus", 60.223879405232545, 24.758148162087984, "ChIJuzzkz5f3jUYR_znf1CYsmrk"],
            ["Myyrmäen kampus", 60.25861873941745, 24.845471628679366, "ChIJw7hLXh4KkkYRLDqoozvgqx0"],
            ["Myllypuron kampus", 60.22361372368839, 25.078351167193297, "ChIJbwAwoc0IkkYRhLd6rt6sd6c"],
            ["Arabian kampus", 60.214296078265626, 24.980838458134674, "ChIJy6YZ6KcJkkYR5nvFZnZmM7c"]
        ],
        ["Haaga-Helia",
            ["Haagan kampus", 60.21779125030114, 24.906907999543932, "ChIJObaOV-cJkkYROtwZgUy3SwU"],
            ["Malmin kampus", 60.24649167965145, 25.014848999897527, "ChIJlwnW9ZEJkkYRxRsZYD8AKNo"],
            ["Pasilan kampus", 60.20162626078707, 24.934183268674122, "ChIJS4dgamAIkkYRCxi7L6dRplA"],
            ["Porvoon kampus", 60.387642168189714, 25.65520106474498, "ChIJtbs3ICz0kUYRVD1Jb60H7pE"],
            ["Vierumäen kampus", 61.11410960839501, 26.008316350100205, "ChIJe4BGUA8rkEYRhDshaVJQQqU"]
        ],
        ["Laurea",
            ["Leppävaaran kampus", 60.223063446277614, 24.805228736255653, "ChIJEWAwm332jUYRPfWPdQMZXz0"],
            ["Tikkurilan kampus", 60.295239390286, 25.04432238728447, "ChIJeZe47rkHkkYRj3S2joR_Qsc"],
            ["Otaniemen kampus", 60.185871037522105, 24.805442297116894, "ChIJneGhq7_1jUYRq72045CuZAQ"],
            ["Hyvinkään kampus", 60.626453219910104, 24.855087953214962, "ChIJuQsRfSUJjkYRsgLrccLRCms"],
            ["Lohjan kampus", 60.25147601083992, 24.072322614871187, "ChIJc6xBVnm_jUYRy2paWaU0TrI"],
            ["Porvoon kampus", 60.38762304287727, 25.655148516470934, "ChIJfz3NxtT1kUYRLpGSE0Q6hxI"]
        ]
    ];
    console.log(kampukset);
    console.log(kampukset[0][0]); // Metropolia
    console.log(kampukset[0][1][0]); // Karamalmin kampus
    console.log(kampukset[0][1][1]); // Karamalmin kampus latitude
    console.log(kampukset[0][1][2]); // Karamalmin kampus longnitude
    console.log(kampukset[0][1][3]); // Karamalmin kampus placeid
    console.log("---------------");
    console.log(kampukset[1][0]); // Haaga-Helia
    console.log(kampukset[1][1][0]); // Haagan kampus
    console.log("---------------");
    console.log(kampukset[2][0]); // Laurea
    console.log(kampukset[2][1][0]); // Leppävaaran kampus
    console.log("---------------");

    const infowindow = new google.maps.InfoWindow({
        content: "No details available",
    });

    // loop through the campus location list
    let row, column;
    for (row = 0; row < kampukset.length; row++) {
        for (column = 1; column < kampukset[row].length; column++) {
            let marker;
            let school = kampukset[row][0];
            // cmapus name
            let campus = kampukset[row][column][0];
            // campus latitude
            let campusLat = kampukset[row][column][1];
            // campus longnitude
            let campusLng = kampukset[row][column][2];
            let placeId = kampukset[row][column][3];
            console.log("Korkeakoulu:" + school + "->Kampus: " + campus + "; lat: " + campusLat + "; lng: " + campusLng);


            // create new marker for every campus
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(campusLat, campusLng),
                map: map,
                title: campus,
                label: campus
            });

            // add listener to react when user clicks the marker
            marker.addListener("click", () => {
                console.log("Marker position: " + marker.getPosition());
                destination = marker.getPosition();
                console.log("User position: " + usersPosition);
                console.log("Destination: " + destination);

                infowindow.close();
                // get latitude and lognitude position of the marker
                let latlng = {
                    lat: parseFloat(campusLat),
                    lng: parseFloat(campusLng)
                };

                const request = {
                    placeId: placeId,
                    fields: ["name", "formatted_address", "website", "place_id", "geometry"],
                };

                placesService = new google.maps.places.PlacesService(map);
                placesService.getDetails(request, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log("Geometry: " + place.geometry.location + ", Name: " + place.name + ", " + place.place_id + ", " + place.formatted_address + ", website: " + place.website);
                        infowindow.setContent(
                            "<div><strong>" +
                            place.name +
                            "</strong><br>" +
                            "<br> Address: " +
                            place.formatted_address +
                            "<br>" +
                            "Website: " +
                            "<a href=" + place.website + ">" + place.website +
                            "</div>"
                        );
                    };
                });
                infowindow.open(map, marker);
                // calculate route to the campus from users current location and show on maps
                calculateRoute(usersPosition, destination);
                // calculate distance and time between two places
                calculateDistance(usersPosition, destination);
            });
        }
    }
}

// function that calculates route from start point to destination
function calculateRoute(start, destination) {
    // create request for the directions api
    let request = {
        // users location
        origin: start,
        destination: destination,
        // define travelmode for directions
        travelMode: google.maps.TravelMode.DRIVING
    };

    // request directions
    directionsService.route(request, function(response, status) {
        if (status = "OK") {
            directionsDisplay.setDirections(response);
        } else {
            console.log("Error: " + response);
        }
    });
}

function calculateDistance(start, destination) {
    distanceMatrixService = new google.maps.DistanceMatrixService();
    distanceMatrixService.getDistanceMatrix({
        origins: [start],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false
    }, callback);
}

// function to handle response of distanceMatrixService
function callback(response, status) {
    // if we received distance and duration successfully
    if (status == 'OK') {
        let origins = response.originAddresses;
        let destinations = response.destinationAddresses;

        for (let i = 0; i < origins.length; i++) {
            let results = response.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
                let element = results[j];
                let distance = element.distance.text;
                let duration = element.duration.text;
                let from = origins[i];
                let to = destinations[j];
                console.log("Distance: " + distance + ", duration: " + duration);
                routeDuration.innerHTML = "Duration: " + duration;
                routeDistance.innerHTML = "Distance: " + distance;
            }
        }
    } else {
        console.log("DistanceMatrixService response: " + response + ", status: " + status);
    }
}
