//importanto apenas uma função do nosso módulo
const { obterPessoas } = require('../service/service')


// R E D U C E   P R Ó P R I O
Array.prototype.meuReduce = function (callback, valorInicial) {

	let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

	for(let index = 0; index <= this.length -1; index++) {
		valorFinal = callback(valorFinal, this[index], this) //this é nossa lista completa
	}
	return valorFinal;
}

async function main() {

	try {
		
		const {results} = await obterPessoas('')
		
		const pesos = results.map((item) => parseFloat(item.height))
		  console.log('pesos: ',pesos)
		
		/* Reduce nativo do JS trabalhando dados da SWAPI
		//colete todos os pesos e faça uma agregação com a soma de todos os valores, caso vazio retorne 0
		const total = pesos.reduce((anterior, proximo) => {
			return anterior + proximo
		}, 0)
		  console.log('total: ',total)
		*/

		//um array de arrays
		const minhaLista = [
			['Rafael', 'Nunes', 'de', 'Brito'],
			['Bahia', 'FATEC-ID', 'Brasil Logic Sistemas']
		]

		const total = minhaLista.meuReduce((anterior, proximo) => {
			return anterior.concat(proximo)
		}, []).join(', ')  //Em hipótese de falso retorne uma lista vazia
  		  console.log('total: ',total)

	} 
	catch (error) {
		  console.error(`Deu ruim: `,error)
	}
}
main()