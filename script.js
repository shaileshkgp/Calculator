class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }
    delete() {
        if (this.currentOperand === '')
            return
        this.currentOperand = this.currentOperand.slice(0, -1)
    }
    getDisplayNumber(number) {

        const stringNumber = number.toString()
        const intDigits = parseFloat(stringNumber.split('.')[0])
        const floatDigits = parseFloat(stringNumber.split('.')[1])
        const floatNumber = parseFloat(number)
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        }
        else {
            intDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (floatDigits != NULL) {
            return `${intDisplay}.${floatDigits}`
        }
        else
            return intDisplay
    }
    appendNumber(number) {


        if (number === '.' && this.currentOperand.includes('.'))
            return

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseoperations(operation) {
        if (this.currentOperand === '')
            return
        if (this.previousOperand != '') {
            this.compute()
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.previousOperand = `${this.previousOperand} ${this.operation}`
        this.currentOperand = ''
    }
    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)
        let curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr))
            return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = (this.currentOperand)
        this.previousOperandTextElement.innerText = this.previousOperand
    }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach((button) => {
    button.addEventListener('click', function () {
        calculator.appendNumber(this.innerText)
        calculator.updateDisplay()
        console.log('pressed')
    })

})
operationButtons.forEach((button) => {
    button.addEventListener('click', function () {
        calculator.chooseoperations(this.innerText)
        calculator.updateDisplay()

    })

})
clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})