import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import * as CommentsAPI from '../utils/CommentsAPI'
import {
    renderComments,
    changeTa,
    addComment,
    newComment,
    deleteComment,
    editComment,
    changeEdit,
    voteComment,
    changeOrientation
} from '../actions/CommentsActions'
import {
    Segment,
    Header,
    Button,
    Icon,
    Divider,
    Transition,
    Form,
    TextArea,
    Popup,
    Confirm
} from 'semantic-ui-react'
import { newPost } from '../actions/PostsActions'


class Comments extends Component {

    state = {
        activeIndex: 0,
        comments: [],
        confirm: false,
        id: '',
        edit: false,
        commentid: ''
    }

    handleRef = (c) => {
        this.inputRef = c
    }

    focus = () => {
        this.inputRef.focus()
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleTaChange = (e, { value }) => this.props.changeTa(value)

    handleEditChange = (e, { value }) => this.props.changeEdit(value)

    componentWillReceiveProps(nextProps) {
        CommentsAPI.getCommentById(nextProps.id).then((comments) => {
            this.setState({ comments: this.filterComments(comments) });
            this.props.newComment(false)
        })
    }

    renderEditComments(comment) {
        if (comment.id === this.state.commentid) {
            return (
                <Form>
                    <Form.TextArea onChange={this.handleEditChange} placeholder='Editar comentário...' />
                    <Button onClick={() => { editComment(comment.id, { id: comment.id, parentId: comment.parentId, timestamp: comment.timestamp, author: comment.author, voteScore: comment.voteScore, body: this.props.edit }); this.props.newComment(true); this.setState({ commentid: '' }) }} color='blue' icon><Icon name='arrow circle right' /></Button>
                </Form>
            )
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

    filterComments(comments) {
        switch (this.props.filterComments) {
            case 'curtidos':
                return comments.sort((a, b) => a.voteScore < b.voteScore)
            default:
                return comments.sort((a, b) => a.timestamp < b.timestamp)
        }
    }


    renderComments() {
        if (this.state.comments[0]) {
            return (
                this.state.comments.slice(0).map((comment, index) => {
                    return (<div key={comment.id} id={comment.id} >
                        <Divider horizontal ><Header as='h5' textAlign='left'>{new Date(comment.timestamp).toLocaleDateString() + " ás " + new Date(comment.timestamp).toLocaleTimeString()}</Header></Divider>
                        <Segment>
                            <Button onClick={() => this.setState({ confirm: true, id: comment.id })} basic icon size='tiny' floated='right' ><Icon name='close' /></Button>
                            <Confirm
                                open={this.state.confirm}
                                content='Tem certeza de que quer deletar esse comentário?'
                                cancelButton='Não'
                                confirmButton='Sim'
                                onCancel={() => this.setState({ confirm: false })}
                                onConfirm={() => { this.props.deleteComment(this.state.id); this.setState({ confirm: false }) }}
                            />
                            <Button onClick={() => this.setState({ edit: !this.state.edit, commentid: comment.id })} basic icon size='tiny' floated='right' ><Icon name='pencil' /></Button>
                            <Header as='h4' textAlign='left' >
                                @{comment.author}
                            </Header><Divider />
                            <Header as='h5' textAlign='left'  >
                                <p>{comment.body}</p>
                            </Header><br />
                            <Button onClick={() => { this.props.voteComment(comment.id, 'upVote'); this.props.newComment(true) }} icon inverted color='blue' size='tiny' floated='left' ><Icon name='thumbs up' /></Button>
                            <Button onClick={() => { this.props.voteComment(comment.id, 'downVote'); this.props.newComment(true) }} icon inverted color='red' size='tiny' floated='left' ><Icon name='thumbs down' /></Button>
                            <Header color={this.votesColor(comment.voteScore)} floated='right' >{comment.voteScore}</Header>
                            <br /><br />
                            {this.renderEditComments(comment)}
                        </Segment>
                        <br />
                    </div>)
                })
            )
        }
        return (
            <div><br /><Header>Nenhum comentário foi adicionado ainda!<br /><Header.Subheader>Seja o primeiro a comentar para esse post!<br /><br /></Header.Subheader></Header></div>
        )

    }

    render() {
        return (
            <div className="App" >
                <Transition visible={this.props.visible} animation='fade left' duration={650}>
                    <div className="App-comentarios">
                        <div className="Flex" >
                            <div className="Comentarios-menu" >
                                <div className="Comentarios-menu-itens" >
                                    <Popup size='small'
                                        position='left center'
                                        trigger={<Button onClick={() => this.props.renderComments(!this.props.visible)} circular icon size='mini' ><Icon color='blue' size='large' name="close" /></Button>}
                                        content='Fechar comentários'
                                    />

                                    <Divider />
                                </div>
                                <div className="Comentarios-menu-itens" >
                                    <Popup size='small'
                                        position='left center'
                                        trigger={<Button onClick={() => { document.getElementById('comentar').scrollIntoView(); this.focus() }} circular icon size='mini' ><Icon color='blue' size='large' name="plus" /></Button>}
                                        content='Adicionar comentário'
                                    />

                                    <Divider />
                                </div>
                                <div className="Comentarios-menu-itens" >
                                    <Popup size='small'
                                        position='left center'
                                        trigger={<Button onClick={() => this.props.changeOrientation('')} circular icon size='mini' ><Icon color='blue' size='large' name="sort content ascending" /></Button>}
                                        content='Ordenar por recentes'
                                    />

                                    <Divider />
                                </div>
                                <div className="Comentarios-menu-itens" >
                                    <Popup size='small'
                                        position='left center'
                                        trigger={<Button onClick={() => this.props.changeOrientation('curtidos')} circular icon size='mini' ><Icon color='blue' size='large' name="sort content descending" /></Button>}
                                        content='Ordenar por mais curtidos'
                                    />

                                    <Divider />
                                </div>
                            </div>
                            <div className="Comentarios-conteudo" ><br />
                                {this.renderComments()}
                                <Form>
                                    <TextArea value={this.props.ta} onChange={this.handleTaChange} id='comentar' ref={this.handleRef} placeholder='Adicionar comentário...' />
                                    <Button onClick={() => { this.props.addComment({ id: Date.now().toString(), timestamp: Date.now(), body: this.props.ta, author: 'usuario', parentId: this.props.id }); this.props.newComment(true); this.props.changeTa(''); }} color='blue' floated='right' icon><Icon name='arrow right' /></Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        visible: state.CommentsReducer.visible,
        id: state.CommentsReducer.parentId,
        comments: state.CommentsReducer.comments,
        ta: state.CommentsReducer.ta,
        newComment: state.CommentsReducer.newComment,
        edit: state.CommentsReducer.edit,
        filterComments: state.CommentsReducer.filterComments
    }
)

export default connect(
    mapStateToProps,
    {
        renderComments,
        changeTa,
        addComment,
        newComment,
        deleteComment,
        editComment,
        changeEdit,
        voteComment,
        changeOrientation,
        newPost
    })(Comments)
