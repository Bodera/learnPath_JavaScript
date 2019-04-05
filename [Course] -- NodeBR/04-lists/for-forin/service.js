/*
Objetivo: criar um serviço que consuma informação da API do StarWars, para treinar procedimentos de manipulação de listas.
*/

//importando módulo interno do node.js
const axios = require('axios') //Promise based HTTP client for the browser and node.js
const URL = 'https://swapi.co/api/people' //SWAPI


//Pq async mesmo? Resposta: pq nós iremos manipular promises internamente na nossa função
async function obterPessoas (nome) {
    
    const url = `${URL}/?search=${nome}&format=json` //adorei esse recurso `${}`
    const response = await axios.get(url) //axios é uma promise
    return response.data
    
}

/* T E S T E  //soh confirmando o funcionamento do nosso serviço
//o parâmetro eh a personagem do StarWars
obterPessoas('Watto')
    .then(function (resultado) {
        console.log('resultado eh: ',resultado)
        
    })
    .catch(function (error) {
        console.log('DEU RUIM AQUI: ',error)        
    })

*/

//Exportamos um módulo para que um outro código faça as requisições. Boas práticas
//Por trás é como se estivessemos tornando a visibilidade desse objeto para público
module.exports = {
    //Em JS se a chave possui o mesmo nome do valor basta deixar o nome do objeto
    //obterPessoas: obterPessoas
    obterPessoas
}
