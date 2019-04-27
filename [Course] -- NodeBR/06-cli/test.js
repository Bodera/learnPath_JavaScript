const { deepEqual, ok } = require('assert')

const DEFAULT_ITEM_CADASTRAR = { 
        nome: 'Flash',
        poder: 'super-velocidade',
        id: 1 
    }


//Uma suíte de testes é uma coleção de casos de teste ou specs destinados a testar um programa para verificar um determinado comportamento.
describe('Suíte de manipulação de Heróis', () => {
    
    it('deve cadastrar um herói, usando arquivos', async () => {
        const expected = { DEFAULT_ITEM_CADASTRAR }
        //
        ok(null, expected)
    })
})
