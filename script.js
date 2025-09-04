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
  if (firstOperand === "" || operator === "" || secondOperand === "") {
    // если хотя бы чего-то не хватает то покажи 0
    updateDisplay("0");
    return;
  }
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
  firstOperand = result.toString(); // результат превращается в новое первое число для продолжения новых вычислений
  secondOperand = ""; // сброс второго числа
  operator = ""; // сброс оператора
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // вынес addEventListener отдельно, теперь логика живет в handleButtonClick
    handleButtonClick(button.textContent);
  });
});
function getButtonType(value) {
  // это определение типа кнопки. обязательно ставим перед function handleButtonClick
  // внутри function handleButtonClick всё поменяем на ПРИМЕР: value === "=" на type  === "equals"
  if (!isNaN(value)) return "number";
  if (value === "C") return "clear";
  if (value === "=") return "equals";
  if (value === "←") return "backspace";
  if (value === ".") return "decimal";
  if (["+", "-", "*", "/"].includes(value)) return "operator";
  return "unknown";
}

function handleButtonClick(value) {
  // тут был addEventListener, пришла замена
  const type = getButtonType(value);

  // if (!isNaN(value)) {
  // это больше не актуально, меняем на if (type === "number") {
  if (type === "number") {
    if (!operator) {
      // вводим первое число
      if (firstOperand === "0" && !firstOperand.includes(".")) {
        // если первое число 0, то при вводе второго после 0 будет стоять точка
        firstOperand = "0." + value;
      } else {
        firstOperand += value;
      }
      updateDisplay(firstOperand);
    } else {
      // вводим второе число
      if (secondOperand === "0" && !secondOperand.includes(".")) {
        // если первое число 0, то при вводе второго числа после 0 будет стоять точка
        secondOperand = "0." + value;
      } else {
        secondOperand += value;
      }
      updateDisplay(secondOperand);
    }
  } // else if (value === "=") {
  // это больше не актуально, меняем на else if (type === "equals") {
  else if (type === "equals") {
    if (firstOperand !== "" && operator !== "" && secondOperand !== "") {
      calculate();
    } else {
      updateDisplay(firstOperand || "0"); // чтоб не появлялся пустой экран при нажатии =
    }
  } // else if (value === "C") {
  // это больше не актуально, меняем на else if (type === "clear") {
  else if (type === "clear") {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    updateDisplay("0");
  } // else if (value === "←") {
  // это больше не актуально, меняем на else if (type === "backspace") {
  else if (type === "backspace") {
    if (!operator) {
      // Удаляем из первого числа
      firstOperand = firstOperand.slice(0, -1); // удаляем последний символ
      updateDisplay(firstOperand || "0"); // если в строке пусто, то показываем 0
    } else if (secondOperand) {
      // Удаляем из второго числа
      secondOperand = secondOperand.slice(0, -1);
      updateDisplay(secondOperand || "0");
    } else {
      // Если второе число пустое, удаляем оператор
      operator = "";
      updateDisplay(firstOperand || "0");
    }
  } // else if (value === ".") {
  // это больше не актуально, меняем на else if (type === "decimal") {
  else if (type === "decimal") {
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
  } // else if (["+", "-", "*", "/"].includes(value)) {
  // это больше не актуально, меняем на else if (type === "operator") {
  else if (type === "operator") {
    if (firstOperand && operator && secondOperand) {
      //есть ли первое число, оператор и второе число
      calculate(); // вычисляем выражение
    }
    operator = value; // сохраняем новый оператор
  }
}
document.addEventListener("keydown", (event) => {
  const key = event.key;

  const keyMap = {
    Enter: "=",
    Backspace: "←",
    Escape: "C",
  };

  const allowedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "+",
    "-",
    "*",
    "/",
    "Enter",
    "Backspace",
    "Escape",
  ];

  if (!allowedKeys.includes(key)) return;

  const value = keyMap[key] || key;
  simulateClick(value);
});
function simulateClick(value) {
  const button = Array.from(buttons).find((btn) => btn.textContent === value); //ищем кнопку у который текст совпадает с нужным значением
  if (button) {
    // если нашли то вызываем клик
    button.click();
  }
}
