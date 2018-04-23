import React, { Component } from 'react';
import '../App.css';
import * as CategoriesAPI from '../utils/CategoriesAPI'
import { connect } from 'react-redux'
import { mudaCategorie } from '../actions/CategoriesActions'
import { mudaBody, mudaCategory, mudaTitle, addPost, mudaAddPost, mudaEditPost, mudaValueCategoria, mudaOrdenados, mudaPostErro } from '../actions/PostsActions'
import { renderizaComentarios } from '../actions/ComentariosActions'
import { Icon, Popup, Button, Divider, Modal, Form, Input, Radio, Header, Message } from 'semantic-ui-react'




class MenuLateral extends Component {

    state = {
        categorie: [],
        value: 'Selecione a categoria',
    }

    componentDidMount() {
        CategoriesAPI.getAll().then((categories) => {
            this.setState({ categorie: categories })
        })
    }

    handleCategoryChange = (e, { value }) => { this.props.mudaCategory(value); this.props.mudaValueCategoria(value) }

    handleTaChange = (e, { value }) => this.props.mudaBody(value)

    handleTitleChange = (e, { value }) => this.props.mudaTitle(value)

    exibeMenssagemDeErro() {
        if (this.props.post_erro) {
            return (
                <Message negative>
                    <Message.Header>Erro!</Message.Header>
                    <p>Todos os campos são obrigatórios!</p>
                </Message>
            )
        }
    }
    desabilitarBotoes(botao) {
        if (botao === 'todos') {
            switch (this.props.categorie) {
                case '':
                    return true
                default:
                    return false
            }
        }
        if (botao === 'react') {
            switch (this.props.categorie) {
                case 'react':
                    return true
                default:
                    return false
            }
        }
        if (botao === 'redux') {
            switch (this.props.categorie) {
                case 'redux':
                    return true
                default:
                    return false
            }
        }
        if (botao === 'udacity') {
            switch (this.props.categorie) {
                case 'udacity':
                    return true
                default:
                    return false
            }
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-menu">
                    <div className="Flex" >
                        <div className="Menu-options-size" >
                            <div>
                                <Header as='h1' color='blue' >Categorias</Header>
                            </div><br /><br />
                            <div>
                                <Button.Group vertical >
                                    <Button disabled={this.desabilitarBotoes('todos')} primary onClick={() => { this.props.mudaCategorie(''); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Todos os posts</Button>
                                    <Button disabled={this.desabilitarBotoes('react')} primary onClick={() => { this.props.mudaCategorie('react'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >React</Button>
                                    <Button disabled={this.desabilitarBotoes('redux')} primary onClick={() => { this.props.mudaCategorie('redux'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Redux</Button>
                                    <Button disabled={this.desabilitarBotoes('udacity')} primary onClick={() => { this.props.mudaCategorie('udacity'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Udacity</Button>
                                </Button.Group>
                            </div>
                        </div>
                        <div className="Menu-botoes" >
                            <div className="Botoes-menu">
                                <Popup
                                    position='right center'
                                    trigger={<Button onClick={() => { this.props.mudaCategorie(''); this.props.mudaOrdenados('') }} circular basic icon size='mini' ><Icon color='blue' size='large' name="home" /></Button>}
                                    content='Home'
                                    basic
                                />
                                <Divider inverted />
                            </div>
                            <div className="Botoes-menu" >
                                <Modal open={this.props.addpost} onClose={() => { this.props.mudaAddPost(false); this.props.mudaPostErro() }} closeIcon
                                    trigger={
                                        <Popup
                                            position='right center'
                                            trigger={<Button onClick={() => { this.props.mudaAddPost(true); this.props.mudaBody(''); this.props.mudaTitle(''); this.props.mudaValueCategoria('Selecione a categoria'); this.props.mudaEditPost(false) }} circular basic icon size='mini' ><Icon color='blue' size='large' name="plus" /></Button>}
                                            content='Novo post'
                                            basic
                                        />
                                    }
                                >
                                    <Modal.Header>
                                        <Form className='Flex' >
                                            <Header as='h2'>Categoria:</Header>
                                            <Form.Field className="Postadd" >
                                                <Radio
                                                    label='React'
                                                    name='react'
                                                    value='react'
                                                    checked={this.props.value === 'react'}
                                                    onChange={this.handleCategoryChange}
                                                />
                                            </Form.Field>
                                            <Form.Field className="Postadd" >
                                                <Radio
                                                    label='Redux'
                                                    name='radioGroup'
                                                    value='redux'
                                                    checked={this.props.value === 'redux'}
                                                    onChange={this.handleCategoryChange}
                                                />
                                            </Form.Field>
                                            <Form.Field className="Postadd" >
                                                <Radio
                                                    label='Udacity'
                                                    name='radioGroup'
                                                    value='udacity'
                                                    checked={this.props.value === 'udacity'}
                                                    onChange={this.handleCategoryChange}
                                                />
                                            </Form.Field>
                                        </Form>
                                        <div>
                                            <Input value={this.props.title} onChange={this.handleTitleChange} fluid placeholder='Título do post...' />
                                        </div>
                                    </Modal.Header>
                                    <Modal.Content>
                                        <Form>
                                            <Form.TextArea value={this.props.post_body} onChange={this.handleTaChange} placeholder='Escreva sua postagem...' style={{ minHeight: 300 }} />
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        {this.exibeMenssagemDeErro()}
                                        <Button onClick={() => { this.props.mudaPostErro(); this.props.addPost({ edit: this.props.editpost, id: this.props.id, timestamp: this.props.timestamp }, { id: Date.now().toString(), timestamp: Date.now(), title: this.props.title, body: this.props.post_body, author: 'user', category: this.props.value }) }} icon color='blue' >
                                            <Icon name='arrow right' />
                                        </Button>
                                    </Modal.Actions>

                                </Modal>
                                <Divider inverted />
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = state => (
    {
        categories: state.CategoriesReducer.categories,
        categorie: state.CategoriesReducer.categorie,
        subcategories: state.CategoriesReducer.subcategories,
        post_body: state.PostsReducer.body,
        title: state.PostsReducer.title,
        category: state.PostsReducer.category,
        addpost: state.PostsReducer.addpost,
        editpost: state.PostsReducer.editpost,
        value: state.PostsReducer.valuecategoria,
        id: state.PostsReducer.id,
        timestamp: state.PostsReducer.timestamp,
        post_erro: state.PostsReducer.post_erro
    }
)

export default connect(mapStateToProps, { mudaBody, mudaCategory, mudaTitle, addPost, mudaCategorie, mudaAddPost, mudaValueCategoria, mudaEditPost, mudaOrdenados, renderizaComentarios, mudaPostErro })(MenuLateral)
