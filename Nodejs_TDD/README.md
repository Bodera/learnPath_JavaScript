# README

In this project we will work programming concepts such as clean architecture and test-driven-development. We will use Node.js to build an API and apply these ideas on it.

Course provided by [Rodrigo Manguinho](https://www.linkedin.com/in/rmanguinho/) available for free [here](https://www.youtube.com/playlist?list=PL9aKtVrF05DyEwK5kdvzrYXFdpZfj1dsG).

##### Notes from video 1

We start with an README and a LICENSE.

Initialize the project setup:

```bash
$ npm init
```

Arquivo `package.json` obtido:
```json
{
  "name": "nodejs_tdd",
  "version": "1.0.0",
  "description": "API built following TDD and Clean Architecture practices.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Bodera/learnPath_JavaScript/tree/main/Nodejs_TDD"
  },
  "keywords": [
    "tdd",
    "api"
  ],
  "author": "Bodera",
  "license": "ISC"
}
```

Time to commit changes:

```bash
$ git add -A
$ git commit -a -m "Initialized npm"
```