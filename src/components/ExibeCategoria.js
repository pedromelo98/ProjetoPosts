import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/PostsAPI'
import { Button, Segment, Divider, Header, Icon, Confirm } from 'semantic-ui-react'
import { renderizaComentarios, mudaIdDoPai } from '../actions/ComentariosActions'
import { mudaCategorie } from '../actions/CategoriesActions'
import { novoPost, mudaAddPost, mudaTitle, mudaBody, mudaValueCategoria, mudaEditPost, mudaId, mudaTime, deletarPost, votarPost } from '../actions/PostsActions'


class ExibeCategoria extends Component {

    state = {
        posts: [],
        divid: '',
        categoria: '',
        confirm: false,
        id: ''
    }

    corDoPostSelecionado(postid) {
        if (postid === this.state.divid) {
            return 'blue'
        }
        return 'black'
    }

    /*componentDidMount() {
        this.popularPosts()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categorie !== this.state.categoria) {
            this.popularPosts(nextProps.categorie)
        }
    }*/

    popularPosts(categoria = this.props.categorie) {
        PostsAPI.getPostsPorCategoria(categoria).then((posts) => {
            this.setState({ posts: this.ordenaPosts(posts), categoria: this.props.categorie });
        })
    }

    corDosVotos(numeroDeVotos) {
        if (numeroDeVotos === 0) {
            return ('yellow')
        } else if (numeroDeVotos < 0) {
            return ('red')
        }
        return ('blue')
    }

    ordenaPosts(posts) {
        switch (this.props.ordenar) {
            case 'curtidos':
                return posts.sort((a, b) => a.voteScore < b.voteScore)
            case 'comentados':
                return posts.sort((a, b) => a.commentCount < b.commentCount)
            default:
                return posts.sort((a, b) => a.timestamp < b.timestamp)
        }
    }

    renderizarCategoria() {
        if (this.state.posts[0]) {
            return (
                this.state.posts.slice(0).map((post, index) => {
                    return (
                        <div key={post.id} id={post.id} >

                            <Divider horizontal><Header as='h3' textAlign='left'>{new Date(post.timestamp).toLocaleDateString() + " ás " + new Date(post.timestamp).toLocaleTimeString()}</Header></Divider>
                            <Segment color={this.corDoPostSelecionado(post.id)} >
                                <Header textAlign='center' >{post.title}</Header>
                                <Button onClick={() => this.props.mudaCategorie(post.category)} color='blue' inverted floated='left'>Categoria: {post.category}</Button>
                                <Button onClick={() => this.setState({ confirm: true, id: post.id })} basic icon floated='right'><Icon name='close' /></Button>
                                <Confirm
                                    open={this.state.confirm}
                                    content='Tem certeza de que quer deletar esse post?'
                                    cancelButton='Não'
                                    confirmButton='Sim'
                                    onCancel={() => this.setState({ confirm: false })}
                                    onConfirm={() => { this.props.deletarPost(this.state.id); this.setState({ confirm: false }) }}
                                />
                                <Button onClick={() => { this.props.mudaAddPost(true); this.props.mudaTitle(post.title); this.props.mudaBody(post.body); this.props.mudaValueCategoria(post.category); this.props.mudaEditPost(true); this.props.mudaId(post.id); this.props.mudaTime(post.timestamp) }} basic icon floated='right'><Icon name='pencil' /></Button>
                                <Divider clearing />
                                <Header as='h5' textAlign='left' ><Icon name='user' />@{post.author}:</Header><br />
                                <Header as='h4' textAlign='left'>
                                    {post.body}
                                </Header>
                                <Divider clearing />
                                <Header color={this.corDosVotos(post.voteScore)} floated='right' >{post.voteScore}</Header>
                                <br />
                                <Button onClick={() => this.props.votarPost(post.id, 'upVote')} icon color='blue' floated='left' >
                                    <Icon name='thumbs up' />
                                </Button>
                                <Button onClick={() => this.props.votarPost(post.id, 'downVote')} icon color='red' floated='left' >
                                    <Icon name='thumbs down' />
                                </Button>
                                <Button color='grey' floated='left' onClick={() => { this.props.renderizaComentarios(true); this.setState({ divid: post.id }); this.props.mudaIdDoPai(post.id) }}>
                                    <Icon name='comments' />
                                    {post.commentCount} Comentários
                                </Button>
                            </Segment><br />
                        </div>
                    )
                })
            )
        } else {
            return (
                <Header><br /><br /> Nenhum post nessa categoria!<br /><br /> <Header.Subheader>Seja a primeira pessoa a postar clicando no botão "+" localizado no menu lateral esquerdo e poste para a categoria "{this.props.categorie}"!</Header.Subheader> </Header>
            )
        }
    }


    render() {
        return (
            <div className='App' >
                {this.popularPosts()}
                <Header><br />Categoria: {this.props.categorie}<br /><br /><Header.Subheader>Nesta página você encontrará todos os posts da categoria {this.props.categorie}!<br />Para filtrar posts de acordo com seus interesses utilize as opções do menu lateral esquerdo!</Header.Subheader></Header><br /><br />
                {this.renderizarCategoria()}
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        posts: state.PostsReducer.posts,
        categorie: state.CategoriesReducer.categorie,
        visible: state.ComentariosReducer.visible,
        id: state.ComentariosReducer.idDoPai,
        ordenar: state.PostsReducer.ordenar
    }
)

export default connect(mapStateToProps, { renderizaComentarios, mudaIdDoPai, mudaCategorie, novoPost, mudaAddPost, mudaTitle, mudaValueCategoria, mudaBody, votarPost, mudaEditPost, mudaId, mudaTime, deletarPost })(ExibeCategoria)
