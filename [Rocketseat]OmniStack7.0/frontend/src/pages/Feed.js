import React, { Component } from 'react'
import api from '../services/api' 
import io from 'socket.io-client'

//carregando a folha de estilo do componente Feed
import './Feed.css'

//alocando o caminho relativo dos ícones em uma variável
import more from '../assets/more.svg' 
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

class Feed extends Component {
    //ao criarmos um componente como uma classe, ele recebe acesso a métodos exclusivos.

    state = { //armazenamos informações em um estado. Estados são variáveis de Componentes
        feed: []
    }

    //esse método eh executado automaticamente qnd o componente eh carregado
    async componentDidMount(){ 
        this.registerToSocket()
        const response = await api.get('posts')
        this.setState({ feed: response.data }) //alterações do estado (backend do nosso WebSocket) refletem na página em tempo real
    }

    registerToSocket = () => {
        const socket = io('http://localhost:2277')
        //post references PostController from backend, like references LikeController from backend
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] }) //Operador spread para atualizar o último post para a posição 1. LIFO.
        })
        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map( post => 
                    post._id === likedPost._id ? likedPost : post
                    )
            })
        })
    }

    //arrow funtions podem passar outras funções como referência
    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }

    //tudo que está no método return dentro do método render será renderizado no navegador.
    //O uso da combinação de map key nas linhas 33 e 34 seguem as boas práticas.
    render() { 
                return (
                    <section id="post-list">
                        { this.state.feed.map( post => (
                            <article key={post._id}>
                            <header>
                                <div className="user-info">
                                    <span className="name">{post.author}</span>
                                    <span className="place">{post.place}</span>
                                </div>

                                <img src={more} alt="Mostrar mais"></img>
                            </header>

                            <img src={`http://localhost:2277/files/${post.image}`} alt="Ilustração da descrição"></img>

                            <footer>
                                <div className="actions">
                                    <button type="button" onClick={() => this.handleLike(post._id)}>
                                        <img src={like} alt="Reagir com gostar"></img>
                                    </button>
                                    <img src={comment} alt="Comentar"></img>
                                    <img src={send} alt="Enviar para"></img>
                                </div>

                                <strong>
                                    {post.likes} likes
                                </strong>

                                <p>
                                    {post.description}
                                    <span>{post.hashtags}</span>
                                </p>
                            </footer>
                        </article>
                    )) }
                </section>
            )
        }
}

export default Feed