const display = document.getElementById('display');

function updateDisplay(value) {
  display.textContent = value;
}

updateDisplay('0'); // начальное значение

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    updateDisplay(value); // вывод на экран
  });
});
