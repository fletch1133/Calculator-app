class Calculator {                                  //declaration of class called 'Calculator' creates objs with shared propeties and methods
    constructor(prevOperAndTextElement, currOperAndTextElement) {        //defines class constructor method, called when you create new instance of calc class, two params taken in
    this.prevOperAndTextElement = prevOperAndTextElement;   //sets instance variable to new created object(this) to value of prevOper, refers back to HTML
    this.currOperAndTextElement = currOperAndTextElement;    //Same logic as above
    this.clear();      //called method clear on created obj, reset calc's state
    }      //closes constructor and class



    clear() {       //defining method
        this.currOperand = '';     //property of current object instance to store current input in calc equal to empty string, this keyword refers to current instance of class
        this.prevOperand = '';     //same as above besides it being the previous input
        this.operation = undefined;    //operation = undefined where operation stores mathematical capabilities of calc, undefined clears any previous selected operation(RESETTING CALC)
    }


    delete() {    //defining method
        this.currOperand = this.currOperand.toString().slice(0, -1);   //A. refers tp currOper and is current input on calc, 
                                                                       //B. toString converts currOper to string
                                                                       //C. .slice(0, -1) takes substring of string, extracts portion of string, and removes last character
                                                                       //D. Result of operation is assigned back to this.currOper replacting currOper
    }

    appendNumber(number) {      //defining method, passing in 'number' parameter
        if (number === '.' && this.currOperand.includes('.')) return;                       //checks if number is decimnal point and if currOper already contains decimal point, if both are true
                                                                                            //(cont) the code inside if block is ran, the return statement is executed early preventing addition of another decimal point
        this.currOperand = this.currOperand.toString() + number.toString();         //if if statment is not met, it will add number converted to string to end of curr Operand(also to string) effectively appening number to currernt Operand
    }

    chooseOperation(operation) {     //defining method, takes in 'operation' param
        if (this.currOperand === '')     //(and below, ln 32) checks if currOperand property is empty, no num input by user, method exits early ensuring valid curreent operand
        return; 
        if (this.prevOperand !== '') {     //checks if prevOperand is ! empty, if so, there is pending operation that needs to be computed
            this.compute();   //calls compute method
        }
        this.operation = operation;   //after computing any operation, sets operation property of obj to value of operation param passed to method, selects and stores math operation for future 
        this.prevOperand = this.currOperand;  //sets prevOperand property of obj to value of currOperand, preformed in prep of new calculation, represents first operand in upcomingn calc
        this.currOperand = '';   //set to empty string clearing current operand in prep for new num, user can start entering new num
    }

    compute() {   //defining method
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
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    });
});

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});


allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});


deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();   
});

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
    if (event.key === "Backspace") {
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