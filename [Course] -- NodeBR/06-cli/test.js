//>npm t para executar os testes
const {
    deepEqual,
    equal,
    ok
} = require('assert')

const database = require('./database')

//cria objeto padrão para operações de leitura, escrita e remoção
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Super-velocidade',
    id: 1
}

//cria objeto padrão para operações de atualização de arquivos
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do anel',
    id: 2
}

//Uma suíte de testes é uma coleção de casos de teste ou specs destinados a testar um programa para verificar um determinado comportamento.
describe('Suíte de manipulação de Heróis', () => {
    before(async () => { //Não deixa a base de dados vazia, prevenindo de tentar excluir algo que não exista.
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR //presumi-se que ao menos 1 registro tenha sido previamente cadastrado.
        const [resultado] = await database.listar() //aplicando destructing
        //const posicaoUm = resultado[0]
        
        deepEqual(resultado, expected)
    })
    it('deve cadastrar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR) //poderia ser outro modelo
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id) //conferir se o modelo já está cadastrado

        deepEqual(actual, expected)
    })
    it('deve atualizar um herói pelo id', async () => { //a ordem de execução dos testes importa
        const expected_structure = {
            ...DEFAULT_ITEM_ATUALIZAR, //concatenando objetos
            nome: 'Caçador de Marte',
            poder: 'Telepatia'
        }
        const expected_input = {
            nome: 'Caçador de Marte',
            poder: 'Telepatia'
        }
        
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, expected_input)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected_structure)
    })
    //run it.only to perfom only one assert. >mocha test.js
    it('deve remover um herói por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        
        deepEqual(resultado, expected)
    })
})