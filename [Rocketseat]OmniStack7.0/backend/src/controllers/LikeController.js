const Post = require('../models/Post')

module.exports = {

    async store(req, res) {
        const post = await Post.findById(req.params.id)

        post.likes += 1
        await post.save()        

        req.io.emit('Novo like', post)//novo event emitter que notifica em tempo real usuários conectados de um novo like

        return res.json(post)
    }
}