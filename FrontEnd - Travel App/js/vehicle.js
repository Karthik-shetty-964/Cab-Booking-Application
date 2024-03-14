const addVehicleForm = document.getElementById("addVehicleForm");
const addVehicleMsg = document.getElementById("addVehicleMsg");
const deleteVehicleMsg = document.getElementById("deleteVehicleMsg");
const vehicleTable = document.getElementById("vehicleTable");
const editForm = document.getElementById("editForm");

// Function to add Vehicle detail to db
addVehicleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsObject = {};
    formData.forEach((value, key) => {
        jsObject[key] = value;
    });

    // POST request
    fetch("http://localhost:8080/api/vehicle/all", {
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

// Funtion to fetch  all the vehicles data
function getVehicleData() {
    //   GET request
    fetch("http://localhost:8080/api/vehicle/all")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.length <= 0) {
                deleteVehicleMsg.innerText = "No records exists";
            }
            var vehicleTableData = "";

            for (let vehicle of data) {
                vehicleTableData += "<tr>";
                for (let oneField in vehicle) {
                    if (oneField !== "vId") {
                        vehicleTableData += `<td>${vehicle[oneField]}</td>`;
                    }
                }
                vehicleTableData += `<td class='d-flex gap-3 justify-content-center'><button class='btn btn-info' data-bs-toggle='modal' data-bs-target='#editVehicleModal' onclick=getVehicle(${vehicle["vId"]})>Edit</button><button class='btn btn-danger' onclick=deleteVehicle(${vehicle["vId"]})>Delete</button></td>`;
                vehicleTableData += "</tr>";
            }

            vehicleTable.innerHTML = vehicleTableData;
        })
        .catch((err) => {
            console.log(err);
        });
}

// Get values of vehicle to edit form
function getVehicle(vId) {
    // GET request
    fetch(`http://localhost:8080/api/vehicle/${vId}`, {
        method: "GET",
    })
        .then((response) => {
            if (response.status == 404) {
                deleteFareMsg.innerText = "Failed to get the record";
                deleteFareMsg.style.color = "red";
            } else if (response.status == 200) {
                return response.json();
            }
        })
        .then((data) => {
            for (const key in data) {
                const value = data[key];
                const inputField = editForm.querySelector(`[name="${key}"]`);
                if (inputField) {
                    inputField.value = value;
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// Function to edit vehicle detail to db
editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const jsObject = {};
    formData.forEach((value, key) => {
        jsObject[key] = value;
    });

    // PUT request
    fetch(`http://localhost:8080/api/vehicle/${jsObject['vId']}`, {
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
            } else if(response.status == 200) {
                location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

// Function to delete a cab fare
function deleteVehicle(vId) {
    // DELETE request
    fetch(`http://localhost:8080/api/vehicle/${vId}`, {
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
