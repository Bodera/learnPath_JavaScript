# O que não é o Node.js
* Uma linguagem de programação
* Ferramenta para criação de sites simples
* Um framework JavaScript
* Ferramenta para criação de aplicações front end

# O que é o Node.js
* Plataforma para construção de aplicações Backend usando JavaScript

# Node Package Manager
* Gerenciador de dependências JavaScript
* Identifica dependências a partit de arquivos `package.json`
* Usado também para executar scripts bash a partir de seu projeto

# Iniciando um projeto Node.js
```bash
mkdir 01-npm 
cd 01-npm
node --version
npm --version
npm init -Y
touch index.js
```
```javascript
console.log('Hello node!');
const a=1;
const b=2;
console.log(a+b);
```
```bash
node index.js
 Hello node!
 3
```
```json
{
  "name": "01-npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
```bash
npm run dev
 Hello node!
 3
```
___
# Como o JavaScript se comporta na VM
1. Camada de aplicação
2. Máquina virtual V8 (JS Engine)
3. API Node.js (JS vira C++)
4. Camada do sistema operacional

## Event loop
Cada operação bloqueante disparada pela aplicação é delegada ao sistema operacional, quando o sistema operacional resolve cada uma dessas operações ele executa uma chamada de volta, daí p fluxo de eventos retorna o resultado para quem disparou a operação.
Um grande loop enfileira as tarefas. Funcionando no modo single-thread, mas o sistema operacional quem cuida dos processos.

# O ciclo de vida de funções JavaScript
* Funções que dependem de execução externa serão executadas em background
* A forma com que seu código é escrito é diferente da ordem em que é executado

# Fluxo de operações JavaScript
```bash
mkdir 02-nodejs
cd 02-nodejs
npm init -y
touch index.js
```
### Código de exemplo de como um novato pensa antes de entender o funcionamento dos callbacks em JavaScript
```javascript
/*
Objetivo 0 - Retornar um usuário
Objetivo 1 - Retornar um número de telefone de um usuário a partir do seu Id
Objetivo 2 - Retornar um endereço do usuário pelo seu Id
*/
//primeiro organizamos as funções que iremos precisar
function obterUsuario() {
    setTimeout(function () { //quando a base de dados é externa usamos o setTimeout
        return {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        }
    }, 1000) //miliseconds
}

function obterTelefone(idUsuario) {
    setTimeout(() => {
        return {
            telefone: '+17022682156',
            ddd: '17'
        }
    }, 2000);
}

function obterEndereco(idUsuario) {

}


//acessando os valores que nos interessam
const usuario = obterUsuario()
const telefone = obterTelefone(usuario.id)


//debugando nossa lógica
console.log('usuario: ', usuario)
console.log('telefone: ', telefone)
```
### Código com correções para o bom funcionamento da lógica do iniciante em Node.js e callbacks
```javascript
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
```
___
### Resolvendo o problema de código aninhado
*Promises* são objetos nativos do JavaScript que estão presentes em quase todo o processo assíncrono a partir de estados. 
Ao instanciar esse tipo de objeto, ele recebe o valor inicial __Pending__, isso quer dizer que a promessa não terminou ou ainda não houve rejeição. Outro estado do nosso objeto *Promise* é o __Fulfilled__, esse valor nos indica que todas as operações foram executadas com sucesso, do contrário o valor __Rejected__ é apresentado, mas podemos capturar essa exceçâo em uma estrutura `try... catch` por exemplo.

Ao percebermos o valor da nossa *Promise* iremos manipulá-la usando funções `.then`. Essa função pode receber até dois parâmetros, a função da hipótese de sucesso e a função para tratar o erro. Todas essas funções podem retornar uma nova *Promise*.

### Refatorando o código e esquecendo callbacks
O código trabalhando com Promisses fica assim:
```javascript
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
//pipes => promises são resolvidas da maneira FIFO

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
```
Parabéns, você ainda pode subir mais um degrau, vamos aprender a utilizar um código mais limpo ainda.
### Lidando com async/await
* Proporciona facilidade na visualização do fluxo de funções
* __Não__ altera a performance da aplicação
* A ideia começou no C#, implementada no TypeScript e está disponível no JavaScript
* Somente iremos utilizar esse recurso quando precisarmos tratar a resposta da requisição e manipular os resultados.
Vamos ao código!
```javascript
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
```
### Noções introdutórias sobre manipulação de eventos no Node.js
Dentro da família dos manipuladores de ações do Node.js, o *EventEmitter* possui popularidade reconhecida. Todas as operações da sua aplicação Node.js são consequências de eventos, logo tudo que é manipulado, será feito a partir de eventos (cliques de usuário, tempo limite atingido, etc..)
__Não confunda as bolas!__ Promises são aplicados no seguinte cenário: o evento será disparado uma __única__ vez, a promise entra em ação e logo em seguida encerra sua participação. O EventEmitter será usado para eventos repetitivos.
* Usado para ações contínuas
* Usado para quase tudo no ecossistema do Node
* Bastante usado também nos navegadores web(métodos: .onCLick(), .getDocumentById(), etc..)
* Trabalha sob o padrão de design Observer/Publish e Subscriber (PubSub). Publicadores enviam mensagens para um hub responsável por gerenciar as requisições dos usuários que consomem essas mensagens.

Vamos preparar o ambiente.
```bash
mkdir 03-events
cd 03-events
npm init -y
touch index.js
```

```javascript
const EventEmitter = require('events') //importando a classe abstrata de eventos do Node

class MeuEmissor extends EventEmitter { //precisamos criar uma classe própria da nossa aplicação que irá extender todos os métodos da classe EventEmitter
    
}

const meuEmissor = new MeuEmissor() //instanciamos um objeto do tipo MeuEmissor

const nomeEvento = 'usuario:click' //criando nosso manipulador de eventos (nome meramente ilustrativo para fins educacionais)

//implementar um evento observador que irá nos notificar quando qualquer outro evento venha a ocorrer
meuEmissor.on(nomeEvento, function (click) { //quando 'nomeEvento' ocorrer, capture o alvo com a função 'function'
    console.log('um usuario clicou aqui chefia', click)
})


/* E X E M P L O   01
meuEmissor.emit(nomeEvento, ' na barra de rolagem')
meuEmissor.emit(nomeEvento, ' no vazio')
meuEmissor.emit(nomeEvento, ' no botão OK')

let count = 0
setInterval(function () {
    meuEmissor.emit(nomeEvento, 'no balãozinho vermelho' + (count++)) //simulação de evento infinito
}, 1000)
*/

//objeto process é uma variável interna do Node.js. Stdin é standart input da CLI
const stdin = process.openStdin()
stdin.addListener('data', function (value) { //nomenclatura conforme a documentação do Node.js
    console.log(`Voceh digitou: ${value.toString().trim()}`) //.trim() é um método que remove os espaços em branco da entrada.
})
```
Muito bem, você está evoluindo!
### Manipulação de listas
1. For 
1. Foreach
1. ForIn
1. Map
1. Filter
1. Reduce

Organize o novo ambiente:
```bash
mkdir 04-lists && mkdir 04-lists/for-forin
cd 04-lists/for-forin
npm init -y
touch service.js
```

Agora precisamos instalar um módulo para desenvolvermos nosso serviço que irá consumir dados do SWAPI. Execute `npm install axios`
```javascript
const axios = require('axios')
```
