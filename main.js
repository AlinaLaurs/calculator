//Variables que se van a utilizar.
let newNumber = true;
let firstTime = true;
let numberOne;
let numberTwo;
let operatorOne;
let operatorTwo;
let numberResult;

//Objetos HTML conectados a JS.
const buttonsNumbers = document.getElementsByName("number");
const box = document.getElementById("box");
const operators = document.getElementsByName("operators");
const reset = document.getElementById("reset");
const sign = document.getElementById("sign");
const squareRoot = document.getElementById("squareRoot");

//Función que trata de introducir los números en la caja.
const clickNumber = (e) => {
  //currentTarget es una propiedad del objeto e.
  let pressedButton = e.currentTarget;
  //Permite introducir máximo 10 dígitos.
  if (box.value.length < 10) {
    if (newNumber) {
      if (pressedButton.value === ".") {
        box.value = "0.";
        newNumber = false;
      } else {
        //Si lo primero en introducir no es un punto, aparece el número.
        box.value = pressedButton.value;
        newNumber = false;
      }
    } else {
      //Aquí se concatenan los dígitos.
      box.value = box.value + pressedButton.value;
    }
  }
};

const clickMath = (e) => {
  //En pressedBButton se almacena el botón que se ha presionado.
  let pressedButton = e.currentTarget;
  //Si es la primera vez que se pulsa un operador.
  if (firstTime) {
    //Paso el valor de la caja a número y lo guardo en numberOne.
    numberOne = Number(box.value);
    //Almaceno el primer operador, pero no hago nada con él (porque espero a que se pulse el segundo operador). Al pulsar el segundo operador, se ejecutará el cálculo del primer operador.
    operatorOne = pressedButton.value;
    //Ya no va a ser el primer operador y se da por hecho que se va a introducir un nuevo numero.
    firstTime = false;
    newNumber = true;
  } else {
    //Si no es el primer operador en presionar. Lo mismo que arriba.
    numberTwo = Number(box.value);
    operatorTwo = pressedButton.value;
    //Operaciones.
    if (operatorOne === "+") {
      numberResult = numberOne + numberTwo;
    } else if (operatorOne === "−") {
      numberResult = numberOne - numberTwo;
    } else if (operatorOne === "×") {
      numberResult = numberOne * numberTwo;
    } else if (operatorOne === "÷") {
      numberResult = numberOne / numberTwo;
    }
    //El resultado obtenido de la operación se guarda en numberOne.
    numberOne = numberResult;
    //Se muestra en la caja.
    box.value = numberResult;
    //Se actualiza la operación de la siguiente ejecución. El segundo operador, pasa a ser el primero y se vuelve a esperar al segundo.
    operatorOne = operatorTwo;
    operatorTwo = "";
    numberTwo = null;
    //Después de presionar un operador, puede volver a escribir un número nuevo.
    newNumber = true;
  }
};

const clickReset = () => {
  box.value = "0";
  newNumber = true;
  firstTime = true;
};

const clickSign = () => {
  if (Number(box.value) > 0) {
    box.value = 0 - Number(box.value) + "";
    numberOne = Number(box.value);
    numberResult = Number(box.value);
    newNumber = true;
  }
  //Probablemente esto no haga falta, es exactamente lo mismo.
  //Existe un bug al presionar 8-(-11)=0.
  else {
    box.value = 0 - Number(box.value) + "";
    numberOne = Number(box.value);
    numberResult = Number(box.value);
    newNumber = true;
  }
};

const clickSquareRoot = () => {
  box.value = Math.sqrt(Number(box.value));
  numberOne = Number(box.value);
  numberResult = Number(box.value);
  newNumber = true;
};

//La parte de la ejecución.
//Se va a ejecutar clickNumber cada vez que se presione un número.
buttonsNumbers.forEach((element) => {
  element.addEventListener("click", clickNumber);
});
//Se va a ejecutar clickMath cada vez que se presione un operador.
operators.forEach((element) => {
  element.addEventListener("click", clickMath);
});
//Lo mismo al presionar cualquier botón gris claro.
reset.addEventListener("click", clickReset);
sign.addEventListener("click", clickSign);
squareRoot.addEventListener("click", clickSquareRoot);
