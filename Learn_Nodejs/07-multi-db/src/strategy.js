//OLD FILE

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
}

//classes concretas que implementam nossa estratégia
class MongoDB extends ICrud {
    constructor() {
        super() //Invoca o construtor da classe ICrud
    }

    create(item) {
        console.log('O item foi salvo em MongoDB')
    }
}
class PostgreSQL extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }
}

//Classe abstrata para manipular o contexto do banco de dados
class ContextStrategy { 
    constructor(strategy) {
        super()
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }
    
    read(item) {
        return this._database.read(item)
    }
    
    update(id, item) {
        return this._database.update(id, item)
    }
    
    delete(id) {
        return this._database.delete(id)
    }
}

//instanciando objetos no JS
const contextMongodb = new ContextStrategy(new MongoDB())
contextMongodb.create() //O item foi salvo em MongoDB

const contextPostgresql = new ContextStrategy(new PostgreSQL())
contextPostgresql.create() //O item foi salvo em PostgreSQL