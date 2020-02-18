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
mkdir 04-lists && mkdir 04-lists/service
cd 04-lists/service
npm init -y
touch service.js
```

Agora precisamos instalar um módulo para desenvolvermos nosso serviço que irá consumir dados do SWAPI. Execute `npm install axios`
```javascript
/*
Objetivo: criar um serviço que consuma informação da API do StarWars, para treinar procedimentos de manipulação de listas.
*/

//importando módulo interno do node.js
const axios = require('axios') //Promise based HTTP client for the browser and node.js
const URL = 'https://swapi.co/api/people' //SWAPI


//Pq async mesmo? Resposta: pq nós iremos manipular promises internamente na nossa função
async function obterPessoas (nome) {
    
    const url = `${URL}/?search=${nome}&format=json` //adorei esse recurso `${}`
    const response = await axios.get(url) //axios é uma promise
    return response.data
    
}

/* T E S T E  //soh confirmando o funcionamento do nosso serviço
//o parâmetro eh a personagem do StarWars
obterPessoas('Watto')
    .then(function (resultado) {
        console.log('resultado eh: ',resultado)
        
    })
    .catch(function (error) {
        console.log('DEU RUIM AQUI: ',error)        
    })

*/

//Exportamos um módulo para que um outro código faça as requisições. Boas práticas
//Por trás é como se estivessemos tornando a visibilidade desse objeto para público
module.exports = {
    //Em JS se a chave possui o mesmo nome do valor basta deixar o nome do objeto
    //obterPessoas: obterPessoas
    obterPessoas
}
```

Ótimo, fizemos nosso próprio módulo em Node.js que atua como um serviço que consome uma API e retorna uma consulta. Vamos criar agora um novo arquivo que irá fazer requisições ao nosso serviço.

```bash
mkdir 04-lists/for-forin
cd 04-lists/for-forin
touch for-forin-forof.js
```
```javascript
/*
Objetivo: retornar uma lista dos nomes das personagens de Star Wars
*/
//modulos criados por nós são importados com um './'
//arquivos .json também podem ser importados desta forma
const service = require('../service/service')

async function main() {
    try {
        const result = await service.obterPessoas('')
        const names = []
        
        //Esse tipo de objetivo tem que se ligar que vai usar lista de repetição
        /*
         Let is only visible in the for() loop and var is visible to the whole function. 
           So is the purpose of let statements only to free up memory when not needed in a certain block? – NoBugs 
           Yes, and it is encouraged that variables are existent only where they are needed. – batman
         result é nossa promise e portanto, um objeto
         results é o objeto que a SWAPI nos retorna com os resultados dos valores
         length -1 para prevenir off-by-one error (OBOE)
         An off-by-one error (OBOE), also commonly known as an OBOB (off-by-one bug), or OB1 error is a logic error involving the discrete equivalent of a boundary condition. It often occurs in computer programming when an iterative loop iterates one time too many or too few. This problem could arise when a programmer makes mistakes such as using "is less than or equal to" where "is less than" should have been used in a comparison, or fails to take into account that a sequence starts at zero rather than one (as with array indices in many languages). 
           i < length and i <= length - 1 are equivalent – IrkenInvader 
         Only use i++ if you need to use the original state of i before you increment it.
         ++i increments the value of i and returns the incremented value.
         i++ increments the value of i and return the original value.
        */
        console.time('execution-time-for')
        for(let i=0; i <= result.results.length -1; i++) {
            const pessoa = result.results[i] //elementos da lista serão armazenados na variável names
            names.push(pessoa.name)
        }
        console.timeEnd('execution-time-for')
        
        
        //um código melhor que o laço anterior
        console.time('execution-time-forin')
        for(let i in result.results) {
            const pessoa = result.results[i]
            names.push(pessoa.name) //name vem da SWAPI
        }
        console.timeEnd('execution-time-forin')
        
        
        //podemos otimizar mais ainda nosso laço
        console.time('execution-time-forof')
        for(pessoa of result.results) {
            names.push(pessoa.name)
        }
        console.timeEnd('execution-time-forof')
        
        //Apresenta o resultado para testarmos
        console.log(`names`,names)
    }
    
    catch (error) {
        console.error(`erro interno: `, error)
        
    }
    
}

