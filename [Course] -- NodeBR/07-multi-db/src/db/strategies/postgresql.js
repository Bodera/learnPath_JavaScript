const ICrud = require('./interfaces/interfaceCrud')
//07-multi-db> npm install sequelize pg-hstore pg
const Sequelize = require('sequelize')

class PostgreSQL extends ICrud {
    constructor() { //inicializa variáveis
        super()
        this._driver = null
        this._herois = null //base de dados
        //this._connect() //instanciamos um objeto sem automaticamente estabelecer uma conexão com o sql.
    }
    
    async isConnected() { //função que valida a tentativa de conexão com o banco. Vai trabalhar com exceção? PROMISE!
        try {
            await this._driver.authenticate() //método do sequelize
            console.log('Sucesso na conexão')
            return true
        }
        catch (err) {
            console.log('Erro na conexão', err)
            return false // pq é uma promisse
        }
    }
    
    async create(item) { //essa função cria um registro no banco
        console.log('O item foi salvo em Postgres')
        return this._herois.create(item, {raw: true}) // :)
    }
   
    async read(item = {}) { //essa função lê um registro no banco //se nenhum parâmetro for passado, recebe vazio
        console.log('Eis o resultado')
        return this._herois.findAll( {where: item, raw: true} )
    }

    async update(id, item){ //recebe um id e um item para retornar a entidade com seus atributos atualizados
        console.log('Processando atualização')
        return this._herois.update(item, { where: {id : id} } )
    }

    async defineModel() { //função que inicializa a estrutura da tabela para trabalhar
        this._herois = this._driver.define('herois', {
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
        await this._herois.sync()
    }
    //função que preserva credenciais do servidor de dados 
    async connect() { //método privado por convenção começa com '_'
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
        await this.defineModel() //para reconhecer os atributos da nossa entidade padrão heroi
    }
}

module.exports = PostgreSQL 