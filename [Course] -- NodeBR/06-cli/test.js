//>npm t para executar os testes
const {
    deepEqual,
    equal,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Super-velocidade',
    id: 1
}


//Uma suíte de testes é uma coleção de casos de teste ou specs destinados a testar um programa para verificar um determinado comportamento.
describe('Suíte de manipulação de Heróis', () => {

    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR //presumi-se que ao menos 1 registro tenha sido previamente cadastrado.
        const [resultado] = await database.listar() //aplicando destructing
        //const posicaoUm = resultado[0]
        
        deepEqual(resultado, expected)
    })

    //it('deve cadastrar um herói usando arquivos', async () => {
    //    const expected = { DEFAULT_ITEM_CADASTRAR }
    //    //
    //    ok(null, expected)
    //})
})