main()
```

Vamos analisar agora a performance de cada operação.
```bash
execution-time-for: 0.168ms
execution-time-forin: 0.019ms
execution-time-forof: 0.091ms
```
Parabéns, você está ficando mais inteligente!

### Métodos auxiliares de Arrays
Prepare seu ambiente

```bash
mkdir maps
cd maps
touch map.js
```

__Array.prototype.map__ (Retorna um novo array baseado nos parâmetros)

```javascript
const service = require('../service/service')

//Substituindo a função global do Map no Node.js
Array.prototype.meuMap = function (callback) { //tem que ser callback né, pq para cada item que passa pelo loop o objeto é invocado e executa o main()
    const novoArrayMapeado = []
    for(let indice=0; indice<= this.length -1; ++indice) {
        const resultado = callback(this[indice], indice) //this[indice] = nome pessoa; indice é só o índice mesmo
        novoArrayMapeado.push(resultado)
    }
    
    return novoArrayMapeado;
}

async function main() {
    try {
        const results = await service.obterPessoas('a') //olha minha Promise tem o mesmo nome do objeto da SWAPI
        
        /* F O R   E A C H
        console.time('execution-time-foreach')
        const names = []
        //para cada item da lista da SWAPI, uma função será chamada para adicionar o item capturado na variável names
        results.results.forEach(function (item) {
            names.push(item.name)
        })
        console.timeEnd('execution-time-foreach')
        */
        
        /* M A P
        console.time('execution-time-map')
        //Map retorna um Array
        const names = results.results.map(function (pessoa) {
            console.log(`names`,names)            
        })
        console.timeEnd('execution-time-map')
        */
        
        /* M A P   O P T I M I Z A D O
        //pessoa é uma função agora por causa do símbolo =>
        //se esta função recebesse mais de uma parâmetro  // .map((pessoa, peso, altura) => { return pessoa.name, pessoa.height, pessoa.mass })
        console.time('execution-time-maparrow')
        const names [] = results.results.map(pessoa => pessoa.name)
        console.timeEnd('execution-time-maparrow')
        */
        
        // M E U   P R Ó P R I O   M A P
        console.time('execution-time-meumap')
         const names = results.results.meuMap(function (pessoa, indice) {
             return `[${indice}]${pessoa.name}`
        })
        console.timeEnd('execution-time-meumap')
        
        console.log(`names =`,names)
    }
    catch (error) {
        console.error(`erro interno: `, error)
        
    }
    
}

main()
```

__Array.prototype.filter__ (regras de negócio)
```bash
mkdir filter
cd filter
touch filter.js
```

```javascript
//importanto apenas uma função do nosso módulo
const { obterPessoas } = require('../service/service')

/* D E S T R U C T U R I N G
 * 
 * const item = {
 *     nome: 'Bode'
 *     idade: '1005'
 * }
 * const { nome, idade } = item
 * console.log(nome, idade) //Bode 1005
 */


// F I L T E R   P R Ó P R I O
Array.prototype.meuFilter = function(callback) {
    const lista = []
    for(index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        //0, "", null, undefined === false
        if(!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    //Try...catch sempre na última camada que chamada todas as outras
    try {
        
        const {results} = await obterPessoas('')
        
        /*
            //por padrão o filter deve retornar um valor booleano (0 ou 1)
            //para informar se deve ou não, incluir no novo array da lista
            //False -> não incluir na lista //True -> inclui na lista
        const familiaLars = results.filter(function (item) {
            //item é o parâmetro da nossa função
            //toLowerCase é a função para padronizar strings para letras minúsculas
            //indexOf() é uma função legal
                //seu parâmetro é o valor que buscamos no array
                //e então a indexOf() retorna a posição do parâmetro no array
                //quando o parâmetro não existe no array a indexOf() nos retorna -1
                //e se você quisesse filtrar por todas as personagens exceto os Lars, deveria usar === -1
            const result = item.name.toLowerCase().indexOf(`lars`) !== -1
            return result //True ou False
        })
        */


        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
         })
        //Código tambem executa //const familiaLars = results.meuFilter((item, index, lista) => item.name.toLowerCase().indexOf('lars') !== -1)


        //buscando os nomes das personagens da família Lars. 
        //O operador => indica que pessoa é uma função e () indica que só recebe 1 único parâmetro
        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)

        
    } catch (error) {
        console.error('deu ruim: ',error)
    }
} 
main()//sempre a última a ser chamada
```

__Array.prototype.reduce__ (Consolidar uma coleção de arrays em um único valor)
```bash
mkdir reduce
cd reduce
touch reduce.js
```

```javascript
//importanto apenas uma função do nosso módulo
const { obterPessoas } = require('../service/service')


