// npm run tester:watcher
const assert = require('assert') //validar consistência dos dados
const MongoDB = require('../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy') //../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())
describe('Suite de testes para MongoDB', function () {
    this.beforeAll(async() => {
        await context.connect()
    })
    it('Verifica status da conexao', async() => {
        const result = await context.isConnected()
        console.log('valor da const result: ', result)
        const expected = 'Connected'
        assert.deepEqual(result, expected)
    })
})