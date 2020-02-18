//Linha 11: cada rota eh também um componente
//linha 10: garante que apenas um rota seja chamada a cada url requisitada
//O Route apenas checa se o caminho que definimos para ele está contido na cadeia de chars da URL
// sendo assim devemos passar o atributo exact para fazer uma validação deepEquals
import React from 'react'
import { Switch, Route } from 'react-router-dom' //2 objetos do pacote em questão.

import Feed from './pages/Feed'
import NewPost from './pages/NewPost'

function Routes() { //Eh um componente
    return(
        <Switch> 
            <Route path="/" exact component={Feed} ></Route> 
            <Route path="/new" component={NewPost} ></Route> 
        </Switch>
    )
}

export default Routes