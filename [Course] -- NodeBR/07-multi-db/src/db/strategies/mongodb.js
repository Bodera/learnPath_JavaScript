const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const connectionState = { 
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
    4: 'Invalid Credentials' 
}

class MongoDB extends ICrud {
    constructor() {
        super() //Invoca o construtor da classe ICrud
        this._herois = null
        this._driver = null
    }
    async isConnected() {
        const status =  connectionState[this._driver.readyState]
            if(status === 'Connected') return status
            if(status !== 'Connecting') return status
            
            await new Promise(resolve => setTimeout(resolve, 1000)) //? ✓ Verifica status da conexao (1003ms)
            return connectionState[this._driver.readyState]

    }
    defineModel() { //método particular para nossa classe MongoDB
        const heroiSchema  = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date() //já retorna um objeto contendo data e hora atuais
            }
        })
        this._herois = Mongoose.model('herois', heroiSchema)
    }
    connect() {
        const mongooseConnString = 'mongodb://aquelebode:interludiocoexistencial@localhost:27017/herois'
        Mongoose.connect(
            mongooseConnString,
            { useNewUrlParser: true }, err => {
                if (!err) {
                    return
                }
                console.log('Falha na conexão, sinto muito.', err)
            })
        const connection = Mongoose.connection
        connection.once('open', () =>  console.info `MongoDB Connection State: ${ connectionState[connection.readyState] }`,
                                       console.log('Parabéns, a conexão foi estabelecida com sucesso.'))
        this._driver = connection
    }
    async create(item) {
        const resultCadastrar = await model.create({
            nome: 'Gelado',
            poder: 'Jatos congelantes'
        })
        console.log('resultado de resultCadastrar: \n', resultCadastrar)
        console.log('O item foi salvo em MongoDB')
    }
}

module.exports = MongoDB