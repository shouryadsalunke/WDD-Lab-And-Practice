// Vehicle details for the website
let vehicles = [
    {id: 1, name: "Porsche 911", type: "Car", category: "Sports Car", price: 35000, seats: 2, transmission: "Automatic", fuel: "Petrol", image: "images/porsche-911.jpg", description: "A sports car for a special drive or a memorable weekend."},
    {id: 2, name: "BMW X5", type: "SUV", category: "Luxury SUV", price: 12000, seats: 5, transmission: "Automatic", fuel: "Diesel", image: "images/bmw-x5.jpg", description: "A spacious SUV for comfortable city drives and road trips."},
    {id: 3, name: "Royal Enfield Classic 350", type: "Bike", category: "Cruiser Bike", price: 1200, seats: 2, transmission: "Manual", fuel: "Petrol", image: "images/classic-350.jpg", description: "A classic motorcycle for relaxed rides and weekend escapes."},
    {id: 4, name: "Mercedes-Benz C-Class", type: "Car", category: "Luxury Sedan", price: 9000, seats: 5, transmission: "Automatic", fuel: "Petrol", image: "images/mercedes-c-class.jpg", description: "A comfortable sedan with elegant styling."},
    {id: 5, name: "KTM Duke 390", type: "Bike", category: "Street Bike", price: 1500, seats: 2, transmission: "Manual", fuel: "Petrol", image: "images/ktm-duke-390.jpg", description: "A sporty street bike for an exciting ride."}
];
let selectedVehicle = null;

function money(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}

function showVehicles() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let type = document.getElementById("typeFilter").value;
    let maxPrice = Number(document.getElementById("priceFilter").value);
    let output = "";

    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i];
        if ((v.name + v.type + v.category).toLowerCase().includes(search) &&
            (type == "All" || v.type == type) && v.price <= maxPrice) {
            output += '<div class="vehicle-card"><img src="' + v.image + '" alt="' + v.name + '">';
            output += '<div class="vehicle-info"><span class="vehicle-type">' + v.type + '</span>';
            output += '<h3>' + v.name + '</h3><p>' + v.description + '</p>';
            output += '<div class="vehicle-details">' + v.seats + ' seats | ' + v.transmission + ' | ' + v.fuel + '</div>';
            output += '<div class="vehicle-bottom"><div class="price">' + money(v.price) + ' <small>/ day</small></div>';
            output += '<button onclick="openBooking(' + v.id + ')">Book Ride</button></div></div></div>';
        }
    }
    document.getElementById("vehicleGrid").innerHTML = output;
    document.getElementById("emptyMessage").style.display = output == "" ? "block" : "none";
}

function openBooking(id) {
    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].id == id) selectedVehicle = vehicles[i];
    }
    if (selectedVehicle == null) return;
    let v = selectedVehicle;
    document.getElementById("vehicleSummary").innerHTML =
        '<img src="' + v.image + '" alt="' + v.name + '"><h3>' + v.name + '</h3><p>' + v.description + '</p>' +
        '<p><b>Type:</b> ' + v.category + '</p><p><b>Seats:</b> ' + v.seats + '</p>' +
        '<p><b>Transmission:</b> ' + v.transmission + '</p><p><b>Fuel:</b> ' + v.fuel + '</p>' +
        '<p><b>Daily rental:</b> ' + money(v.price) + '</p>';
    document.getElementById("bookingSection").style.display = "block";
    document.getElementById("bookingSection").scrollIntoView();
    updateTotal();
}

function closeBooking() {
    document.getElementById("bookingSection").style.display = "none";
    document.getElementById("vehicles").scrollIntoView();
}

function updateTotal() {
    if (selectedVehicle == null) return;
    let start = new Date(document.getElementById("pickupDate").value);
    let end = new Date(document.getElementById("dropoffDate").value);
    let total = document.getElementById("estimatedTotal");
    if (isNaN(start) || isNaN(end)) total.innerHTML = "Choose dates";
    else {
        let days = (end - start) / 86400000;
        total.innerHTML = days < 1 ? "Choose valid dates" : money(days * selectedVehicle.price) + " for " + days + " day(s)";
    }
}

function confirmBooking() {
    let name = document.getElementById("customerName").value.trim();
    let email = document.getElementById("customerEmail").value.trim();
    let pickup = document.getElementById("pickupDate").value;
    let dropoff = document.getElementById("dropoffDate").value;
    let location = document.getElementById("pickupLocation").value.trim();
    let days = (new Date(dropoff) - new Date(pickup)) / 86400000;

    if (name == "" || location == "") { alert("Please fill in your name and pick-up location."); return false; }
    if (!email.includes("@") || !email.includes(".")) { alert("Please enter a valid email address."); return false; }
    if (selectedVehicle == null || days < 1) { alert("Please choose valid booking dates."); return false; }

    let bookings = getBookings();
    bookings.push({name: name, email: email, pickup: pickup, dropoff: dropoff, location: location,
        vehicle: selectedVehicle.name, total: days * selectedVehicle.price});
    localStorage.setItem("vahanaBookings", JSON.stringify(bookings));
    alert("Booking saved! This is a demo confirmation.");
    document.getElementById("bookingForm").reset();
    document.getElementById("bookingSection").style.display = "none";
    showBookings();
    document.getElementById("bookings").scrollIntoView();
    return false;
}

function getBookings() {
    let saved = localStorage.getItem("vahanaBookings");
    return saved == null ? [] : JSON.parse(saved);
}

function showBookings() {
    let bookings = getBookings();
    let output = "";
    for (let i = bookings.length - 1; i >= 0; i--) {
        let b = bookings[i];
        output += '<div class="booking-row"><div><h3>' + b.vehicle + '</h3><p>' + b.name + ' | ' + b.location + '</p>';
        output += '<p>' + b.pickup + ' to ' + b.dropoff + '</p></div><div><strong>' + money(b.total) + '</strong><p>Demo booking saved</p></div></div>';
    }
    document.getElementById("bookingHistory").innerHTML = output || "<p>No bookings saved yet.</p>";
}

function clearBookings() {
    if (confirm("Do you want to clear your booking history?")) {
        localStorage.removeItem("vahanaBookings");
        showBookings();
    }
}

function showLogin() { document.getElementById("loginBox").style.display = "block"; }
function hideLogin() { document.getElementById("loginBox").style.display = "none"; }

function loginUser() {
    let name = document.getElementById("loginName").value.trim();
    let email = document.getElementById("loginEmail").value.trim();
    if (name == "" || !email.includes("@") || !email.includes(".")) {
        alert("Please enter your name and a valid email address.");
        return false;
    }
    localStorage.setItem("vahanaUser", name);
    document.getElementById("loginButton").innerHTML = "Hi, " + name;
    hideLogin();
    alert("Welcome to VAHANA, " + name + "!");
    return false;
}

function loadUser() {
    let name = localStorage.getItem("vahanaUser");
    if (name != null) document.getElementById("loginButton").innerHTML = "Hi, " + name;
}

document.getElementById("searchInput").addEventListener("keyup", showVehicles);
document.getElementById("typeFilter").addEventListener("change", showVehicles);
document.getElementById("priceFilter").addEventListener("change", showVehicles);
document.getElementById("pickupDate").addEventListener("change", updateTotal);
document.getElementById("dropoffDate").addEventListener("change", updateTotal);
showVehicles();
showBookings();
loadUser();