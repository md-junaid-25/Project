// Household Page

const electricity = document.getElementById('electricity');
const coal = document.getElementById('coal');
const lpg = document.getElementById('LPG');
const output1 = document.getElementById('output1');

function household() {
    const elecValue = parseFloat(electricity?.value) || 0;
    const coalValue = parseFloat(coal?.value) || 0;
    const lpgValue = parseFloat(lpg?.value) || 0;

    const houseresult = (elecValue * 0.82 + coalValue * 2.42 + lpgValue * 1.51).toFixed(2);
    saveCalculationResult('house_result', houseresult);
    return houseresult;
}

function displayHousehold() {
    const result = household();
    if (output1) output1.textContent = `${result} kilograms`;
}

// Flight Page

const fclass = document.getElementById('class');
const trips = document.getElementById('trips');
const output2 = document.getElementById('output2');

function flights() {
    if (!fclass || !trips) return 0;

    const option = fclass.options[fclass.selectedIndex]?.value;
    let flightresult = 0.246;

    switch (option) {
        case "2":
            flightresult *= 9;
            break;
        case "3":
            flightresult *= 3;
            break;
        default:
            break;
    }

    flightresult *= parseInt(trips.value) || 0;
    saveCalculationResult('flight_result', flightresult);
    return flightresult.toFixed(2);
}

function displayFlight() {
    const result = flights();
    if (output2) output2.textContent = `${result} kilograms`;
}

// Car Page

const mileage1 = document.getElementById('mileage1');
const output3 = document.getElementById('output3');

function car() {
    const mil1 = parseFloat(mileage1?.value) || 0;
    const carresult = (mil1 * 0.121).toFixed(2);
    saveCalculationResult('car_result', carresult);
    return carresult;
}

function displayCar() {
    const result = car();
    if (output3) output3.textContent = `${result} kilograms`;
}

// Bike Page

const mileage = document.getElementById('mileage');
const output4 = document.getElementById('output4');

function bike() {
    const mil = parseFloat(mileage?.value) || 0;
    const bikeresult = (mil * 0.021).toFixed(2);
    saveCalculationResult('bike_result', bikeresult);
    return bikeresult;
}

function displayBike() {
    const result = bike();
    if (output4) output4.textContent = `${result} kilograms`;
}

// Bus & Rail Page

const trans = document.getElementsByClassName('trans');
const output5 = document.getElementById('output5');

function transport() {
    if (trans.length < 5) return 0;

    const transresult = (
        (parseFloat(trans[0].value) || 0) * 0.84995 +
        (parseFloat(trans[1].value) || 0) * 0.0115 +
        (parseFloat(trans[2].value) || 0) * 0.1135 +
        (parseFloat(trans[3].value) || 0) * 0.121 +
        (parseFloat(trans[4].value) || 0) * 0.03238
    ).toFixed(2);

    saveCalculationResult('trans_result', transresult);
    return transresult;
}

function displayTransport() {
    const result = transport();
    if (output5) output5.textContent = `${result} kilograms`;
}

// Secondary Page

const secon = document.getElementsByClassName("INR");
const people = document.getElementById('people');
const output6 = document.getElementById('output6');

function secondary() {
    if (!people || secon.length < 8) return 0;

    const peop = parseFloat(people.value) || 0;

    const factors = [30, 0.042, 1, 1.25, 331, 22.67, 0.634, 42.83];
    let secresult = factors.reduce((sum, factor, idx) => {
        const value = peop * factor;
        secon[idx].value = value.toFixed(2);
        return sum + value;
    }, 0).toFixed(2);

    saveCalculationResult('secon_result', secresult);
    return secresult;
}

function displaySecondary() {
    const result = secondary();
    if (output6) output6.textContent = `${result} kilograms`;
}

// Utility Functions

function saveCalculationResult(key, value) {
    localStorage.setItem(key, parseFloat(value));
}

function calculateTotal() {
    let total = 0;

    ['house_result', 'flight_result', 'car_result', 'bike_result', 'trans_result', 'secon_result'].forEach(key => {
        total += parseFloat(localStorage.getItem(key)) || 0;
    });

    const total_result = document.getElementById('total_result');
    if (total_result) total_result.textContent = `${total.toFixed(2)} kilograms`;
}

let suggestion = document.getElementById("suggestion");

function show_suggestion(){
    suggestion.style.visibility = "visible";
}

window.addEventListener('DOMContentLoaded', () => {
    calculateTotal();

    document.querySelectorAll('input').forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) input.value = savedValue;

        input.addEventListener('input', () => {
            localStorage.setItem(input.id, input.value);
        });
    });
});
