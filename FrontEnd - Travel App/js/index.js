const addBookingForm = document.getElementById("addBookingForm");
const totalAmountField = document.getElementById("totalAmountField");
const addBookingMsg = document.getElementById("addBookingMsg");
const deleteBookingMsg = document.getElementById("deleteBookingMsg");
const bookingsTable = document.getElementById("bookingsTable");
const editForm = document.getElementById("editForm");
var cabFareData = [];
let fromLoc = [];
let toLoc = [];

// Function to add booking detail to db
addBookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    totalAmountField.disabled = false;

    const formData = new FormData(event.target);
    const jsObject = {};
    formData.forEach((value, key) => {
        if(key !== "vehicleName") {
            jsObject[key] = value;
        } else {
            jsObject["vehicle"] = {"vId" : value};
        }
    });
    // console.log(jsObject);
    
    // POST request
    fetch("http://localhost:8080/api/booking/all", {
        method: "POST",
        body: JSON.stringify(jsObject),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status == 500) {
                addFareMsg.innerText = "Failed to add new record";
                addFareMsg.style.color = "red";
            } else if (response.status == 200) {
                location.reload();
                // fareAddForm.reset();
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

// Function to get the bookings data 
function getBookingsData() {
    //   GET request
    fetch("http://localhost:8080/api/booking/all")
        .then((response) => response.json())
        .then((bookings) => {
            console.log(bookings);
            if (bookings.length <= 0) {
                deleteBookingMsg.innerText = "No records exists";
            }
            var bookingsTableData = "";

            for (let booking of bookings) {
                bookingsTableData += "<tr>";
                for (let oneField in booking) { 
                    if (oneField !== "bId") {
                        if (oneField === "vehicle") {
                            bookingsTableData += `<td>${booking[oneField].vName}</td>`
                        } else {
                            bookingsTableData += `<td>${booking[oneField]}</td>`;
                        }
                    }
                }
                bookingsTableData += `<td class='d-flex gap-3 justify-content-center'><a class='btn btn-info' href="./pages/oneBooking.html?bId=${booking['bId']}">View</a><button class='btn btn-danger' onclick=deleteBooking(${booking["bId"]})>Delete</button></td>`;
                bookingsTableData += "</tr>";
            }

            bookingsTable.innerHTML = bookingsTableData;
        })
        .catch((err) => {
            console.log(err);
        });
}

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
                .getElementById("addBookingForm")
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
                .getElementById("addBookingForm")
                .querySelector('[name="vehicleName"]').innerHTML = vehiclesData;
        })
        .catch((err) => {
            console.log(err);
        });
}

// Function to get the toLocations based on what user chooses in from locations
function getToLocations() {
    let fromLoc = document
        .getElementById("addBookingForm")
        .querySelector('[name="fromLocation"]').value;

    if (fromLoc != "") {
        document
            .getElementById("addBookingForm")
            .querySelector('[id="toLocationDiv"]').style.display = "block";

        let toLocationData =
            "<option value='' disabled selected>Select to Location</option>";

        for (let val of cabFareData) {
            if (val.fromLocation === fromLoc) {
                // toLoc.push(val.toLocation);
                toLocationData += `<option value=${val.toLocation}>${val.toLocation}</option>`;
            }
        }
        document
            .getElementById("addBookingForm")
            .querySelector('[name="toLocation"]').innerHTML = toLocationData;
    }
}

// Function to set the total amount based on from and to location
function calculateCabFare() {
    let fromLoc = document
        .getElementById("addBookingForm")
        .querySelector('[name="fromLocation"]').value;
    let toLoc = document
        .getElementById("addBookingForm")
        .querySelector('[name="toLocation"]').value;
    if (fromLoc != "" && toLoc != "") {
        document
            .getElementById("addBookingForm")
            .querySelector('[id="totalAmountDiv"]').style.display = "block";
    }

    for (let fare of cabFareData) {
        if (fare.fromLocation === fromLoc && fare.toLocation === toLoc) {
            document
                .getElementById("addBookingForm")
                .querySelector('[name="totalAmount"]').value = fare.fare;
        }
    }
}

// Function to delete a booking data
function deleteBooking(bId) {
    // DELETE request
    fetch(`http://localhost:8080/api/booking/${bId}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status == 404) {
                deleteFareMsg.innerText = "Failed to delete the record";
                deleteFareMsg.style.color = "red";
            } else if (response.status == 200) {
                location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}