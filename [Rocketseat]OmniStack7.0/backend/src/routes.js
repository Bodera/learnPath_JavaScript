const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = new express.Router()
const upload = new multer(uploadConfig) //pronto a cada requisição a imagem eh salva em uploads

/*
routes.get('/', (req, res) => {//our middleware
    return res.send(`Hello dear ${req.query.name}.`)//A query has the structure /?. So query.name equals /?name=[data].
})
*/

//JSON manda dados brutos e multipart/form-data permite envio de arquivos, inclusive multimídia
//novo node pkg discovered 'multer'
routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

routes.post('/posts/:id/like', LikeController.store)

module.exports = routes;