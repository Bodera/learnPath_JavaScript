// Did you knew that is due to hoisting that functions can be called before they are defined?
// hoisting means that functions declarations are moved to the top of their scope before code execution

console.log(getSpendAlert(150)) //that runs without errors

function getSpendAlert(amount) { // this is called function declaration
    return `Warning! You just spent £${amount}!`
}

// console.log(getIncommingAlert(100)) 
//ups ReferenceError: Cannot access 'getIncommingAlert' before initialization

const getIncommingAlert = function(amount){ // this is called function expression
    return `Surprise! You just earned £${amount}!`
}

console.log(getIncommingAlert(100)) //now it works

// don't take sides, adapt your code to the situation
// sometimes declaring a function before it is called is a good idea, sometimes it can be avoided


// ************************************************************* //

// Arrow functions

// with a single parameter
const getDepositAlert = amount => `A total of £${amount} has been deposited in your account!`

console.log(getDepositAlert(48))

// whitout parameters
const getWithdrawalAlert = () => `Someone just withdrew from your account!`

console.log(getWithdrawalAlert())

// with multiple parameters
const getTransferAlert = (amount, recipient) => `A total of £${amount} has been transferred to ${recipient}`

console.log(getTransferAlert(80, 'John Doe'))

// sometimes curly brackets and return keyword are necessary

const getFraudAlert = (location, amount) => {
    if (location === 'London') {
        return 'A transaction was detected in London!'
    }

    if (amount < 20) {
        return 'A small transaction was detected outside London!'
    }

    return `A suspicious transaction was detected! Location: ${location}, Amount: £${amount}`
}

console.log(getFraudAlert('London', 20))
console.log(getFraudAlert('Luton', 15))
console.log(getFraudAlert('Peterborough', 60))
