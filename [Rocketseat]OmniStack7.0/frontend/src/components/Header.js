import React from 'react'
import { Link } from 'react-router-dom' //The ordinary href

import './Header.css'
import logo from '../assets/logo.svg' //it's a variable
import camera from '../assets/camera.svg' //another one. Stores the address to our svg img

//Código JS pode ser embutido nos componentes utilizando {}
export default function Header(){
    return( 
        <header id="main-header"> 
            <div className="header-content">
                <Link to="/">
                    <img src={logo} alt="Boas-vindas"></img>
                </Link>
                <Link to="/new">
                    <img src={camera} alt="Wireframe botão enviar publicação."></img> 
                </Link>
            </div>
        </header>
    )
}