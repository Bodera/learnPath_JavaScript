const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./Heroi')

async function main() {
    Commander //node index.js --help
        .version('v1.0.2')
        //argumentos para descrição do herói
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        //argumentos para operações de CRUD
        .option('-c, --cadastrar', "Cadastra um herói")
        .option('-l, --listar', "Lista heróis cadastrados")
        .option('-r, --remover', "Remove um herói da base de dados.")
        .option('-u, --update', "Atualiza info de um herói")
        //to convert the cli arguments
        .parse(process.argv)
    
        const heroi = new Heroi(Commander)
    try {
        if(Commander.cadastrar) { //nome do método no arquivo database.js
            const result = await Database.cadastrar(heroi)
            if (!result) { //método cadastrar retorna um booleano
                console.error('Erro ao cadastrar o herói, não foi possível concluir a operação.')
                return;
            }
            console.log('Sucesso ao cadastrar seu herói!')
        }
        if(Commander.listar){}
        //if(){}
        //if(){}
    }
    catch (error){
        console.error('Deu ruim aqui: ', error)
    }
}

main()