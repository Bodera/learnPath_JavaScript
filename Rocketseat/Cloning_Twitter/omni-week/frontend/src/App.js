import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} /> 
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

    /*caminho da url deve ser informado entre as tagas <BrowserRouter>*/
    /*as tags <Switch> garante que apenas uma rota seja invocada por vez pelo usuário*/
    /*cada rota da nossa aplicação deve ser declarada entre as tags <Route>*/
    /*os atributos path e component são obrigatórios aqui*/
    /*a lógica é qual componente renderizar dado um caminho na nossa URL. o atributo exact deve ser utilizado na rota raiz obrigatoriamente.*/
