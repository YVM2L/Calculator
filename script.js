const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = value;
}

updateDisplay("0"); // начальное значение

const buttons = document.querySelectorAll("button");

let firstOperand = ""; // первое число
let operator = ""; // знак
let secondOperand = ""; // второе число

function calculate() {
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);
  let result;

  switch (
    operator //проверка какой оператор выбран
  ) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = b !== 0 ? a / b : "Ошибка"; // на ноль не делим
      break;
  }

  updateDisplay(result);
  firstOperand = result.toString(); //результат превращается в новое первое число для продолжения новых вычислений
  secondOperand = ""; // сброс второго числа
  operator = ""; // сброс оператора
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      if (!operator) {
        // первое число
        firstOperand += value;
        updateDisplay(firstOperand);
      } else {
        // второе число
        secondOperand += value;
        updateDisplay(secondOperand);
      }
    } else if (value === "=") {
      calculate(); //если = , то вызывается функция calculate
    } else if (value === "C") {
      firstOperand = "";
      secondOperand = "";
      operator = "";
      updateDisplay("0");
    } else if (value === ".") {
      if (!operator) {
        if (!firstOperand.includes(".")) {
          firstOperand = firstOperand ? firstOperand + "." : "0."; //если число есть, добавляем . после него; если числа нет, то будет выглядеть как 0.
          updateDisplay(firstOperand);
        }
      } else {
        if (!secondOperand.includes(".")) {
          secondOperand = secondOperand ? secondOperand + "." : "0.";
          updateDisplay(secondOperand);
        }
      }
    } else {
      operator = value;
    }
  });
});
