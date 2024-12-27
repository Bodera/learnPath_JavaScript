// The join() concatenates all elements of an array into a string.
// you can choose how elements are separated, the default is a comma
// by the end, it returns a new string

const guestsArr = ['Amy', 'Clare', 'Keith', 'Dan'] 

// confirming the type of return of join
console.log(typeof guestsArr.join(), guestsArr.join())

// joining the array using 🎙 as separator
console.log(guestsArr.join('🎙'))

// joining the array without separator
console.log(guestsArr.join(''))

// Remember that the join() and map() make a good pair in some occasions
