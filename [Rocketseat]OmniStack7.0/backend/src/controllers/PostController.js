const Post = require('../models/Post')
const sharp = require('sharp') //módulo para manipulação de imagens
const path = require('path')
const fs = require('fs') 

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt') //Semelhante ao SQL add '-' na frente do campo para ordenar de maneira descrescente
        
        return res.json(posts)
    },

    async store(req, res) {
        //console.log(req.body) //retorna info das chaves e valores contidos na URL
        //console.log(req.file) //retorna detalhes do arquivo incorporado à URL multipart/form-data

        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file
        //const [name, ext] = image.split('.')
        const [name] = image.split('.')
        const rszdFileName = `${name}.jpg`

        await sharp(req.file.path)
            .resize(400)//width and heigh
            .jpeg({ quality: 70 }) //em formato jpeg com 70% de qualidade da original
            .toFile( //exporta para um novo arquivo
                path.resolve(req.file.destination, 'resized', rszdFileName)
            )

        fs.unlinkSync(req.file.path)//removendo a imagem original        
        
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: rszdFileName
        })

        req.io.emit('Novo post', post)//novo event emitter que notifica em tempo real usuários conectados de um novo post

        return res.json(post)
    }
}