//npm i mongoose 
const Mongoose = require('mongoose')
const mongooseConnString = 'mongodb://aquelebode:interludiocoexistencial@localhost:27017/herois'
Mongoose.connect(
    mongooseConnString,
    {useNewUrlParser: true}, err => {
        if(!err) {
            return
        }
        console.log('Falha na conexão, sinto muito.', err)
    })
/*
function minhaFuncao() {
127.0.0.1:27017/?gssapiServiceName=mongodb
}
 ou também
const minhaFuncao = function() {

}
 ou também
const minhaFuncaoArrow = () => {

}
 e caso seja única linha
const minhaFuncaoArrow = (params) => console.log(params)
*/
const connection = Mongoose.connection
connection.once('open', () =>  console.info `MongoDB Connection State: ${ connectionState[connection.readyState] }`,
                                 console.log('Parabéns, a conexão foi estabelecida com sucesso.'))

const connectionState = { 
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
    4: 'Invalid Credentials' 
}

const heroiSchema = new Mongoose.Schema({
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

const model = Mongoose.model('herois', heroiSchema) //herois = nome do modelo e da coleção e do BD. Credo

async function main() {
    /*
    const resultCadastrar = await model.create({
        nome: 'Gelado',
        poder: 'Jatos congelantes'
    })
    console.log('resultado de resultCadastrar: \n', resultCadastrar)
    //*/
    const listItens = await model.find()
    console.log('items cadastrados: \n', listItens)
}
main() //belezinha