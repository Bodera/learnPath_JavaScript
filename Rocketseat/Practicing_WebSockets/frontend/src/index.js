//index.js - arquivo principal do nosso projeto
import React from 'react'; //habilita o JSX e sua importação é obrigatória nos arquivos
import ReactDOM from 'react-dom'; //habilita integração com a árvore de elementos do navegador (DOM)
import App from './App'; // importa componente App

import './global.css' //habilita estilização de página personalizada indicando o caminho relativo

ReactDOM.render(<App />, document.getElementById('root')); //Precisa ter a div root