// R E D U C E   P R Ó P R I O
Array.prototype.meuReduce = function (callback, valorInicial) {

    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

    for(let index = 0; index <= this.length -1; index++) {
        valorFinal = callback(valorFinal, this[index], this) //this é nossa lista completa
    }
    return valorFinal;
}

async function main() {

    try {
        
        const {results} = await obterPessoas('')
        
        const pesos = results.map((item) => parseFloat(item.height))
          console.log('pesos: ',pesos)
        
        /* Reduce nativo do JS trabalhando dados da SWAPI
        //colete todos os pesos e faça uma agregação com a soma de todos os valores, caso vazio retorne 0
        const total = pesos.reduce((anterior, proximo) => {
            return anterior + proximo
        }, 0)
          console.log('total: ',total)
        */

        //um array de arrays
        const minhaLista = [
            ['Rafael', 'Nunes', 'de', 'Brito'],
            ['Bahia', 'FATEC-ID', 'Brasil Logic Sistemas']
        ]

        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, []).join(', ')  //Em hipótese de falso retorne uma lista vazia
          console.log('total: ',total)

    } 
    catch (error) {
          console.error(`Deu ruim: `,error)
    }
}
main()
```

Vamos continuar estudando.
### Desenvolvimento de testes automatizados em JavaScript
__Asserções__
```javascript
var assert = require('assert')

var atual    = 100
var esperado = 200

try {
    assert.equal(esperado, atual, "os valores devem ser iguais")
} catch(e) {
    console.log(e) //Muito melhor para debugar, e o código fica lindo.
}
```

**Save-dev**
Nosso ambiente de desenvolvimento é aquele com os pacotes necessários para testarmos as regras de negócio, ao subirmos uma aplicação para a produção ela deve ser a melhor versão possível, enxuta, testada e funcional.

Preparando o ambiente e o ciclo de testes
```bash
mkdir 05-tests && cd 05-tests
mkdir main && cd main
npm init -y
npm i axios@^0.18.0
touch tests.js
npm i -g mocha
npm i --save-dev mocha@^6.1.3
npm i nock@^10.0.6
```

```javascript
const assert = require('assert')
const { obterPessoas } = require('./service')

//instalamos o pacote nock, para simularmos requisições
const nock = require('nock')

