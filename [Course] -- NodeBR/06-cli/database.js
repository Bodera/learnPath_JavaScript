const {
    readFile,
    writeFile
} = require('fs') //um callback??!
const {
    promisify
} = require('util') //teamPromisse!!

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

        constructor() {
            this.NOME_ARQUIVO = 'herois.json'
        }

        //métodos auxiliares
        async obterDadosArquivo() {
            const arquivo = await readFileAsync(__dirname + '/' + this.NOME_ARQUIVO, 'utf8')
            return JSON.parse(arquivo.toString())
        }
        async escreverArquivo(dados) {
            await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
            return true
        }

        //métodos principais da classe
        async listar(id) {
            const dados = await this.obterDadosArquivo()
            const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true)) //caso nenhum id seja passado ao chamar a função, traga todos ids.
            
            return dadosFiltrados
       }
       async cadastrar(heroi) {
           const dados = await this.obterDadosArquivo()
           //cria um objeto que será concatenado aos dados do heroi para identificação
           const id = heroi.id <= 2 ? heroi.id : Date.now(); //Propósito educacional e não ilustra as melhores práticas.

           const heroiComId = {
               id,
               ...heroi //MAGIC! Concatenando 2 objetos em 1
           }
           const dadosFinal = [
               ...dados,
               heroiComId //MAGIC! Concatenando 1 array com 1 objeto
           ]
           const resultado = await this.escreverArquivo(dadosFinal)
           return resultado;
       }
       async remover(id) {
           if(!id) { //nenhum id foi passado
               return await this.escreverArquivo() //dropa tudo do arquivo. Um array vazio
           }
           const dados = await this.obterDadosArquivo() //procura id na lista
           const indice = dados.findIndex(item => item.id === parseInt(id, 10)) //conseguimos passar função diferente do indexOf

           if(indice === -1) { //não achou nenhum id
                throw Error('O herói informado não existe')
           }
           dados.splice(indice, 1) //a partir do meu índice delete um único item.
           return await this.escreverArquivo(dados) //após deletar reescreva o arquivo
       }
       async atualizar(id, modificacoes) { //identificador do objeto e campos alterados
            const dados = await this.obterDadosArquivo() 
            const indice = dados.findIndex(item => item.id === parseInt(id, 10))
            if(indice === -1) {
                throw Error('O herói informado não existe.')
            }

            const atual = dados[indice]
            const target = {
                ...atual,
                ...modificacoes
            }
            dados.splice(indice, 1)

            return await this.escreverArquivo([
                ...dados,
                target
            ])
       }
}

module.exports = new Database() //exporta a instância para auxiliar arquivos que requisitarem a classe
