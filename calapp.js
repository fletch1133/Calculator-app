class Calculator {
    constructor(prevOperAndTextElement, currOperAndTextElement) {
    this.prevOperAndTextElement = prevOperAndTextElement
    this.currOperAndTextElement = currOperAndTextElement
    this.clear() 
    }
}

const calculator = new Calculator(prevOperAndTextElement, currOperAndTextElement)

clear(); {
    this.currOperand = ''
    this.prevOperand = ''
    this.operation = undefined

    allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
    }) 
}


delete(); {
    this.currOperand = this.currOperand.toString().slice(0, -1)
    deleteButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay() 
    })
}

appendNumber(number); {
    if (number === '.' && this.currOperand.includes('.')) 
        return this.currOperand = this.currOperand.toString() + number.toString() 
    
    // numberButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         calculator.appendNumber(button.innerText) 
    //         calculator.updateDisplay() 
    //     })
    // })
}

chooseOperation(operation); {
    operationButtons.forEach(button => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() 
    })
    if (this.currOperand === '') 
    return 
    if (this.prevOperand !== '') {
        this.compute() 
    }
    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = '' 
}

compute(); {
    equalButton.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay() 
    })
    let computation 
    const prev = parseFloat(this.prevOperand)
    const current = parseFloat(this.currOperand) 
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current 
            break
        case '*':
            computation = prev * current
        case '÷':
            computation = prev / current
            break
        default:
            return 
    }
    this.currOperand = computation
    this.operation = undefined
    this.prevOperand = '' 
}

updateDisplay(); {
    if (this.operation != null) {
        this.prevOperAndTextElement.innerText = 
        `${this.getDisplayNumber(this.prevOperand)} ${this.operation}` 
    }
    
    this.currOperAndTextElement.innerText = this.currOperand 
    this.prevOperand = this.currOperand
    this.prevOperAndTextElement = this.prevOperand 
}


const numberButtons = document.querySelectorAll('[data-number]') 
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')  
const allClearButton = document.querySelector('[data-all-clear]') 
const deleteButton = document.querySelector('[data-delete]') 
const prevOperAndTextElement = document.querySelector('[data-previous-operand]') 
const currOperAndTextElement = document.querySelector('[data-current-operand]') 