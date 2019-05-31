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
describe('Postgres Strategy', function() {
    this.timeout(100000) //leva o tempo que for até conseguir conectar ao Postgres, Infinity ou no caso 6000ms
    this.beforeAll(async function(){ 
        await context.connect() //variável db já é utilizada no método construtor
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
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        //const posicaoZero = resultado[0] //pega 1ª posição
        //const [a, b, c] = ['bcx', 'thc', 'cpq']
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})