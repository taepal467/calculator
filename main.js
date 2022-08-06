const allButtons = Array.from(document.querySelectorAll(".btn"));
const numberButtons = Array.from(document.querySelectorAll("[value]"));
const operatorButtons = Array.from(document.querySelectorAll("[data-action]"));
const equalsBtn = document.querySelector(".operator-equals");
const clear = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

const currentValue = document.querySelector(".currentValue");
const previousValue = document.querySelector(".previousValue");

let firstValue = "";
let secondValue = "";
let result = "";
let decimal = false;
let operation = ""

//Audio
const audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3')
allButtons. forEach(btn =>{
    btn.addEventListener("click",function() {
        btn = audio.play();
    })
})

const displayValues = function() {
    numberButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
        
            //Code to display only one decimal
            if(e.target.value === "." && !decimal){
                decimal = true;
            }else if(e.target.value === "." && decimal) {
                return decimal;
            }

            if(firstValue.length < 11) {
                let btnValue = e.target.value;
                firstValue += btnValue;
                currentValue.textContent = firstValue;
            }

        })
    })
}

//Operator buttons
operatorButtons.forEach(operator => {
    operator.addEventListener("click", (e) => {

     if(!previousValue) return;
     decimal = false;
     const operationSymbol = operator.textContent;
  
     if(firstValue && secondValue && operation){
        operate();
     }else {
        result = parseFloat(firstValue);
     }
  
        showCalculations(operationSymbol);
        operation = operationSymbol;
        console.log(result);
    })
})

const showCalculations = function(symbol) {
        secondValue += `${result}`
        previousValue.textContent = `${result} ${symbol}` ;
        currentValue.textContent = result;
        firstValue = "";
}

const clearScreen = function() {
    currentValue.textContent = 0;
    previousValue.textContent = 0;
    firstValue = "";
    secondValue = "";
    decimal = "";
}

const deleteCurrentEntry = function(){
    currentValue.textContent = "";
    firstValue = "";
    decimal = "";
}

const add = function() {
    result = parseFloat(result) + parseFloat(firstValue);
}

const subtract = function() {
    result = parseFloat(result) - parseFloat(firstValue);
}

const multiply = function() {
    result = parseFloat(result) * parseFloat(firstValue);
}

const divide = function() {
      result = parseFloat(result) / parseFloat(firstValue); 
}

const operate = function() {

    if (operation === "+") {
        return add();
    } else if (operation === "-") {
        return subtract();
    } else if (operation === "x") {
        return multiply();
    } else if(operation === "÷") {
        return divide();
    }
}

// equals button
const equals = function() {
    if(!firstValue || !secondValue) return;
    decimal = false;
    operate()
   
    currentValue.textContent = result;
    firstValue = result;
    secondValue = "";
    previousValue.textContent = "";
}

const keyPressed = function() {
 allButtons.forEach(btn => {
    btn.addEventListener("keydown", (e) => {
        if(
           e.key === "0" ||
           e.key === "1" ||
           e.key === "2" ||
           e.key === "3" ||
           e.key === "4" ||
           e.key === "5" ||
           e.key === "6" ||
           e.key === "7" ||
           e.key === "8" ||
           e.key === "9" ||
           e.key === "." ){
            numberPressed(e.key);
        }

        if(
            e.key === "*" ||
            e.key === "/" ||
            e.key === "+" ||
            e.key === "-" ){
            operatorPressed(e.key);
        }
      
    })
 })
}

const numberPressed = function(key) {
    numberButtons.forEach(btn => {
        if(btn.textContent === key) {
            btn.click();
        }
    })
}

const operatorPressed = function(key) {
    operatorButtons.forEach(btn => {
        if(btn.textContent === key) {
            btn.click();
        } else if(btn.textContent === "+" && key === "+"){
            btn.click();
        }else if(btn.textContent === "÷" && key === "/"){
            btn.click();
        }else if(btn.textContent === "x" && key === "*") {
            btn.click();
        }
    })
}

displayValues();
keyPressed();
operatorPressed();

clear.addEventListener("click", clearScreen );
deleteBtn.addEventListener("click",deleteCurrentEntry);
equalsBtn.addEventListener("click", equals);