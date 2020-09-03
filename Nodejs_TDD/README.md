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

We now add our first dependency for development environment only, it is a JavaScript Standart Style module:

```bash
$ npm i standard -D
```

To inspect JS syntax in the project run:

```javascript
$ npx standard
```

Created `.gitignore` file.

Check stage area status:

```bash
$ git status -s
```

Commit changes:

```bash
$ git add .gitignore
$ git commit .gitignore -m "Added node_modules to gitignore"
$ git add -A
$ git commit -a -m "Added standard npm package"
```

Add another dependency for development environment, it is a module to perform lints on staged Git files:

```bash
$ npm i lint-staged -D
```

Time do add a script into our `package.json`. For every javascript file in our stage area, we run the check style lint:

```json
  "lint-staged": {
    "*.js": [
      "standard"
    ]
  }
```

To execute the script is simple as this:

```bash
$ npx lint-staged
```

Add the last version of a new dependency for development environment, it provides Git hooks in order to prevent bad commits:

```bash
$ npm i husky@latest -D
```

Time do add a new script into our `package.json`. Runs a specific script before a commit attempt:

```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
```

Notice how each module is working together with the other one so far.

We can improve our `lint-staged` script like this:

```json
  "lint-staged": {
    "*.js": [
      "standard --fix",
      "git add"
    ]
  }
```

Time to commit changes:

```bash
$ git add README.md
$ git commit README.md -m "Update README"
$ git add -A
$ git commit -a -m "Added husky and lint-staged modules"
```

Add other dependency for development environment, it is a JavaScript testing framework:

```bash
$ npm i jest -D
```

Once added to our project, let's configure `jest` in our machine:

```bash
$ node_modules/.bin/jest --init
```

Answer the questions like this: Y, node, Y, v8, N. After that a file named `jest.config.js` will be created. The coverage informs how much (in percentage) of our code is covered by tests.

Time to commit changes:

```bash
$ git add README.md
$ git commit README.md -m "Update README"
$ git add -A
$ git commit -a -m "Added jest module"
```
