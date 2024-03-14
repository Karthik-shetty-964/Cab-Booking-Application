const fareAddForm = document.getElementById("cabFareForm");
const addFareMsg = document.getElementById("addFareMsg");
const deleteFareMsg = document.getElementById("deleteFareMsg");
const cabFareTable = document.getElementById("cabFareTable");
const editForm = document.getElementById("editForm");

// Function to add Cab Fare detail to db
fareAddForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const jsObject = {};
    formData.forEach((value, key) => {
        jsObject[key] = value;
    });

    // POST request
    fetch("http://localhost:8080/api/cab-fare/all", {
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

// Funtion to fetch  all the cab fares data
function getCabFareData() {
    //   GET request
    fetch("http://localhost:8080/api/cab-fare/all")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.length <= 0) {
                deleteFareMsg.innerText = "No records exists";
            }
            var fareTable = "";

            for (let fare of data) {
                fareTable += "<tr>";
                for (let oneField in fare) {
                    if (oneField !== "fid") {
                        fareTable += `<td>${fare[oneField]}</td>`;
                    }
                }
                fareTable += `<td class='d-flex gap-3 justify-content-center'><button class='btn btn-info' data-bs-toggle='modal' data-bs-target='#editFareModal' onclick=getCabFare(${fare["fid"]})>Edit</button><button class='btn btn-danger' onclick=deleteCabFare(${fare["fid"]})>Delete</button></td>`;
                fareTable += "</tr>";
            }

            cabFareTable.innerHTML = fareTable;
        })
        .catch((err) => {
            console.log(err);
        });
}

// Get values of cab fare to edit form
function getCabFare(fId) {
    // GET request
    fetch(`http://localhost:8080/api/cab-fare/${fId}`, {
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

// Function to edit Cab Fare detail to db
editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const jsObject = {};
    formData.forEach((value, key) => {
        jsObject[key] = value;
    });
    // PUT request
    fetch(`http://localhost:8080/api/cab-fare/${jsObject['fid']}`, {
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
function deleteCabFare(fId) {
    // DELETE request
    fetch(`http://localhost:8080/api/cab-fare/${fId}`, {
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
