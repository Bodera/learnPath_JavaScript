# A few explanations about Node.js behavior 

## Non blocking I/O
Quando o cliente faz a requisão o back-end não processa linearmente as instruções do pacote, concorrência e paralelismo se destacam aqui, aplicados a micro-serviços.

Isso possibilita o tempo-real. Tipo twitter e facebook.

Set up the backend
```bash
$ mkdir backend && cd backend
$ npm init -y
```

## Adding dependencies to `package.json`

```bash
$ npm i express
$ npm i mongoose
$ npm install --save-dev nodemon
``` 


```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4",
    "mongoose": "^5.4.11"
  },
  "devDependencies": {
    "nodemon": "^1.18.10"
  }
}
```

#### Express
The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.

##### Middleware functions
After read [this guide](https://expressjs.com/en/guide/writing-middleware.html), lets create a simple Express app.

#### Mongoose
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

##### Object relational mapping
Object-relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language.

#### Nodemon
Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

For 

1. Add `scripts` object to our package.json file, and create the `start` script to run nodemon among our application.

```json
"scripts": {
	"start": "nodemon src/index.js"
}
```

2. In the `backend` directory run:
```bash
$ npm start
```
3. You shoul receive the following output in terminal.
```bash
> backend@1.0.0 start /home/bode/Codes/03-Git/learnPath_JavaScript/[Aplication]--OmniStack/omni-week/backend
> nodemon src/index.js
[nodemon] 1.18.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/index.js`
Server started on port 3000.
```

Congratulations, now when you make changes in `index.js` and save the archive, nodemon will automatcly update your application, but just when detected internet connection.

#### Coding our Twitter app

```bash
$ mkdir src && cd src
$ nano index.js
``` 

```javascript
// create constants, so that the variable value can not be changed in execution time.

// import the express extension and alocate in our constant named express.
const express = require('express');

// alocate the middleware function into another constant named app.
const app = express();

// get is HTTP method for which the middleware function applies.
// it receives the route for which the middleware function applies.
// where req is the HTTP request argument to the middleware function.
app.get('/', function (req, res) {
	return res.send('Hello from middleware response!');
});

// alocate the application on port 3000, for local access.
app.listen(3000, function() {
	console.log('Server started on port 3000.');
});
```

Now let's check if it's all okays by now.
```bash
$ node index.js
```
#### Debuging our Twitter app
* Insomnia

* Postman

##### Tests

Methos post for input:
```json
{
    "author": "Bodera",
    "content": "Bééé"
}
```

Should return:
```json
    "likes": 0,
    "_id": "<hash>",
    "author": "Bodera",
    "content": "Bééé",
    "createdAt": "<timestamp>",
    "__v": 0
```

Method get for input:
```
http://127.0.0.1:3000/tweets
```

Should return:
```
```json
    "likes": 0,
    "_id": "<hash>",
    "author": "Bodera",
    "content": "Bééé",
    "createdAt": "<timestamp>",
    "__v": 0
```
```
