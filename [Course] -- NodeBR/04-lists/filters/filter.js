//importanto apenas uma função do nosso módulo
const { obterPessoas } = require('../service/service')

/* D E S T R U C T U R I N G
 * 
 * const item = {
 *     nome: 'Bode'
 *     idade: '1005'
 * }
 * const { nome, idade } = item
 * console.log(nome, idade) //Bode 1005
 */


// F I L T E R   P R Ó P R I O
Array.prototype.meuFilter = function(callback) {
    const lista = []
    for(index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        //0, "", null, undefined === false
        if(!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    //Try...catch sempre na última camada que chamada todas as outras
    try {
        
        const {results} = await obterPessoas('')
        
        /*
            //por padrão o filter deve retornar um valor booleano (0 ou 1)
            //para informar se deve ou não, incluir no novo array da lista
            //False -> não incluir na lista //True -> inclui na lista
        const familiaLars = results.filter(function (item) {
            //item é o parâmetro da nossa função
            //toLowerCase é a função para padronizar strings para letras minúsculas
            //indexOf() é uma função legal
                //seu parâmetro é o valor que buscamos no array
                //e então a indexOf() retorna a posição do parâmetro no array
                //quando o parâmetro não existe no array a indexOf() nos retorna -1
                //e se você quisesse filtrar por todas as personagens exceto os Lars, deveria usar === -1
            const result = item.name.toLowerCase().indexOf(`lars`) !== -1
            return result //True ou False
        })
        */


        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
         })
        //Código tambem executa //const familiaLars = results.meuFilter((item, index, lista) => item.name.toLowerCase().indexOf('lars') !== -1)


        //buscando os nomes das personagens da família Lars. 
        //O operador => indica que pessoa é uma função e () indica que só recebe 1 único parâmetro
        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)

        
    } catch (error) {
        console.error('deu ruim: ',error)
    }
} 
main()//sempre a última a ser chamada