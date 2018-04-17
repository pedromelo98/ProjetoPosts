import React, { Component } from 'react';
import '../App.css';
import * as CategoriesAPI from '../utils/CategoriesAPI'
import { connect } from 'react-redux'
import { mudaCategorie } from '../actions/CategoriesActions'
import { mudaBody, mudaCategory, mudaTitle, addPost, mudaAddPost, mudaEditPost, mudaValueCategoria, mudaOrdenados } from '../actions/PostsActions'
import { renderizaComentarios } from '../actions/ComentariosActions'
import { Icon, Popup, Button, Divider, Modal, Form, Input, Radio, Header } from 'semantic-ui-react'




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

    render() {
        return (
            <div className="App">
                <div className="App-menu">
                    <div className="Flex" >
                        <div className="Menu-options-size" >
                            <div>
                                <Header as='h1' color='blue' >Categorias</Header>
                            </div><br />
                            <div>
                                <Button.Group>
                                    <Button primary onClick={() => { this.props.mudaCategorie('react'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >React</Button>
                                    <Button.Or/>
                                    <Button primary onClick={() => { this.props.mudaCategorie('redux'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Redux</Button>
                                    <Button.Or/>
                                    <Button primary onClick={() => { this.props.mudaCategorie('udacity'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Udacity</Button>
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
                                <Modal open={this.props.addpost} onClose={() => this.props.mudaAddPost(false)} closeIcon
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
                                        <Button onClick={() => this.props.addPost({ edit: this.props.editpost, id: this.props.id, timestamp: this.props.timestamp }, { id: Date.now().toString(), timestamp: Date.now(), title: this.props.title, body: this.props.post_body, author: 'user', category: this.props.value })} icon color='blue' >
                                            <Icon name='arrow right' />
                                        </Button>
                                    </Modal.Actions>

                                </Modal>
                                <Divider inverted />
                            </div>
                            <div className="Botoes-menu" >
                                        <Button.Group size='small' vertical >
                                            <Button onClick={() => this.props.mudaOrdenados('')} icon color='blue' size='mini' ><Icon size='large' name="calendar" /></Button>
                                            <Button onClick={() => this.props.mudaOrdenados('curtidos')} icon color='blue' size='mini' ><Icon size='large' name="like outline" /></Button>
                                            <Button onClick={() => this.props.mudaOrdenados('comentados')} icon color='blue' size='mini' ><Icon size='large' name="comments outline" /></Button>
                                        </Button.Group>
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
        subcategories: state.CategoriesReducer.subcategories,
        post_body: state.PostsReducer.body,
        title: state.PostsReducer.title,
        category: state.PostsReducer.category,
        addpost: state.PostsReducer.addpost,
        editpost: state.PostsReducer.editpost,
        value: state.PostsReducer.valuecategoria,
        id: state.PostsReducer.id,
        timestamp: state.PostsReducer.timestamp
    }
)

export default connect(mapStateToProps, { mudaBody, mudaCategory, mudaTitle, addPost, mudaCategorie, mudaAddPost, mudaValueCategoria, mudaEditPost, mudaOrdenados, renderizaComentarios })(MenuLateral)
