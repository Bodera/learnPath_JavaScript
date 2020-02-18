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


main() //tenta esquecer de chamar o método para você ver que bonito que é.
async function main() { //ao adicionar a palavra reservada 'async' => automaticamente irá retornar uma Promise
    try {
        console.time('medida-tempo-de-resposta-da-promise')
        
        const usuario = await obterUsuario() //já que é uma Promise
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([ //tricky code = só precisamos do await quando as Promises possuem dependências (Isso poupa tempo)
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1] //LIFO.
        const telefone = resultado[0]
        
        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) - ${telefone.telefone},
            Endereco: ${endereco.rua}, ${endereco.numero}, ${endereco.bairro}
        `)
        
        console.timeEnd('medida-tempo-de-resposta-da-promise')
    } catch (error) {
        console.error('DEU RUIM AQUI: ',error)
    }
}
