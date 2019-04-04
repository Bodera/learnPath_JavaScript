const EventEmitter = require('events') //importando a classe abstrata de eventos do Node

class MeuEmissor extends EventEmitter { //precisamos criar uma classe própria da nossa aplicação que irá extender todos os métodos da classe EventEmitter
    
}

const meuEmissor = new MeuEmissor() //instanciamos um objeto do tipo MeuEmissor

const nomeEvento = 'usuario:click' //criando nosso manipulador de eventos (nome meramente ilustrativo para fins educacionais)

//implementar um evento observador que irá nos notificar quando qualquer outro evento venha a ocorrer
meuEmissor.on(nomeEvento, function (click) { //quando 'nomeEvento' ocorrer, capture o alvo com a função 'function'
    console.log('um usuario clicou aqui chefia', click)
})


/* E X E M P L O   P E R P É T U O
meuEmissor.emit(nomeEvento, ' na barra de rolagem')
meuEmissor.emit(nomeEvento, ' no vazio')
meuEmissor.emit(nomeEvento, ' no botão OK')

let count = 0
setInterval(function () {
    meuEmissor.emit(nomeEvento, 'no balãozinho vermelho' + (count++)) //simulação de evento infinito
}, 1000)
*/


//objeto process é uma variável interna do Node.js. Stdin é standart input da CLI
// E X E M P L O   Ú N I C O
const stdin = process.openStdin()
function main() {
    return new Promise(function (resolve, reject) {
        stdin.addListener('data', function (value) { //nomenclatura conforme a documentação do Node.js
            //console.log(`Voceh digitou: ${value.toString()}`) //.trim() é um método que remove os espaços em branco na quebra de linha na entrada do console.
            return resolve(value)
        })
    })
}

main().then(function (resultado) {
    console.log('resultado é igual a = ', resultado.toString()) //experimenta não converter o valor para String. É divertido, eu juro!
})
