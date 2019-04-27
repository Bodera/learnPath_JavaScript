//Soh importa o objeto GET do pacote axios
const {
    get 
} = require('axios')

const URL = `https://swapi.co/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get()
    return result.data
}

module.exports = {
    obterPessoas:
}
