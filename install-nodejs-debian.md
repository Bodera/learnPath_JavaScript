# Node.js installation procedure for Debian 10

Debian packages are reliable and rigorously tested, but they aren't recorecognized as the most recent ones, so this procedure is here to stablish the step-by-step to setup Node.js into Debian 10 (buster). Original tutorial available at [here](https://medium.com/collabcode/como-instalar-node-js-no-linux-corretamente-ubuntu-debian-elementary-os-729fb4c92f2d), still up until February/2020.

__Only use sudo if explicitly instructed to do so!__

- - - -

* Install library dependecies

```bash
$ sudo apt autoclean autoremove
$ sudo apt update
$ sudo apt install build-essential libssl-dev
```

* Install Node Version Manager (nvm). Below is the line to install version `0.35.2`, check the most recent version to use [here](https://github.com/nvm-sh/nvm#installing-and-updating).

```bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

* Open a new terminal window. Or just run the line below.

```bash
$ source ~/.profile
```

* List available Node.js versions to install.

```bash
$ nvm ls-remote
```

* Install Node.js. Below is the line to install version `13.8.0`.

```bash
$ nvm install v13.8.0
```
* __Optional!__ You can install more than one version of Node.js and switch between then in the future by doing like this:

```bash
$ nvm install v13.8.0 v10.19.0
```

```bash
$ nvm use v10.19.0
```

* Check Node.js version.

```bash
$ node -v
```

* Update __npm__.

```bash
$ npm i npm -g
```

## The end
