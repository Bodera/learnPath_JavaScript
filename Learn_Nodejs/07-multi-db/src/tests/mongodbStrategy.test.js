// npm run tester:watcher
const assert = require('assert') //validar consistência dos dados
const MongoDB = require('../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy') //../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Vampira',
    poder: 'Absorver habilidades e memórias'
}

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
    /*it('Cadastra heroi', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        console.log({nome, poder})
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)

    })*/
    it('Apresenta lista com os registros existentes', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome}) //destructuring, soh as chaves da primeira posicao
        const result = {
            nome, poder
        }
        console.log(result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    //it('Atualiza um documento da coleção pelo seu id', async () => {
    //    //essa solução funciona como esperado mas o mongoose retorna também um CastError para ObjectId
    //    const result = await context.update({id: {$oid:'5d007f30404fbc1346ad7b61'} }, {nome: 'Patolino', poder: 'O Mago Implacável'})
    //    assert.equal(result.nModified, 1)
    //})
    it('Remove um documento da coleção pelo seu id'), async () => {
        const result = await context.delete( { id : {$oid: '5d007f30404fbc1346ad7b61'}} )
        assert.equal(result.nModified, 1)
    }
})