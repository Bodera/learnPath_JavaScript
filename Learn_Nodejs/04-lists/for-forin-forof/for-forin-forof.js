/*
Objetivo: retornar uma lista dos nomes das personagens de Star Wars
*/
//modulos criados por nós são importados com um './'
//arquivos .json também podem ser importados desta forma
const service = require('../service/service')

async function main() {
    try {
        const result = await service.obterPessoas('')
        const names = []
        
        //Esse tipo de objetivo tem que se ligar que vai usar lista de repetição
        /*
         Let is only visible in the for() loop and var is visible to the whole function. 
           So is the purpose of let statements only to free up memory when not needed in a certain block? – NoBugs 
           Yes, and it is encouraged that variables are existent only where they are needed. – batman
         result é nossa promise e portanto, um objeto
         results é o objeto que a SWAPI nos retorna com os resultados dos valores
         length -1 para prevenir off-by-one error (OBOE)
         An off-by-one error (OBOE), also commonly known as an OBOB (off-by-one bug), or OB1 error is a logic error involving the discrete equivalent of a boundary condition. It often occurs in computer programming when an iterative loop iterates one time too many or too few. This problem could arise when a programmer makes mistakes such as using "is less than or equal to" where "is less than" should have been used in a comparison, or fails to take into account that a sequence starts at zero rather than one (as with array indices in many languages). 
           i < length and i <= length - 1 are equivalent – IrkenInvader 
         Only use i++ if you need to use the original state of i before you increment it.
         ++i increments the value of i and returns the incremented value.
         i++ increments the value of i and return the original value.
        */
        console.time('execution-time-for')
        for(let i=0; i <= result.results.length -1; i++) {
            const pessoa = result.results[i] //elementos da lista serão armazenados na variável names
            names.push(pessoa.name)
        }
        console.timeEnd('execution-time-for')
        
        
        //um código melhor que o laço anterior
        console.time('execution-time-forin')
        for(let i in result.results) {
            const pessoa = result.results[i]
            names.push(pessoa.name) //name vem da SWAPI
        }
        console.timeEnd('execution-time-forin')
        
        
        //podemos otimizar mais ainda nosso laço
        console.time('execution-time-forof')
        for(pessoa of result.results) {
            names.push(pessoa.name)
        }
        console.timeEnd('execution-time-forof')
        
        //Apresenta o resultado para testarmos
        console.log(`names`,names)
    }
    
    catch (error) {
        console.error(`erro interno: `, error)
        
    }
    
}

main()
