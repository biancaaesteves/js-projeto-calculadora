const previousOperationText = document.querySelector('#previous-operation');

const currentOperation = document.querySelector('#current-operation');

const buttons = document.querySelectorAll('#buttons-container button');

class Calculator {

}

//* Eventos que vamos utilizar para fazer a calculadora funcionar
buttons.forEach ((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    console.log(value)
  })
})