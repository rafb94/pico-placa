//Pico y Placa Predictor: The goal of this code is to predict if a car with a random
let licensePlate, licensePlateError, numbersRight, lettersRight, randomLastDigit, pHours, time, goodToGo;


//functions
function init () {
    licensePlateError = false;
    numbersRight = true;
    lettersRight = true;
    return numbersRight && lettersRight;
}

function showWarning (htmlElement) {
    licensePlateError = true;
    if(htmlElement){  
        htmlElement.classList.add('dispWarning');
        htmlElement.classList.remove('dispSuccess');
        htmlElement.classList.remove('noDisp');
        htmlElement.textContent = "There is an error in your license plate!";
        return true;
    } else{
        return false;
    }
    
}

function showSuccess (htmlElement) {
    licensePlateError = false;
    htmlElement.classList.add('dispSuccess');
    htmlElement.classList.remove('dispWarning');
    htmlElement.classList.remove('noDisp');
    htmlElement.textContent = "Success";
}

function checkLength (currentVal, length) {
    return currentVal.length === length;
}

function checkTime(time){
    if(pHours.morningStart <= time && pHours.morningEnd >= time || pHours.afternoonStart <= time 
        && pHours.afternoonEnd >= time){
            return true;
        } else {
            return false;
        }
}

function checkDayTime (day, time, lastDigit) {
    console.log(day, time, lastDigit)
    let doNotCirculate = "Your car should not be on the road!";
    switch (true){
        case (day === 0 || !checkTime(time)):
            return "Good to go!";
        case (day == 1 && checkTime(time) && (lastDigit === 0 || lastDigit === 1)):
            return doNotCirculate;
        case (day == 2 && checkTime(time) && (lastDigit === 2 || lastDigit === 3)):
            return doNotCirculate;
        case (day == 3 && checkTime(time) && (lastDigit === 4 || lastDigit === 5)):
            return doNotCirculate;
        case (day == 4 && checkTime(time) && (lastDigit === 6 || lastDigit === 7)):
            return doNotCirculate;
        case (day == 5 && checkTime(time) && (lastDigit === 8 || lastDigit === 9)):
            return doNotCirculate;
        default:
            return "Good to go!";
    }
    
}

//Objects:

pHours = {
    morningStart: 700,
    morningEnd : 930,
    afternoonStart: 1600,
    afternoonEnd: 1930
}

licensePlate = {
    input: document.querySelector('#licensePlate'),
    checkLetters: function(currentVal) {
        currentVal = currentVal.replace(/[0-9]/g, '');
        if(checkLength(currentVal, 3)){
            lettersRight = true;
            return true;
        } else{
            lettersRight = false;
            return false;
        }
    },
    checkNumbers : function(currentVal){
        currentVal = currentVal.replace(/\D/g,'');
        if(checkLength(currentVal, 3)){
            numbersRight = true;
        } else{
            numbersRight = false;
        }
    }
}

date = {
    day: function () {
        let inputArray = document.querySelector('#date').value.split("-");
        let convertFormat  = new Date(inputArray[0], inputArray[1]-1, inputArray[2]);
        return convertFormat.getDay();
    }
}


init();


document.querySelector('#predictorForm').addEventListener('submit', (event) => {
    event.preventDefault();
    //Validate license plate input 
    
    currentLicensePlateValue = licensePlate.input.value
    
    licensePlate.checkLetters(currentLicensePlateValue);
    licensePlate.checkNumbers(currentLicensePlateValue);

    !numbersRight || !lettersRight ? showWarning(document.querySelector('.warning')) : showSuccess(document.querySelector('.warning'))

    if (!licensePlateError) {
        //Date and time are alreay validated, since the user has to use the format provided by the HTML tag
    
        //Set random digit
        randomLastDigit = Math.floor(Math.random() * 10);
        //Determine if time is within pico y placa prohibited hours
        time = document.querySelector('#time').value.replace(":",'');
        day = date.day()
        
    
        document.querySelector('#day').textContent = "It will be " + dayString(day);
        
        document.querySelector('#randomLastDigit').textContent = "The last digit is " + randomLastDigit;
    
        document.querySelector('#goodToGo').textContent = checkDayTime(day, time, randomLastDigit);
    }
})


function dayString (day){
    weekday = [];
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[day];
}

//Test functions 
if (!init()){
    throw new Error('Check fail init: numbers and letters might be defined wrongly.')
}

if (!showWarning(null)){
    throw new Error('Check fail showWArning: HTML element not defined')
}

if (!showSuccess(null)){
    throw new Error('Check fail showWArning: HTML element not defined')
}

if (licensePlate.checkLetters("PC")){
    throw new Error('Check fail licensePlate: Length license plate letters')
} 

if (checkTime(2100)){
    throw new Error('Check fail: Time')
}








