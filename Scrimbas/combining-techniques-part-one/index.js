import { placeholderPropertyObj } from './properties/placeholderPropertyObj.js'
import { propertyForSaleArr } from './properties/propertyForSaleArr.js'

const sanitazePropertyHTML = (house = placeholderPropertyObj) => {
    const { propertyLocation, priceGBP, roomsM2, comment, image } = house

    const residencesSection = document.createElement('section')
    residencesSection.classList.add('card')

    const houseImage = document.createElement('img')
    houseImage.setAttribute('src', `/images/${image}`)

    const houseDetailsDiv = document.createElement('div')
    houseDetailsDiv.classList.add('card-right')

    const houseLocationH2 = document.createElement('h2')
    houseLocationH2.innerText = propertyLocation

    const housePriceH3 = document.createElement('h3')
    housePriceH3.innerText = priceGBP

    const houseComment = document.createElement('p')
    houseComment.innerText = comment

    const houseSizeSqrMeterH3 = document.createElement('h3')
    const totalSize = roomsM2.reduce((a, b) => a + b)
    houseSizeSqrMeterH3.innerHTML = `${totalSize}m&sup2;`

    houseDetailsDiv.appendChild(houseLocationH2)
    houseDetailsDiv.appendChild(housePriceH3)
    houseDetailsDiv.appendChild(houseComment)
    houseDetailsDiv.appendChild(houseSizeSqrMeterH3)

    residencesSection.appendChild(houseImage)    
    residencesSection.appendChild(houseDetailsDiv)
    return residencesSection
}


function getPropertyHtml(houses = []) {
    if (houses.length === 0) {
        houses.push(placeholderPropertyObj)
    }

    let residences = houses.map(sanitazePropertyHTML)
    let stringfiedResidences = residences.map(i => i.outerHTML).join(' ')

    document.getElementById('container').innerHTML = stringfiedResidences
}

getPropertyHtml()

setTimeout(() => getPropertyHtml(propertyForSaleArr), 4000)