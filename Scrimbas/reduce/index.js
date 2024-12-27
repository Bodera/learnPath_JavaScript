// As the name suggests, reduce() is a method that reduces an array to a single value.
// It takes a callback function as an argument, which is called once for each element in the array.
// The callback function takes two arguments: the accumulator and the current element.
// The accumulator is the value that is returned by the previous call to the callback function.
// The current element is the value of the current element in the array.
// The reduce() method returns the final value of the callback function.

// First example
const rainJanuaryByWeek = [10, 20, 0, 122];

const totalRainfallJanuary = rainJanuaryByWeek.reduce(
    (total, currentElement) => total + currentElement
);

console.log(totalRainfallJanuary);


// Second example
const grades = [75, 83, 66, 43, 55, 99, 87, 16, 89, 64, 70, 80, 94, 77, 66, 73];

const classAverage =
    grades.reduce((previous, actual) => actual + previous) / grades.length;

console.log(`The class average is ${classAverage}`);


// Third example
const studentsArr = [
    {
        name: 'Mike',
        grade: 75
    },
    {
        name: 'Emma',
        grade: 83
    },
    {
        name: 'Seth',
        grade: 66
    }
]

const reduceGradeAvg = (obj1, obj2) => {
    return obj1 + obj2.grade
}

const reduceNames = (obj1, obj2) => {
    return obj1 + ' ' + obj2.name
}

function calculateClassAverage(studentsArr) {
    const totalGrades = studentsArr.reduce(reduceGradeAvg, 0)
    return totalGrades / studentsArr.length
}

console.log(calculateClassAverage(studentsArr))

console.log(studentsArr.reduce(reduceNames, ''))


// Fourth example (now presenting default parameters!)
const itemsBoughtArr = [
    {
        name: 'Electric Toothbrush Holder',
        priceUSD: 40,
        desc: 'A robotic arm that holds and moves your electric toothbrush for you, ensuring optimal brushing technique.'
    },
    {
        name: 'Invisible Milk',
        priceUSD: 10,
        desc: 'A carton of milk that turns completely transparent when poured into a glass, providing a magical and mysterious drinking experience.'
    },
    {
        name: 'Self-Chilling Soup Can',
        priceUSD: 15,
        desc: 'A can of soup that instantly chills itself when opened, so you can enjoy a refreshing cold soup on a hot summer day.'
    },
    {
        name: 'Glow-in-the-Dark Eggs',
        priceUSD: 8,
        desc: 'A carton of eggs that glow in the dark, making breakfast preparation an exciting and illuminated experience.'
    }
]

import { itemsBoughtArr } from '/itemsBoughtArr.js'

// here discount could be a number, a string, even a function
function calculateTotalCost(itemsBoughtArr, discount = 0) {

    const total = itemsBoughtArr.reduce((total, currentItem) => {
        return total + currentItem.priceUSD
    }, 0
    )
    return total - discount
}

console.log(calculateTotalCost(itemsBoughtArr))
