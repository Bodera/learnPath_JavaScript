const filmInput = document.getElementById('film-input')
const addBtn = document.getElementById('add-btn')
const filmList = document.getElementById('film-list')

addBtn.addEventListener('click', function() {

/* 
easier, but it does not pay the risks/downsides

    filmList.innerHTML += `
        <div class="film-item">${filmInput.value}</div>
        `
*/
    const divFilmInput = document.createElement('div')
    divFilmInput.classList.add('film-item')
    divFilmInput.innerText = filmInput.value
    filmList.appendChild(divFilmInput)
    
    filmInput.value = ''
}) 

// that was a demonstration of sanitizing user input
// comment out lines 14 to 17 and uncoment lines 10 to 11
// then try to add a film with a <script> tag or the content of batButton.html :)
