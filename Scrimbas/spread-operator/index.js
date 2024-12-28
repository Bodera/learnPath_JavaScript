//The JavaScript spread operator (...) expands an iterable (like an array) into more elements.
// This allows us to quickly copy all or parts of an existing array into another array:

const averageSharePriceByMonthQ1 = [109.6, 103.3, 89.4]
const averageSharePriceByMonthQ2 = [109.3, 126.1, 103.3]
const averageSharePriceByMonthQ3 = [120.8, 102.3, 106.8]
const averageSharePriceByMonthQ4 = [110.9, 119.8, 113.7]

function findPriceExtremes(arr){
    console.log(`The highest average share price was ${Math.max(...arr)}`)
    console.log(`The lowest average share price was ${Math.min(...arr)}`)
}

const avgSharePriceOfTheYear = [
   ...averageSharePriceByMonthQ1,
   ...averageSharePriceByMonthQ2,
   ...averageSharePriceByMonthQ3,
   ...averageSharePriceByMonthQ4
   ]
findPriceExtremes(avgSharePriceOfTheYear)
