//07-multi-db> npm install sequelize pg-hstore pg
const Sequelize = require('sequelize')
const driver = new Sequelize(
    //database name
    'heroes',
    //user
    'aquelebode',
    //password
    'interludiocoexistencial', 
    { //extrainfo
        //server hostname
        host: '127.0.0.1',
        //database driver
        dialect: 'postgres',
        //case-sensitive?
        quoteIdentifiers: false,
        //deprecations warning on?
        operatorAliases: false
    }
)

//TEAM PROMISES!
async function main() {
    //em um objeto estamos definindo o modelo do dado da tabela heróis
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {//extra info
        tableName: 'TB_HEROIS', //configura para uma tabela já existente
        freezeTableName: false, //conserva as configurações do banco
        timestamps: false //não adicionar novos atributos
    })

    await Herois.sync() //Sincroniza com o banco de dados
    //await Herois.create({
    //    nome: 'Mulher-aranha',
    //    poder: 'Energia bioelétrica'
    //})

    const resultado = await Herois.findAll({ //método assíncrono
        raw: true
        //, attributes: ['poder']
    })
    console.log('Resultado da consulta:\n', resultado)
 
}
main();