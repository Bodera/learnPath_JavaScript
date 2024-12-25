document.addEventListener('submit', logChosenSuperpower)


function logChosenSuperpower(e){
    e.preventDefault()
    console.log(document.getElementById('superpowers').value)
}