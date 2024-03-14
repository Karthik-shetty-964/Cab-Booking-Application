var bId;
const bookingFields = document.getElementsByClassName("bData");
const vehicleFields = document.getElementsByClassName("vData");
const editForm = document.getElementById("editForm");
const totalAmount = document.getElementById("totalAmount");
var cabFareData = [];
let fromLoc = [];

// Function to fetch the booking Id from the URL
function getBId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    bId = urlParams.get("bId");
    document.getElementById("bIdHeader").innerText = "Booking ID : " + bId;
}

// Function to get the single booking data 
function getBookingData() {
    //   GET request
    fetch(`http://localhost:8080/api/booking/${bId}`)
        .then((response) => response.json())
        .then((booking) => {
            console.log(booking);
            let i = 0;
            for (let field in booking) {
                if (field !== "bId") {
                    if (field !== "vehicle") {
                        bookingFields[i++].innerHTML = booking[field];
                    }
                }
            }
            i = 0;
            for (let field in booking.vehicle) {
                if (field !== "vId") {
                    vehicleFields[i++].innerHTML = booking.vehicle[field];
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// Get values of booking to edit form
function getVehicle() {
    // GET request
    fetch(`http://localhost:8080/api/booking/${bId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Booking data : " + data);
            for (const key in data) {
                const value = data[key];
                var inputField;
                if(key === "vehicle") {
                    editForm.querySelector(`[name="vehicleName"]`).value = data[key].vId;
                    continue;
                } else {
                    inputField = editForm.querySelector(`[name="${key}"]`);
                }
                if (key === "bDateTime") {
                    const originalDate = new Date(value);
                    const formattedDateString = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')}T${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
                    inputField.value = formattedDateString;
                } else  {
                    inputField.value = value;
                }
                if (key === "fromLocation") {
                    getToLocations();
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// Function to edit booking detail
editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    totalAmount.disabled = false;

    const formData = new FormData(event.target);
    const jsObject = {};
    formData.forEach((value, key) => {
        if (key !== "vehicleName") {
            jsObject[key] = value;
        } else {
            jsObject["vehicle"] = { "vId": value };
        }
    });

    // PUT request
    fetch(`http://localhost:8080/api/booking/${bId}`, {
        method: "PUT",
        body: JSON.stringify(jsObject),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status == 500) {
                console.log("Record is not updated");
            } else if (response.status == 404) {
                console.log("Record not found");
            } else if (response.status == 200) {
                location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
});


// Funtion to fetch  all the vehicles and location data
function getVehicleData() {
    //   GET request to fetch location data
    fetch("http://localhost:8080/api/cab-fare/all")
        .then((response) => response.json())
        .then((data) => {
            cabFareData = data;
            console.log(cabFareData);

            // get unique fromLocation and to Location
            for (let val of data) {
                if (!fromLoc.includes(val.fromLocation)) {
                    fromLoc.push(val.fromLocation);
                }
            }
            // console.log(fromLoc);
            // console.log(toLoc);
            let fromLocationData =
                "<option value='' disabled selected>Select from Location</option>";
            for (let loc of fromLoc) {
                fromLocationData += `<option value=${loc}>${loc}</option>`;
            }
            // console.log(fromLocationData);
            document
                .getElementById("editForm")
                .querySelector('[name="fromLocation"]').innerHTML = fromLocationData;
        })
        .catch((err) => {
            console.log(err);
        });

    //   GET request fetch all the vehicle data
    fetch("http://localhost:8080/api/vehicle/all")
        .then((response) => response.json())
        .then((vehicles) => {
            let vehiclesData =
                "<option disabled selected>Choose your vehicle</option>";
            for (let vehicle of vehicles) {
                vehiclesData += `<option value=${vehicle.vId}>${vehicle.vName}</option>`;
            }

            document
                .getElementById("editForm")
                .querySelector('[name="vehicleName"]').innerHTML = vehiclesData;

        })
        .catch((err) => {
            console.log(err);
        });
}

// Function to get the toLocations based on what user chooses in from locations
function getToLocations() {
    let fromLoca = document
        .getElementById("editForm")
        .querySelector('[name="fromLocation"]').value;

    let toLocationData =
        "<option value='' disabled selected>Select to Location</option>";

    for (let val of cabFareData) {
        if (val.fromLocation === fromLoca) {
            // toLoc.push(val.toLocation);
            toLocationData += `<option value=${val.toLocation}>${val.toLocation}</option>`;
        }
    }
    document
        .getElementById("editForm")
        .querySelector('[name="toLocation"]').innerHTML = toLocationData;

}

// Function to set the total amount based on from and to location
function calculateCabFare() {
    let fromLoca = document
        .getElementById("editForm")
        .querySelector('[name="fromLocation"]').value;
    let toLoca = document
        .getElementById("editForm")
        .querySelector('[name="toLocation"]').value;

    for (let fare of cabFareData) {
        if (fare.fromLocation === fromLoca && fare.toLocation === toLoca) {
            document
                .getElementById("editForm")
                .querySelector('[name="totalAmount"]').value = fare.fare;
        }
    }
}