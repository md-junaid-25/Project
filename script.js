// household page //

let electricity = document.getElementById('electricity');
let coal = document.getElementById('coal');
let lpg = document.getElementById('LPG');
let output1 = document.getElementById('output1');

let houseresult = 0;

function household() {
    const elecValue = parseFloat(electricity?.value) || 0;
    const coalValue = parseFloat(coal?.value) || 0;
    const lpgValue = parseFloat(lpg?.value) || 0;

    houseresult = (elecValue * 0.82 + coalValue * 2.42 + lpgValue * 1.51).toFixed(2);
    saveCalculationResult('house_result', houseresult);
return houseresult;
}

let house = household();


function display_household(){
    household();
    output1.textContent = (`${houseresult} kilograms`);
}

// flight page //

let fclass = document.getElementById('class');
let trips = document.getElementById('trips');
let output2 = document.getElementById('output2');

let flightresult = 0;

function flights() {
    if (!fclass || !trips) {
        return;
    }

    let option = fclass.options[fclass.selectedIndex];
    
    if (option.value == "1") {
        flightresult = 0.246;
    } else if (option.value == "2") {
        flightresult = 0.246 * 9;
    } else if (option.value == "3") {
        flightresult = 0.246 * 3;
    } else {
        flightresult = 0.246;
    }

    flightresult += parseInt(trips.value) || 0;
    saveCalculationResult('flight_result', flightresult);
    return flightresult;
}

let flight = flights();


function display_flight(){
    flights();
    output2.textContent = (`${flightresult} kilograms`);
}


// car page //

let mileage1 = document.getElementById('mileage1');
let output3 = document.getElementById('output3');

let carresult = 0;

function car() {
    const mil1 = parseFloat(mileage1?.value) || 0;

    carresult = (mil1 * 0.121).toFixed(2);
    saveCalculationResult('car_result', carresult);
return carresult;
}

let cars = car();

function display_car(){
    car();
    output3.textContent = (`${carresult} kilograms`);
}

// bike page //

let mileage = document.getElementById('mileage');
let output4 = document.getElementById('output4');

let bikeresult = 0;

function bike() {
    const mil = parseFloat(mileage?.value) || 0;

    bikeresult = (mil * 0.021).toFixed(2);
    saveCalculationResult('bike_result', bikeresult);
return bikeresult;
}

let bikes = bike();


function display_bike(){
    bike();
    output4.textContent = (`${bikeresult} kilograms`);
}

// bus & rails //

let trans = document.getElementsByClassName('trans');
let output5 = document.getElementById('output5');

let transresult = 0;

function transport() {
    if (trans.length < 5) {
        return;
    }

    transresult = (
        (parseFloat(trans[0].value) || 0) * 0.84995 +
        (parseFloat(trans[1].value) || 0) * 0.0115 +
        (parseFloat(trans[2].value) || 0) * 0.1135 +
        (parseFloat(trans[3].value) || 0) * 0.121 +
        (parseFloat(trans[4].value) || 0) * 0.03238
    ).toFixed(2);
    saveCalculationResult('trans_result', transresult);

    return transresult;
}

let transports = transport();

function display_trans(){
    transport();
    output5.textContent = (`${transresult} kilograms`);
}

// secondary //

let secon = document.getElementsByClassName("INR");
let people = document.getElementById('people');
let output6 = document.getElementById('output6');

let secresult = 0;

function secondary(){
    const peop = parseFloat(people?.value) || 0;

    if(peop != " "){
        let a = secon[0].value = (parseInt(people.value) || 0) * 30;
        let b = secon[1].value = (parseInt(people.value) || 0) * 0.042;
        let c = secon[2].value = (parseInt(people.value) || 0) * 1;
        let d = secon[3].value = (parseInt(people.value) || 0) * 1.25;
        let e = secon[4].value = (parseInt(people.value) || 0) * 331;
        let f = secon[5].value = (parseInt(people.value) || 0) * 22.67;
        let g = secon[6].value = (parseInt(people.value) || 0) * 0.634;
        let h = secon[7].value = (parseInt(people.value) || 0) * 42.83;

        secresult = (parseFloat(a+b+c+d+e+f+g+h) || 0 ).toFixed(2);
        saveCalculationResult('secon_result', secresult);
        return secresult;
    }
}

let second = secondary();

function display_secondary(){
    secondary();
    output6.textContent = (`${secresult} kilograms`);
}

// result //

/*let btn = document.getElementById('sec-button');
let total_result = document.getElementById('total_result');

function total() {
    const result = [household(), flights(), car(), bike(), transport(), secondary()];
    result.reduce((acc, num) => acc + num, 0);
    total_result.textContent = (`${result} kilograms`);
    return result;
} */

document.querySelectorAll('input').forEach((input) => {
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) input.value = savedValue;

    // Save input on change
    input.addEventListener('input', () => {
        localStorage.setItem(input.id, input.value);
    });
});

function updateHeading(id, content) {
    const heading = document.getElementById(id);
    if (heading) {
        heading.textContent = content;
        localStorage.setItem(id, content);
    }
}

/* Restore headings on page load 
document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('h3');
    headings.forEach((heading) => {
        const savedContent = localStorage.getItem(heading.id);
        if (savedContent) {
            heading.textContent = savedContent;
        }
    });
});


document.getElementById('next').addEventListener('click', function(e) {
    e.preventDefault(); 
    const name = document.getElementById('namebox').value;
    const house_result = houseresult;
    const flight_result = flightresult;
    const car_result = carresult;
    const bike_result = bikeresult;
    const trans_result = transresult;
    const secon_result = secresult;
    window.location.href = `household.html?name=${encodeURIComponent(house_result)}`;
    window.location.href = `Flight.html?name=${encodeURIComponent(flight_result)}`;
    window.location.href = `car.html?name=${encodeURIComponent(car_result)}`;
    window.location.href = `bike.html?name=${encodeURIComponent(bike_result)}`;
    window.location.href = `bus&rails.html?name=${encodeURIComponent(trans_result)}`;
    window.location.href = `secondary.html?name=${encodeURIComponent(secon_result)}`;
}); */

// Page where you calculate and store float numbers
function saveCalculationResult(key, value) {
    // Ensure value is stored as a float
    localStorage.setItem(key, parseFloat(value));
}

// Example usage in calculation pages







// Result Page: Retrieve, Sum, and Display
function calculateTotal() {
    let total = 0;

    // Retrieve and sum all stored values
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Ensure we only sum relevant keys (optional filter if needed)
        if (key.includes()) {
            total += parseFloat(localStorage.getItem(value)) || 0;
        }
    }

    // Display the total result
    const total_result = document.getElementById('total_result');
    if (total_result) {
    total_result.textContent = `${total.toFixed(2)} kilogrmas`;

    console.log(house);
}
}

// Call this function on the result page when it loads
window.addEventListener('DOMContentLoaded', calculateTotal());