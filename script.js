const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = value;
}

updateDisplay("0"); // начальное значение

const buttons = document.querySelectorAll("button");

let firstOperand = ''; // первое число
let operator = ''; // знак
let secondOperand = ''; // второе число

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      if (!operator) { // первое число
        firstOperand += value;
        updateDisplay(firstOperand);
      } else { // второе число
        secondOperand += value;
        updateDisplay(secondOperand);
      }
    } else {
      operator = value; //знак
    }
  });
});
