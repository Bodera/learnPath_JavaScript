import {
    interplanetaryDestinationsArr as longTripFromJustOnce,
    shortSpaceTripsArr as shortTripFromJustOnce
} from './exporting-just-once.js'

import {
    interplanetaryDestinationsArr as longTripFromMoreThanOnce,
    shortSpaceTripsArr as shortTripFromMoreThanOnce
} from './exporting-more-than-once.js'

import getMatchingTripsArr from './getMatchingTripsArr.js'

console.log(longTripFromJustOnce.length)
console.log(shortTripFromJustOnce.length)


console.log(longTripFromMoreThanOnce.length)
console.log(shortTripFromMoreThanOnce.length)


console.log(getMatchingTripsArr(shortTripFromMoreThanOnce, 'moon'))
console.log(getMatchingTripsArr(longTripFromJustOnce, 'moon'))