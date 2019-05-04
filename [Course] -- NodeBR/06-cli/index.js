const Commander = require('commander')
const Database = require('./database')

async function main() {
    Commander //node index.js --help
        .version('v1')
        //argumentos para descrição do herói
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        //argumentos para operações de CRUD
        .option('-c, --create', "Cadastra um herói")

        .parse(process.argv) //to convert the cli arguments
    
    try {
        if(Commander.create) {
            const result = await Database.cadastrar(Commander)
            console.log(Commander)
        }
    }
    catch (error){
        console.error('Deu ruim aqui: ', error)
    }
}