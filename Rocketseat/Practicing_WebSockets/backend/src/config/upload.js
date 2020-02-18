const multer = require('multer')
const path = require('path') //Esqueça precoupações com '\' ou '/' (DOS ou NIX)

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //Caminhos relativos :)
        filename: function(req, file, callback) {
            callback(null, file.originalname) //cara que legal
        }
    })
}