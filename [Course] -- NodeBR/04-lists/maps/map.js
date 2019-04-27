const service = require('../service/service')

//Substituindo a função global do Map no Node.js
Array.prototype.meuMap = function (callback) { //tem que ser callback né, pq para cada item que passa pelo loop o objeto é invocado e executa o main()
    const novoArrayMapeado = []
    for(let indice=0; indice<= this.length -1; ++indice) {
        const resultado = callback(this[indice], indice) //this[indice] = nome pessoa; indice é só o índice mesmo
        novoArrayMapeado.push(resultado)
    }
    
    return novoArrayMapeado;
}

async function main() {
    try {
        const results = await service.obterPessoas('a') //olha minha Promise tem o mesmo nome do objeto da SWAPI
        
        /* F O R   E A C H
        console.time('execution-time-foreach')
        const names = []
        //para cada item da lista da SWAPI, uma função será chamada para adicionar o item capturado na variável names
        results.results.forEach(function (item) {
            names.push(item.name)
        })
        console.timeEnd('execution-time-foreach')
        */
        
        /* M A P
        console.time('execution-time-map')
        //Map retorna um Array
        const names = results.results.map(function (pessoa) {
            console.log(`names`,names)            
        })
        console.timeEnd('execution-time-map')
        */
        
        /* M A P   O P T I M I Z A D O
        //pessoa é uma função agora por causa do símbolo =>
        //se esta função recebesse mais de uma parâmetro  // .map((pessoa, peso, altura) => { return pessoa.name, pessoa.height, pessoa.mass })
        console.time('execution-time-maparrow')
        const names [] = results.results.map(pessoa => pessoa.name)
        console.timeEnd('execution-time-maparrow')
        */
        
        // M E U   P R Ó P R I O   M A P
        console.time('execution-time-meumap')
         const names = results.results.meuMap(function (pessoa, indice) {
             return `[${indice}]${pessoa.name}`
        })
        console.timeEnd('execution-time-meumap')
        
        console.log(`names =`,names)
    }
    catch (error) {
        console.error(`erro interno: `, error)
        
    }
    
}

main()
