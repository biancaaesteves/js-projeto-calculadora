const previousOperationText = document.querySelector("#previous-operation");

const currentOperationText = document.querySelector("#current-operation");

const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    // valor impresso na tela
    this.currentOperationText = currentOperationText;
    // valor impresso na tela
    this.currentOperation = "";
    // valor que o usuário está digitando agora
  }

  // Métodos:
  // add digit to calculator screen
  addDigit(digit) {
    // check if current operation already has a dot
    // dot can't repeat
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Process all calculator operations:
  // aqui pode bifurcar todas as operações e seus métodos individuais, caso queira adicionar mais funcionalidades a calculadora.
  processOperation(operation) {
    // Check if current is empty
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Change operation:
      if (this.previousOperationText.innerText !== "") {
        // mudança de operação só qdo já tiver um número previo em cima. não se muda operação qdo está zerado
        this.changeOperation(operation);
      }
      return;
    }

    // Get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0]; // tem espaço entre a operação e o número
    const current = +this.currentOperationText.innerText;

    // Saber com qual operação estamos trabalhando:
    switch (operation) {
      // ordem: sempre o valor de cima e o valor debaixo
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // Change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    console.log(operationValue, operation, current, previous);

    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
      // colocar os numeros da minha operação atual dentro do texto da minha operação atual.
    } else {
      // Check if value is zero, if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Method Change math operation:
  changeOperation(operation) {
    const mathOperation = ["*", "/", "+", "-"];
    // caso o usuário faça uma operação inválida, o programa não deixa continuar
    if (!mathOperation.includes(operation)) {
      return;
    }
    // se a operação for as operações do mathOperation:
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
    // pega e remove o último caractere e coloca o novo operador qdo o usuário muda de operação
  }

  // Method DEL - delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
    // extrai o último dígito
  }

  // Method CE - Clear current operation
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Method C - Clear all operations
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Method = Process an operation
  processEqualOperator() {
    let operation = previousOperationText.innerText.split(" ")[1]; // pega a segunda parte da operação
    this.processOperation(operation);
  }
}

//* Instanciar o objeto:
const calc = new Calculator(previousOperationText, currentOperationText);

//* Eventos que vamos utilizar para fazer a calculadora funcionar
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    // converter um num em JS:
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
      // se não for num, é operação:
    } else {
      calc.processOperation(value);
    }
  });
});
