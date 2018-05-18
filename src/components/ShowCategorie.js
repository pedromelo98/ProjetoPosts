import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import {
    Button,
    Segment,
    Divider,
    Header,
    Icon,
    Confirm
} from 'semantic-ui-react'
import {
    renderComments,
    changeParentId
} from '../actions/CommentsActions'
import { changeCategory } from '../actions/CategoriesActions'
import {
    newPost,
    changeAddPost,
    changeTitle,
    changeBody,
    changeCategorie,
    changeCategorieValue,
    changeEditPost,
    changeId,
    changeTime,
    deletePost,
    votePost,
    changeOrientation,
    getByCategorie
} from '../actions/PostsActions'
import { Link } from 'react-router-dom'


class ShowCategorie extends Component {

    state = {
        posts: [],
        divid: '',
        categorie: '',
        confirm: false,
        id: ''
    }

    PostSelectedColor(postid) {
        if (postid === this.state.divid) {
            return 'blue'
        }
        return 'black'
    }



    componentDidMount() {
        this.props.getByCategorie(this.props.category)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newpost) {
            this.props.getByCategorie(nextProps.category)
        }
        if (nextProps.filter !== this.state.filter) {
            this.setState({ posts: this.filterPosts(this.state.posts, nextProps.filter), filter: nextProps.filter })
        }
        if (nextProps.posts !== this.state.posts) {
            this.setState({ posts: this.filterPosts(nextProps.posts, '') })
        }
        if (nextProps.category !== this.props.category) {
            this.props.getByCategorie(nextProps.category)
        }
    }



    votesColor(votesNumber) {
        if (votesNumber === 0) {
            return ('yellow')
        } else if (votesNumber < 0) {
            return ('red')
        }
        return ('blue')
    }

    filterPosts(posts, filter) {
        switch (filter) {
            case 'curtidos':
                return posts.sort((a, b) => a.voteScore < b.voteScore)
            case 'comentados':
                return posts.sort((a, b) => a.commentCount < b.commentCount)
            default:
                return posts.sort((a, b) => a.timestamp < b.timestamp)
        }
    }

    desableButtons(button) {
        if (button === 'curtidos') {
            switch (this.props.filter) {
                case 'curtidos':
                    return true
                default:
                    return false
            }
        }
        if (button === 'comentados') {
            switch (this.props.filter) {
                case 'comentados':
                    return true
                default:
                    return false
            }
        }
        if (button === 'recentes') {
            switch (this.props.filter) {
                case '':
                    return true
                default:
                    return false
            }
        }
    }

    renderCategorie() {
        if (this.state.posts[0]) {
            return (
                this.state.posts.slice(0).map((post, index) => {
                    return (
                        <div key={post.id} id={post.id} >

                            <Divider horizontal><Header as='h3' textAlign='left'>{new Date(post.timestamp).toLocaleDateString() + " ás " + new Date(post.timestamp).toLocaleTimeString()}</Header></Divider>
                            <Segment color={this.PostSelectedColor(post.id)} >
                                <Header textAlign='center' >{post.title}</Header>
                                <Button onClick={() => this.props.changeCategorie(post.category)} color='blue' inverted floated='left'>Categoria: {post.category}</Button>
                                <Button onClick={() => this.setState({ confirm: true, id: post.id })} basic icon floated='right'><Icon name='close' /></Button>
                                <Confirm
                                    open={this.state.confirm}
                                    content='Tem certeza de que quer deletar esse post?'
                                    cancelButton='Não'
                                    confirmButton='Sim'
                                    onCancel={() => this.setState({ confirm: false })}
                                    onConfirm={() => { this.props.deletePost(this.state.id); this.setState({ confirm: false }) }}
                                />
                                <Button onClick={() => { this.props.changeAddPost(true); this.props.changeTitle(post.title); this.props.changeBody(post.body); this.props.changeCategorieValue(post.category); this.props.changeEditPost(true); this.props.changeId(post.id); this.props.changeTime(post.timestamp) }} basic icon floated='right'><Icon name='pencil' /></Button>
                                <Link to={`/${post.category}/${post.id}`}><Button onClick={() => { this.props.changeCategory('post'); this.props.renderComments(false) } } basic icon floated='right'><Icon name='browser' /></Button></Link>
                                <Divider clearing />
                                <Header as='h5' textAlign='left' ><Icon name='user' />@{post.author}:</Header><br />
                                <Header as='h4' textAlign='left'>
                                    {post.body}
                                </Header>
                                <Divider clearing />
                                <Header color={this.votesColor(post.voteScore)} floated='right' >{post.voteScore}</Header>
                                <br />
                                <Button onClick={() => this.props.votePost(post.id, 'upVote')} icon color='blue' floated='left' >
                                    <Icon name='thumbs up' />
                                </Button>
                                <Button onClick={() => this.props.votePost(post.id, 'downVote')} icon color='red' floated='left' >
                                    <Icon name='thumbs down' />
                                </Button>
                                <Button color='grey' floated='left' onClick={() => { this.props.renderComments(true); this.setState({ divid: post.id }); this.props.changeParentId(post.id) }}>
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
                <Header><br /><br /> Nenhum post nessa categoria!<br /><br /> <Header.Subheader>Seja a primeira pessoa a postar clicando no botão "+" localizado no menu lateral esquerdo e poste para a categoria "{this.props.category}"!</Header.Subheader> </Header>
            )
        }
    }


    render() {
        return (
            <div className='App' >
                <Header><br />Categoria: {this.props.category}<br /><br /><Header.Subheader>Nesta página você encontrará todos os posts da categoria {this.props.category}!<br />Para filtrar posts de acordo com seus interesses utilize os botões abaixo:</Header.Subheader></Header><br />
                <Button.Group>
                    <Button disabled={this.desableButtons('recentes')} onClick={() => this.props.changeOrientation('')} color='blue' size='mini' >Recentes</Button>
                    <Button.Or text='ou' />
                    <Button disabled={this.desableButtons('curtidos')} onClick={() => this.props.changeOrientation('curtidos')} color='blue' size='mini' >Mais curtidos</Button>
                    <Button.Or text='ou' />
                    <Button disabled={this.desableButtons('comentados')} onClick={() => this.props.changeOrientation('comentados')} color='blue' size='mini' >Mais comentados</Button>
                </Button.Group><br /><br />
                {this.renderCategorie()}
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        posts: state.PostsReducer.posts,
        newpost: state.PostsReducer.newpost,
        category: state.CategoriesReducer.category,
        visible: state.CommentsReducer.visible,
        id: state.CommentsReducer.parentId,
        filter: state.PostsReducer.filter
    }
)

export default connect(
    mapStateToProps,
    {
        renderComments,
        changeParentId,
        changeCategory,
        newPost,
        changeAddPost,
        changeTitle,
        changeCategorieValue,
        changeBody,
        votePost,
        changeEditPost,
        changeId,
        changeTime,
        deletePost,
        changeOrientation,
        getByCategorie,
        changeCategorie
    })(ShowCategorie)
