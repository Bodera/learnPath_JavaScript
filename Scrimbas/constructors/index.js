// the error constructor
function checkUsername(userName) {
    if (userName) {
        console.log(userName)
    } else {
        console.log('I execute')
        throw new Error('No username provided')
        console.log('I do not execute')
    }
}

checkUsername()

// declaring objects
String()
Number()
Array()
Object()
Boolean()

// const person = new Object() // we don't do that here
const person = {} // this is fine
person.name = 'Bouc'
console.log(person)


// declaring objects containing methods
const gamer = {
    name: 'Dave',
    score: 0,
    incrementScore: function(){ // don't be tempeted to use arrow functions (they can't refer to `this` keyword)
        this.score++   
        console.log(this)
    }
}

gamer.incrementScore()
gamer.incrementScore()


// declaring constructor functions
function Gamer(name){
    this.name = name
    this.score = 0
    this.incrementScore = function(){
        this.score++  
    }
}

const dave = new Gamer('Dave')
const sarah = new Gamer('Sarah')
const kerry = new Gamer('Kerry')
dave.incrementScore()
sarah.incrementScore()
sarah.incrementScore()
kerry.incrementScore()
kerry.incrementScore()
kerry.incrementScore()
console.log(dave)
console.log(sarah)
console.log(kerry)

// practical example
function Character(name)
{
    this.name = name
    this.collectedItemsArr = []

    this.addItem = function(item) {
        this.collectedItemsArr.push(item)
        console.log(`${this.name} now has: ${this.collectedItemsArr.join(', ')}.`)
    }
}

const merlin = new Character('Merlin')
merlin.addItem('wand')
merlin.addItem('map')
merlin.addItem('potion')



// now let's explore class constructors
class Character // what if we try to make an instante above class declaration? (remember hoisting?)
{
    constructor(name) {
        this.name = name
        this.collectedItemsArr = []
    }

    addItem(item) {
        this.collectedItemsArr.push(item)
        console.log(`${this.name} now has: ${this.collectedItemsArr.join(', ')}.`)
    }
}