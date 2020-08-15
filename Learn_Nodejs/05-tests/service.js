//Soh importa o objeto GET do pacote axios
const { get } = require('axios')

//nossa url base
const URL = `https://swapi.co/api/people` 

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json` //format=json é uma propriedade da SWAPI
    const result = await get(url)
    console.log(result.data)  //JSON.stringify() faz o contrário da função JSON.parse()
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas (item) {
    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports = { obterPessoas }
