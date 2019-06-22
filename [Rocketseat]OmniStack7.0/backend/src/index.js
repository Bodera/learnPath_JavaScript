//nodemon index.js
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

const server = require('http').Server(app) //Ok estamos prontos p/ aceitar requisições HTTP
const io = require('socket.io').listen(server) //Ok estamos prontos p/ aceitar conexões com WebSockets

//MongoDB Atlas default collection: test.posts
mongoose.connect('mongodb+srv://aquelebode:interludiocoexistencial@mycluster0-hd2ip.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})


app.use(cors({
    origin: true,
    credentials: true,
    }
  ))//Cross-origin resource sharing


app.use((req, res, next) => { //middleware
    req.io = io //pronto agora todas as rotas sabem que devem disparar eventos no WebSocket
    next()
})

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))) //arquivos staticos como nossas imagens

app.use(require('./routes')) //rota que tem conheicmento de todas as rotas

server.listen(2277) //endereço de acesso à nossa api