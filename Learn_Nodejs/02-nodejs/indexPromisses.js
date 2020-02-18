/*
Objetivo 0 - Retornar um usuário
Objetivo 1 - Retornar um número de telefone de um usuário a partir do seu Id
Objetivo 2 - Retornar um endereço do usuário pelo seu Id
*/
//importando um pacote interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco) //MAGIC!


//encapsulando nosso código no objeto Promise
function obterUsuario() { 
        //em hipótese de erro => reject(erro é invocado)
        //em hipótese de sucesso => resolve(condição esperada é invocada)
    return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
    //return reject(new Error('DEU RUIM MEXXMO MANÉ!))
        return resolve ({
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000) //miliseconds
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromisse(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '+17022682156',
                ddd: '17'
            })
        }, 2000);
    })
}


function obterEndereco(idUsuario, callback) { //função callback será sempre o último parâmetro da função
    setTimeout(() => {
        return callback(null, {
            rua: 'Chaves',
            bairro: 'Jd. Califórnia',
            numero: '409'
        })
    }, 2000);
}

const usuarioPromisse = obterUsuario()
//para manipular a hipótese de sucesso, usamos a função .then
//para manipular erros e exceções, usamos a função .catch
//pipes => promises são resolvidas da maneira LIFO.

usuarioPromisse
    .then(function (usuario) { //resultado == usuario
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) { //resultado == idUsuario
        const endereco = obterEnderecoAsync(resultado.usuario.id) 
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result 
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}, ${resultado.endereco.bairro}
            Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error) {
        console.error('DEU RUIM AQUI: ', error)
    })
