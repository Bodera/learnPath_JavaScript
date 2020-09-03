# README

In this project we will work programming concepts such as clean architecture and test-driven-development. We will use Node.js to build an API and apply these ideas on it.

Course provided by [Rodrigo Manguinho](https://www.linkedin.com/in/rmanguinho/) available for free [here](https://www.youtube.com/playlist?list=PL9aKtVrF05DyEwK5kdvzrYXFdpZfj1dsG).

##### Notes from video 1

We start with an README and a LICENSE.

Initialize the project setup:

```bash
$ npm init
```

Time to commit changes:

```bash
$ git add -A
$ git commit -a -m "Initialized npm"
```

We now add our first dependency for development environment only, it is a JavaScript Standart Style package:

```bash
$ npm i standard -D
```

To inspect JS syntax in the project run:

```javascript
$ npx standard
```

Created `.gitignore` file.

Commit changes:

```bash
$ git add .gitignore
$ git commit .gitignore -m "Added node_modules to gitignore"
$ git add -A
$ git commit -a -m "Added standard npm package"
```
