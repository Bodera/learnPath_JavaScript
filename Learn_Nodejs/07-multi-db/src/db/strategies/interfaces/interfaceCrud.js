//Classe customizada para situações de erro de compilação em que um método não tenha sido implementado.
class NotImplementedException extends Error {
    //Em JS toda vez que herdamos ou extendemos de uma classe, precisamos implementar seu construtor.
    constructor() {
        super("Not implemented Exception")
    }
}

//JS não possui o conceito de interfaces do Java, então damos um jeitinho.
class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }

    //testa conexão com o banco
    isConnected() {
        throw new NotImplementedException()
    }
    
    //pos-implemented: método de conexão com servidor de dados
    connect() {
        throw new NotImplementedException()
    }
}

//tornando nosso objeto visível para outros serviços JS
module.exports = ICrud