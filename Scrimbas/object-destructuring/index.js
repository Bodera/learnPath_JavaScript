// Object destructuring enables us to extract properties from objects into distinct variables

const favouriteFilm = {
    title: "Little Miss Sunshine",
    year: "2006",
    genre: "comedy",
    star: "Steve Carell",
    director: "Jonathan Dayton and Valerie Faris"
}

const filmTitle = favouriteFilm.title
const filmYear = favouriteFilm.year
const filmGenre = favouriteFilm.genre
const filmStar = favouriteFilm.star
const filmDirector = favouriteFilm.director

console.log(`My favourite film is ${filmTitle} 
        starring ${filmStar}. It's an ${filmGenre} film 
        that was directed by ${filmDirector} 
        and released in ${filmYear}.`)
// Not very DRY is it?


// Try using object destructuring
const {title, year, genre, star, director} = favouriteFilm

console.log(`My favourite film is ${title} 
        starring ${star}. It's an ${genre} film 
        that was directed by ${director} 
        and released in ${year}.`)
