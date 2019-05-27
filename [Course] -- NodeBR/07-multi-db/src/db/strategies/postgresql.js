const ICrud = require('./interfaces/interfaceCrud')
//07-multi-db> npm install sequelize pg-hstore pg
const Sequelize = require('sequelize')

class PostgreSQL extends ICrud {
    constructor() { //inicializa variáveis
        super()
        this._driver = null
        this._herois = null //base de dados
        this._connect() // agora quando for instanciada, automaticamente conecta-se ao Postgres.
    }
    //função que valida a tentativa de conexão com o banco. Vai trabalhar com exceção? PROMISE!
    async isConnected() {
        try {
            await this._driver.authenticate() //método do sequelize
            return true
        }
        catch (err) {
            console.log()
            return false // pq é uma promisse
        }
    }
    create(item) {
        console.log('O item foi salvo em Postgres')
    }
    //função que inicializa a estrutura da tabela para trabalhar
    async defineModel() {
        this._herois = driver.define('herois', {
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
            tableName: 'tb_herois', //configura para uma tabela já existente
            freezeTableName: false, //conserva as configurações do banco
            timestamps: false //não adicionar novos atributos
        })
        await Herois.sync()
    }
    //função que preserva credenciais do servidor de dados 
    _connect() { //método privado por convenção começa com '_'
        this._driver = new Sequelize(
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
    }
}

module.exports = PostgreSQL 