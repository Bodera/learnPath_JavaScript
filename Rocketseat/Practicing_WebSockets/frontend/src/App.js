//App.js - Componente eh um arquivo JS que tem por obrigação retornar um conteúdo JSX
//pode ser uma função ou uma classe. Ele fica isolado do código principal e pode conter HTML, CSS e JS.
import React from 'react';
import { BrowserRouter } from 'react-router-dom' //obrigatório.
// Responsável por dar suporte aos componentes que precisam de acesso às rotas

import Header from './components/Header'
import Routes from './routes'

function App() { //diferenciando componentes de acordo com a URL
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;