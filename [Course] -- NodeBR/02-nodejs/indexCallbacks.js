/*
Objetivo 0 - Retornar um usuário
Objetivo 1 - Retornar um número de telefone de um usuário a partir do seu Id
Objetivo 2 - Retornar um endereço do usuário pelo seu Id
*/
//primeiro organizamos as funções que iremos precisar
function obterUsuario(callback) {
    setTimeout(function () { //quando a base de dados é externa usamos o setTimeout
        return callback(null, { //lembra do padrão callback
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000) //miliseconds
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '+17022682156',
            ddd: '17'
        })
    }, 2000);
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

function resolverUsuario(erro, usuario) { //padrão callback: (1º: ação quando erro, 2º: ação quando sucesso)
    console.log('usuario', usuario)
}

//acessando os valores que nos interessam
obterUsuario(function resolverUsuario(error, usuario) {
    // null || "" || 0 === false
    if(error) {
        console.error('Deu ruim em USUARIO mano', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('Deu ruim em TELEFONE mano', error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error('Deu ruim em ENDERECO mano', error)
                return;
            }
            
            //validamos os erros e agora é só imprimir na tela os resultados da consulta. Use `` para imprimir variáveis em JS.
            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua}, ${endereco.bairro}, ${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
})
