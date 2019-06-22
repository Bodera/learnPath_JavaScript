import React, { Component } from 'react'
import api from '../services/api'

import './NewPost.css'

class NewPost extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    }

    //custom functions. Receive an event as param, this event encapsulates data in an array.
    handleSubmit = async e => {
        e.preventDefault()
        /*
        console.log(this.state)
            Evidência no console do navegador:
            {image: File
            , author: "Aquele Bode"
            , place: "Indaiatuba-SP, Brazil"
            , description: "Teste das funcionalidades do formulário de novo post."
            , hashtags: "#tresjoulie #enchante"}
         */
        const data = new FormData() //soh que não estamos usando JSON, mas sim o Multi-Form Data

        data.append('image', this.state.image)
        data.append('author', this.state.author)
        data.append('place', this.state.place)
        data.append('description', this.state.description)
        data.append('hashtags', this.state.hashtags)

        await api.post('posts', data)

        this.props.history.push('/') //legal React
    }
    handleImageChange = e => {
        this.setState({ image: e.target.files[0] })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() { //este método é obrigatório dentro da classe ao declararmos o componente dessa forma.
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}/>

                <input
                    type="text"
                    name="author"
                    placeholder="Autor do post"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input
                    type="text"
                    name="place"
                    placeholder="Local do post"
                    onChange={this.handleChange}
                    value={this.state.place}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Descrição do post"
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                
                <input
                    type="text"
                    name="hashtags"
                    placeholder="Hashtags do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />

                <button type="submit">Enviar</button>
            </form>
        )
    }
}

export default NewPost