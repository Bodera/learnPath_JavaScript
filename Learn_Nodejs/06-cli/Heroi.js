//Quando a classe for chamada, do objeto instanciado serão extraídos apenas o nome, id e o poder :)
class Heroi {
    constructor({nome, poder, id}) {
        this.nome = nome
        this.poder = poder
        this.id = id
    }
}

module.exports = Heroi