import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import * as ComentariosAPI from '../utils/ComentariosAPI'
import { renderizaComentarios, mudaTa, addComentario, novoComentario, deletarComentario, editarComentario, mudaEdit, votarComentario, mudaOrdenados } from '../actions/ComentariosActions'
import { Segment, Header, Button, Icon, Divider, Transition, Form, TextArea, Popup, Confirm } from 'semantic-ui-react'


class Principal extends Component {

    state = {
        activeIndex: 0,
        comments: [],
        confirm: false,
        id: '',
        editar: false,
        comentarioid: ''
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

    handleTaChange = (e, { value }) => this.props.mudaTa(value)

    handleEditChange = (e, { value }) => this.props.mudaEdit(value)

    componentWillReceiveProps(nextProps) {
        ComentariosAPI.getComentarioPorId(nextProps.id).then((comments) => {
            this.setState({ comments: this.ordenaComentarios(comments) });
            this.props.novoComentario(false)
        })
    }

    renderizaEditarComentarios(comentario) {
        if (comentario.id === this.state.comentarioid) {
            return (
                <Form>
                    <Form.TextArea onChange={this.handleEditChange} placeholder='Editar comentário...' />
                    <Button onClick={() => { editarComentario(comentario.id, { id: comentario.id, parentId: comentario.parentId, timestamp: comentario.timestamp, author: comentario.author, voteScore: comentario.voteScore, body: this.props.edit }); this.props.novoComentario(true); this.setState({ comentarioid: '' }) }} color='blue' icon><Icon name='arrow circle right' /></Button>
                </Form>
            )
        }
    }

    corDosVotos(numeroDeVotos) {
        if (numeroDeVotos === 0) {
            return ('yellow')
        } else if (numeroDeVotos < 0) {
            return ('red')
        }
        return ('blue')
    }

    ordenaComentarios(comentarios) {
        switch (this.props.ordemcomentarios) {
            case 'curtidos':
                return comentarios.sort((a, b) => a.voteScore < b.voteScore)
            default:
                return comentarios.sort((a, b) => a.timestamp < b.timestamp)
        }
    }


    renderizarComentarios() {
        if (this.state.comments[0]) {
            return (
                this.state.comments.slice(0).map((comentario, index) => {
                    return (<div key={comentario.id} id={comentario.id} >
                        <Divider horizontal ><Header as='h5' textAlign='left'>{new Date(comentario.timestamp).toLocaleDateString() + " ás " + new Date(comentario.timestamp).toLocaleTimeString()}</Header></Divider>
                        <Segment>
                            <Button onClick={() => this.setState({ confirm: true, id: comentario.id })} basic icon size='tiny' floated='right' ><Icon name='close' /></Button>
                            <Confirm
                                open={this.state.confirm}
                                content='Tem certeza de que quer deletar esse comentário?'
                                cancelButton='Não'
                                confirmButton='Sim'
                                onCancel={() => this.setState({ confirm: false })}
                                onConfirm={() => { this.props.deletarComentario(this.state.id); this.setState({ confirm: false }) }}
                            />
                            <Button onClick={() => this.setState({ editar: !this.state.editar, comentarioid: comentario.id })} basic icon size='tiny' floated='right' ><Icon name='pencil' /></Button>
                            <Header as='h4' textAlign='left' >
                                @{comentario.author}
                            </Header><Divider />
                            <Header as='h5' textAlign='left'  >
                                <p>{comentario.body}</p>
                            </Header><br />
                            <Button onClick={() => { this.props.votarComentario(comentario.id, 'upVote'); this.props.novoComentario(true) }} icon inverted color='blue' size='tiny' floated='left' ><Icon name='thumbs up' /></Button>
                            <Button onClick={() => { this.props.votarComentario(comentario.id, 'downVote'); this.props.novoComentario(true) }} icon inverted color='red' size='tiny' floated='left' ><Icon name='thumbs down' /></Button>
                            <Header color={this.corDosVotos(comentario.voteScore)} floated='right' >{comentario.voteScore}</Header>
                            <br /><br />
                            {this.renderizaEditarComentarios(comentario)}
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
                                        trigger={<Button onClick={() => this.props.renderizaComentarios(!this.props.visible)} circular icon size='mini' ><Icon color='blue' size='large' name="close" /></Button>}
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
                                        trigger={<Button onClick={() => this.props.mudaOrdenados('')} circular icon size='mini' ><Icon color='blue' size='large' name="sort content ascending" /></Button>}
                                        content='Ordenar por recentes'
                                    />

                                    <Divider />
                                </div>
                                <div className="Comentarios-menu-itens" >
                                    <Popup size='small'
                                        position='left center'
                                        trigger={<Button onClick={() => this.props.mudaOrdenados('curtidos')} circular icon size='mini' ><Icon color='blue' size='large' name="sort content descending" /></Button>}
                                        content='Ordenar por mais curtidos'
                                    />

                                    <Divider />
                                </div>
                            </div>
                            <div className="Comentarios-conteudo" ><br/>
                                {this.renderizarComentarios()}
                                <Form>
                                    <TextArea value={this.props.ta} onChange={this.handleTaChange} id='comentar' ref={this.handleRef} placeholder='Adicionar comentário...' />
                                    <Button onClick={() => { this.props.addComentario({ id: Date.now().toString(), timestamp: Date.now(), body: this.props.ta, author: 'usuario', parentId: this.props.id }); this.props.novoComentario(true); this.props.mudaTa('') }} color='blue' floated='right' icon><Icon name='arrow right' /></Button>
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
        visible: state.ComentariosReducer.visible,
        id: state.ComentariosReducer.idDoPai,
        comentarios: state.ComentariosReducer.comentarios,
        ta: state.ComentariosReducer.ta,
        novo_Comentario: state.ComentariosReducer.novo_Comentario,
        edit: state.ComentariosReducer.edit,
        ordemcomentarios: state.ComentariosReducer.ordemcomentarios
    }
)

export default connect(mapStateToProps, { renderizaComentarios, mudaTa, addComentario, novoComentario, deletarComentario, editarComentario, mudaEdit, votarComentario, mudaOrdenados })(Principal)
