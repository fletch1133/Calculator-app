class Calculator {
    constructor(prevOperAndTextElement, currOperAndTextElement) {
    this.prevOperAndTextElement = prevOperAndTextElement;
    this.currOperAndTextElement = currOperAndTextElement;
    this.clear();
    }



    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }


    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return; 
        this.currOperand = this.currOperand.toString() + number.toString(); 
    }
    
    chooseOperation(operation) {
        if (this.currOperand === '') 
        return; 
        if (this.prevOperand !== '') {
            this.compute(); 
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = ''; 
    }

    compute() {
        let computation 
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currOperand); 
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current; 
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return; 
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = ''; 
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocalString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay; 
        }
    }

    updateDisplay() {
        this.currOperAndTextElement.innerText = 
        this.getDisplayNumber(this.currOperand);
        if (this.operation != null) {
            this.prevOperAndTextElement.innerText = 
                `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`; 
        } else {
            this.prevOperAndTextElement.innerText = '';
        } 
    }
}  

const numberButtons = document.querySelectorAll('[data-number]') 
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')  
const allClearButton = document.querySelector('[data-all-clear]') 
const deleteButton = document.querySelector('[data-delete]') 
const prevOperAndTextElement = document.querySelector('[data-previous-operand]') 
const currOperAndTextElement = document.querySelector('[data-current-operand]') 

const calculator = new Calculator(prevOperAndTextElement, currOperAndTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay() 
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay 
    })
})

equalButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.compute()
        calculator.updateDisplay
    })
})

allClearButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clear()
        calculator.updateDisplay
    })
})

deleteButton.forEach(button => {
    button.addEventListener('click', () => { 
        calculator.delete()
        calculator.updateDisplay
    })
})

document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[*\-*\/]/g
    if (event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay() 
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key) 
        calculator.updateDisplay() 
    }
    if (event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key)
        calculator.updateDisplay() 
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute()
        calculator.updateDisplay() 
    }
    if (event.key === "Backspaces") {
        event.preventDefault();
        calculator.delete() 
        calculator.updateDisplay()
    }
    if (event.key === 'Delete') {
        event.preventDefault();
        calculator.clear()
        calculator.updateDisplay()
    }

});