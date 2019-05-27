// src> sudo npm i --save-dev mocha
// test> mocha *.test.js postgresStrategy.test.js
const assert = require('assert') //validar consistência dos dados
const Postgres = require('../db/strategies/postgresql')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

describe('Postgres Strategy', function() {
    this.timeout(Infinity) //leva o tempo que for até conseguir conectar ao Postgres
    it('PostgresSQL Connection', async function() {
        const result = await context.isConnected()
        assert.deepEqual(result, true)
    })
})