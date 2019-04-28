const {
    readFile
} = require('fs') //um callback??!
const {
    promisify
} = require('util') //teamPromisse!!

const readFileAsync = promisify(readFile)

class Database {

        constructor() {
            this.NOME_ARQUIVO = 'herois.json'
        }

        //métodos auxiliares
        async obterDadosArquivo() {
            const arquivo = await readFileAsync(__dirname + '/' + this.NOME_ARQUIVO, 'utf8')
            return JSON.parse(arquivo.toString())
        }
        escreverArquivo() {

        }

        //método princial da classe
        async listar(id) {
            const dados = await this.obterDadosArquivo()
            const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true)) //caso nenhum id seja passado ao chamar a função, traga todos ids.
            
            return dadosFiltrados
       }
}

module.exports = new Database() //exporta a instância para auxiliar arquivos que requisitarem a classe