describe('Star Wars Tests', function() {
    //antes de processar a instrução it, deve definir alguma especificação.
    this.beforeAll( () => {
        const response = {
            //assumimos que o objeto retornado pela nossa API sempre manterá essa estrutura
            //{
            count:1,
            next:null,
            previous:null,
            results:[
                {
                    name:'R2-D2',
                    height:'96',
                    mass:'32',
                    hair_color:'n/a',
                    skin_color:'white, blue',
                    eye_color:'red',
                    birth_year:'33BBY',
                    gender:'n/a',
                    homeworld:'https://swapi.co/api/planets/8/',
                    //conflito de sintaxe
                    films:[Array],
                    species:[Array],
                    vehicles:[],
                    starships:[],
                    created:'2014-12-10T15:11:50.376000Z',
                    edited:'2014-12-20T21:17:50.311000Z',
                    url:'https://swapi.co/api/people/3/'
                }
            ]
           //}
        }
        nock('https://swapi.co/api/people')
            .get('/?search=r2-d2&format=json')
            .reply(200, response)
    })
    
    //it('deve buscar o r2d2 com o formato correto', async function () {
    it('deve buscar pelas informaçãoes do r2d2 no padrão pré-estabelecido', async () => {
        
        const expected = [{ //primeiro assert
            nome : 'R2-D2', 
            peso: '96'
        }]
        
        
        const nomeBase = 'r2-d2'
        try{            
            assert.deepEqual(nomeBase, 'r2-d2', "o teste eh especifico para buscar pela personagem r2-d2");
        } catch(e) {
            //console.log(e)
            console.log(e.toString())
        }   
        
        const resultado = await obterPessoas(nomeBase)
        try {
            //deepEqual() é mais que o equal()
            assert.deepEqual(resultado, expected)
        } catch(e) {
            //console.log(e)
            console.log(e.toString())
        }
            
        
    })
})
```

Comparação do tempo de execução do código de testes.
```bash
(1500ms)
(22ms)
(39ms)
```

Rodou aí aprendiz? Então nosso objetivo daqui pra frente é para que todos os nossos serviços possuam um ambiente de testes para realizarmos a validação das entradas e saídas da nossa API. Até a próxima.

### Utilizando o Node.js para criação de ferramentas de linha de comando (CLI)
Vamos começar a manipular informações de arquivos usando Node.js sem uma entidade de banco de dados, usando o console para as operações baseadas em CRUD. Nosso objetivo neste módulo será entender que quando consiguimos padronizar as informações de entrada, o critério do ambiente que será utilizado para guardar o resultados das nossas operações torna-se irrelevante, (SQL, NoSQL, arquivos).

__READ__
Preparando o ambiente
```bash
mkdir 06-cli && cd 06-cli
npm init -y
touch tests.js
npm i -g mocha
npm i --save-dev mocha@^6.1.3
```
Nosso `package.json`.
```json
{
  "name": "06-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

Criamos nosso arquivo que preservará as fontes dos dados que serão manipulados.
```javascript
const {
    readFile
} = require('fs') //um callback??!
const {
    promisify
} = require('util') //teamPromisse!!

const readFileAsync = promisify(readFile)

class Database {

        constructor() {
            this.NOME_ARQUIVO = 'herois.json'
        }

        //métodos auxiliares
        async obterDadosArquivo() {
            const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
            return JSON.parse(arquivo.toString())
        }
        escreverArquivo() {

        }

        //método princial da classe
        async listar(id) {
            const dados = await this.obterDadosArquivo()
            const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true)) //caso nenhum id seja passado ao chamar a função, traga todos ids.

                return dadosFiltrados
       }
}

module.exports = new Database() //exporta a instância para auxiliar arquivos que requisitarem a classe

```

População do arquivo JSON com registro dos heróis.
```json
[
  {
    "nome": "Flash",
    "poder": "Super-velocidade",
    "id": 1
  }
]
```

Criamos nosso arquivo de testes.
```javascript
//>npm t para executar os testes
const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { 
        nome: 'Flash',
        poder: 'super-velocidade',
        id: 1 
    }


//Uma suíte de testes é uma coleção de casos de teste ou specs destinados a testar um programa para verificar um determinado comportamento.
//>npm t para executar os testes
const {
    deepEqual,
    equal,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Super-velocidade',
    id: 1
}


//Uma suíte de testes é uma coleção de casos de teste ou specs destinados a testar um programa para verificar um determinado comportamento.
describe('Suíte de manipulação de Heróis', () => {

    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR //presumi-se que ao menos 1 registro tenha sido previamente cadastrado.
        const [resultado] = await database.listar() //aplicando destructing
        //const posicaoUm = resultado[0]
        
        deepEqual(resultado, expected)
    })

    //it('deve cadastrar um herói usando arquivos', async () => {
    //    const expected = { DEFAULT_ITEM_CADASTRAR }
    //    //
    //    ok(null, expected)
    //})
})
```
Agora vamos prosseguir para o teste de leitura de arquivos. Confira o código lá na pasta. 

Você sabia que pode personalizar o relatório de testes do mocha? Explore os argumentos da CLI do mocha.
```bash
mocha --reporter = nyan
```

