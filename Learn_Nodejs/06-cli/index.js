const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./Heroi')

async function main() {
    Commander //node index.js --help
        .version('v1.0.2')
        //argumentos para descrição do herói
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        .option('-i, --id [value]', "Id do herói")
        //argumentos para operações de CRUD
        .option('-c, --cadastrar', "Cadastra um herói")
        .option('-l, --listar', "Lista heróis cadastrados")
        .option('-r, --remover [id]', "Remove um herói da base de dados pelo Id.")
        .option('-a, --atualizar [value]', "Atualiza info de um herói pelo Id")
        //to convert the cli arguments
        .parse(process.argv)
    
        const heroi = new Heroi(Commander)
    try {
        if(Commander.cadastrar) { //nome do método no arquivo database.js
            delete heroi.id //b.o. arquivo database.js linha 38
            const result = await Database.cadastrar(heroi)
            if (!result) { //método cadastrar retorna um booleano
                console.error('Erro ao cadastrar o herói, não foi possível concluir a operação.')
                return;
            }
            console.log('Sucesso ao cadastrar seu herói!')
        }
        if(Commander.listar){
            const result = await Database.listar()
            console.log(result)
            return;
        }
        if(Commander.remover){
            const result = await Database.remover(heroi.id)
            if(!result) {
                console.error('Erro ao remover o herói, não foi possível concluir a operação.')
                return;
            }
            console.log('Sucesso ao remover seu herói!')
        }
        if(Commander.atualizar){
            const idHeroiAtual = parseInt(Commander.atualizar)
            //deletar todas as chaves que estiverem com valor undefined ou null
            const novosDados = JSON.stringify(heroi)
            const heroiAtualizado = JSON.parse(novosDados)
            const result = await Database.atualizar(idHeroiAtual, heroiAtualizado)
            if(!result) {
                console.error('Erro ao atualizar o herói, não foi possível concluir a operação.')
                return;
            }
            console.log('Sucesso ao atualizar seu herói!')
        }
    }
    catch (error){
        console.error('Deu ruim aqui: ', error)
    }
}

main()