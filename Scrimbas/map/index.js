// The map() method creates a new array populated with the results
// of calling a provided function on every element in the calling array.

//Convert these Miles to KM! 
const distanceWalkedMilesArr = [140, 153, 161, 153, 128, 148]

const conversionFactorMilesToKm = 1.6

function convertMilesToKms() {
    return distanceWalkedMilesArr.map((distanceMiles, index) => provideKilometers(distanceMiles, index))
}

function provideKilometers(distanceMiles, index) {
    return `Month ${index}: ${distanceMiles * conversionFactorMilesToKm}KM`
}

console.log(convertMilesToKms())

// The map() method does not change the original array, it returns a new array
// so the function called on map must return something

// When using forEach(), you can't return anything (you'll get undefined)
// so the function called on foreach affect the original array
