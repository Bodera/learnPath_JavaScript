// src> sudo npm i --save-dev mocha
// test> mocha *.test.js (um pouquinho mais lento) ou mocha postgresStrategy.test.js
// para automatizar suas tarefas ao editar um arquivo de testes adicione o parâmetro -w ao mocha
// npm run tester:watcher

const assert = require('assert') //validar consistência dos dados
const Postgres = require('../db/strategies/postgresql')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres()) //instanciamos nossa classe Contexto passando os critérios da instância da classe Postgres
const MOCK_HEROI_CADASTRAR = { //nosso template de entidade a ser cadastrada no banco sql
    nome: 'Tempestade',
    poder: 'Manipular o clima'
}
const MOCK_HEROI_ATUALIZAR = { //nosso template de entidade a ser cadastrada no banco sql
    nome: 'Tocha humana',
    poder: 'Fogo'
}
describe('Postgres Strategy', function() {
    this.timeout(100000) //leva o tempo que for até conseguir conectar ao Postgres, Infinity ou no caso 6000ms
    this.beforeAll(async function(){ 
        await context.connect() //variável db já é utilizada no método construtor
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('conecta à base de dados do Postgres SQL', async() => {
        const result = await context.isConnected()
        assert.deepEqual(result, true)
    })
    it('cadastra entidade herói', async() => {
        const {dataValues: {nome, poder} } = await context.create(MOCK_HEROI_CADASTRAR) 
        //delete result.id //não tem sentido testar campo de auto-incremento
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('lê um registro na nossa base de dados', async() => {
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome}) //result trás uma lista no caso
        //const posicaoZero = resultado[0] //pega 1ª posição
        //const [a, b, c] = ['bcx', 'thc', 'cpq']
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('deve atualizar os atributos de uma entidade pelo id', async () => {
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher-invisível',
            poder: 'Invisibilidade'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem) 
        const [itemAtualizado] = await context.read({ id : itemAtualizar.id }) //no caso conferimos se id é igual ao id de itemAtualizar
        //atenção, não é uma boa prática utilizar mais de uma asserção por unidade de teste
        
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.poder, novoItem.poder)
        /***
         * Em JavaScript existe a técnica chamada rest/spread,
         * que é a sintaxe de espelhamento.
         * Iteramos os objetos e os convergimos em uma estrutura.
         * 
         * Perceba que const novoItem = { MOCK_HEROI_ATUALIZAR },
         * o acesso ao nosso objeto ficaria assim: novoItem.MOCK_HEROI_ATUALIZAR
         * 
         * Perceba que const novoItem = { ...MOCK_HEROI_ATUALIZAR },
         * o acesso ao nosso objeto ficará assim: novoItem.poder ou novoItem.nome
         * Show neh?
         */
    })
})