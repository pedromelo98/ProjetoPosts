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
    changeCategorieValue,
    changeEditPost,
    changeId,
    changeTime,
    deletePost,
    votePost,
    changeOrientation,
    getAllPosts,
    getById
} from '../actions/PostsActions'
import { Link } from 'react-router-dom'


class PostDetails extends Component {

    state = {
        posts: [],
        divid: '',
        confirm: false,
        id: ''
    }

    votesColor(votesNumber) {
        if (votesNumber === 0) {
            return ('yellow')
        } else if (votesNumber < 0) {
            return ('red')
        }
        return ('blue')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newpost) {
            this.props.getById(this.props.utils.match.params.post_id)
        }

    }

    componentDidMount() {
        this.props.getById(this.props.utils.match.params.post_id)

    }

    renderPost() {
        if (this.props.postbyid.author) {
            return (
                <div id={this.props.postbyid.id} key={this.props.postbyid.id} >

                    <Divider horizontal><Header as='h3' textAlign='left'>{new Date(this.props.postbyid.timestamp).toLocaleDateString() + " ás " + new Date(this.props.postbyid.timestamp).toLocaleTimeString()}</Header></Divider>
                    <Segment>
                        <Header textAlign='center' >{this.props.postbyid.title}</Header>
                        <Link to={`/${this.props.postbyid.category}`} ><Button onClick={() => { this.props.changeCategory(this.props.postbyid.category); this.props.changeOrientation(''); this.props.renderComments(false) }} color='blue' inverted floated='left'>Categoria: {this.props.postbyid.category}</Button></Link>
                        <Button onClick={() => this.setState({ confirm: true, id: this.props.postbyid.id })} basic icon floated='right'><Icon name='close' /></Button>
                        <Confirm
                            open={this.state.confirm}
                            content='Tem certeza de que quer deletar esse post?'
                            cancelButton='Não'
                            confirmButton='Sim'
                            onCancel={() => this.setState({ confirm: false })}
                            onConfirm={() => { this.props.deletePost(this.state.id); this.setState({ confirm: false }) }}
                        />
                        <Button onClick={() => { this.props.changeAddPost(true); this.props.changeTitle(this.props.postbyid.title); this.props.changeBody(this.props.postbyid.body); this.props.changeCategorieValue(this.props.postbyid.category); this.props.changeEditPost(true); this.props.changeId(this.props.postbyid.id); this.props.changeTime(this.props.postbyid.timestamp) }} basic icon floated='right'><Icon name='pencil' /></Button>
                        <Divider clearing />
                        <Header as='h5' textAlign='left' ><Icon name='user' />@{this.props.postbyid.author}:</Header><br />
                        <Header as='h4' textAlign='left'>
                            <p>{this.props.postbyid.body}</p>
                        </Header>
                        <Divider clearing />
                        <Header color={this.votesColor(this.props.postbyid.voteScore)} floated='right' >{this.props.postbyid.voteScore}</Header>
                        <br />
                        <Button onClick={() => this.props.votePost(this.props.postbyid.id, 'upVote')} icon color='blue' floated='left' >
                            <Icon name='thumbs up' />
                        </Button>
                        <Button onClick={() => this.props.votePost(this.props.postbyid.id, 'downVote')} icon color='red' floated='left' >
                            <Icon name='thumbs down' />
                        </Button>
                        <Button color='grey' floated='left' onClick={() => { this.props.renderComments(true); this.setState({ divid: this.props.postbyid.id }); this.props.changeParentId(this.props.postbyid.id) }}>
                            <Icon name='comments' />
                            {this.props.postbyid.commentCount} Comentários
                                </Button>
                    </Segment><br />
                </div>
            )
        }
        return (
            <div>
                <Header>Erro!</Header>
                <Header as='h5' >Post deletado ou não encontrado</Header>
            </div>
        )
    }


    render() {
        return (
            <div className='App' >
                <Header><br />Post: {this.props.postbyid.id}<br /><br /><Header.Subheader>Nesta página você encontrará o post solicitado!</Header.Subheader></Header><br />
                {this.renderPost()}
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        comments: state.CommentsReducer.comments,
        postbyid: state.PostsReducer.postbyid,
        newpost: state.PostsReducer.newpost,
        categorie: state.CategoriesReducer.category,
        visible: state.CommentsReducer.visible,
        id: state.CommentsReducer.parentId,
    }
)

export default connect(
    mapStateToProps,
    {
        getById,
        renderComments,
        changeParentId,
        changeCategory,
        newPost,
        changeAddPost,
        changeTitle,
        changeCategorieValue,
        changeBody,
        changeEditPost,
        changeId,
        changeTime,
        deletePost,
        votePost,
        changeOrientation,
        getAllPosts
    })(PostDetails)



