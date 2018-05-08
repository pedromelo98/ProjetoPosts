import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import {
    List,
    Segment,
    Divider,
    Header,
    Grid,
} from 'semantic-ui-react'
import * as CommentsAPI from '../utils/CommentsAPI'
import {
    getById
} from '../actions/PostsActions'


class PostDetails extends Component {

    state = {
        params: this.props.utils.location.search.split('?'), comments: ''
    }


    componentDidMount() {
        this.props.getById(this.state.params[1])
        CommentsAPI.getCommentById(this.state.params[1]).then((comments) => {
            this.setState({ comments: comments })
        })
    }

    renderComments() {
        if (this.state.comments[0]) {
            return (
                this.state.comments.slice(0).map((comment, index) => {
                    return (<div key={comment.id} id={comment.id} >
                        <List celled>
                            <List.Item>
                                <List.Content><br />
                                    <List.Header>{comment.author}</List.Header><br />
                                    <Header as='h5' >{comment.body}</Header><br />
                                </List.Content>
                            </List.Item>
                        </List>
                    </div>)
                })
            )
        }
        return (
            <div><br /><Header>Nenhum comentário foi adicionado ainda!</Header></div>
        )

    }

    showDetailsOrError() {
        if (this.props.postbyid.author) {
            return (
                <div>
                    <Divider horizontal>Detalhes do post</Divider><br />
                    <Grid columns={3} divided>
                        <Grid.Row stretched>
                            <Grid.Column>
                                <Segment>
                                    <Header>Titulo</Header>
                                    <Header as='h5' > {this.props.postbyid.title} </Header>
                                </Segment>
                                <Segment>
                                    <Header>Autor</Header>
                                    <Header as='h5' >@{this.props.postbyid.author}</Header>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <Header>Conteudo</Header>
                                    <Header as='h5' >{this.props.postbyid.body}</Header>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <Header>Data</Header>
                                    <Header as='h5' >{new Date(this.props.postbyid.timestamp).toLocaleString()}</Header>
                                </Segment>
                                <Segment>
                                    <Header>Votos</Header>
                                    <Header as='h5' >{this.props.postbyid.voteScore}</Header>
                                </Segment>
                                <Segment>
                                    <Header>Comentarios</Header>
                                    <Header as='h5' >{this.props.postbyid.commentCount}</Header>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid><br />
                    <Divider horizontal >Comentarios</Divider>
                    {this.renderComments()}
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
                {this.showDetailsOrError()}
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        postbyid: state.PostsReducer.postbyid,
    }
)

export default connect(
    mapStateToProps,
    {
        getById,
    })(PostDetails)
