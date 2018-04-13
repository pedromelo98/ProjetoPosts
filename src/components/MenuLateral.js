import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import * as CategoriesAPI from '../utils/CategoriesAPI'
import { connect } from 'react-redux'
import { renderizaSubCategorie, mudaCategorie } from '../actions/CategoriesActions'
import { mudaBody, mudaCategory, mudaTitle, addPost, mudaAddPost, mudaEditPost, mudaValueCategoria, mudaOrdenados } from '../actions/PostsActions'
import { renderizaComentarios } from '../actions/ComentariosActions'
import { Icon, Popup, Button, Divider, Modal, Dropdown, Form, TextArea, Header, Input } from 'semantic-ui-react'


const options = [
    { key: 1, text: 'React', value: 'react' },
    { key: 2, text: 'Redux', value: 'redux' },
    { key: 3, text: 'Udacity', value: 'udacity' },
]


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

    listaDeCategorias() {

        if (this.props.subcategories) {
            return (
                <div>
                    <Button  onClick={() => { this.props.mudaCategorie(''); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Todos</Button><br/><br/>
                    <Button  onClick={() => { this.props.mudaCategorie('react'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >React</Button><br/><br/>
                    <Button  onClick={() => { this.props.mudaCategorie('redux'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Redux</Button><br/><br/>
                    <Button  onClick={() => { this.props.mudaCategorie('udacity'); this.props.mudaOrdenados(''); this.props.renderizaComentarios(false) }} className="SubMenu-options" >Udacity</Button>
                </div>
            )
        }
    }


    render() {
        const { value } = this.state
        return (
            <div className="App">
                <div className="App-menu">
                    <div className="Flex" >
                        <div className="Menu-options-size" >
                            <div>
                                <Button onClick={() => this.props.renderizaSubCategorie(!this.props.subcategories)} className="Menu-options">Categorias</Button>
                            </div><br/>
                            {this.listaDeCategorias()}
                        </div>
                        <div className="Menu-botoes" >
                            <div className="Botoes-menu">
                                <Button onClick={() => { this.props.mudaCategorie(''); this.props.mudaOrdenados('') }} circular basic icon size='mini' ><Icon color='blue' size='large' name="home" /></Button>
                                <Divider inverted />
                            </div>
                            <div className="Botoes-menu" >
                                <Modal open={this.props.addpost} onClose={() => this.props.mudaAddPost(false)} closeIcon trigger={<Button onClick={() => { this.props.mudaAddPost(true); this.props.mudaBody(''); this.props.mudaTitle(''); this.props.mudaValueCategoria('Selecione a categoria'); this.props.mudaEditPost(false) }} circular basic icon size='mini' ><Icon color='blue' size='large' name="plus" /></Button>}>
                                    <Modal.Header>
                                        <Dropdown
                                            compact
                                            basic
                                            onChange={this.handleCategoryChange}
                                            options={options}
                                            text={this.props.value}
                                            selection
                                            value={this.props.value}
                                        />
                                        <br /><br />
                                        <div>
                                            <Input value={this.props.title} onChange={this.handleTitleChange} fluid placeholder='Título do post...' />
                                        </div>
                                    </Modal.Header>
                                    <Modal.Content>
                                        <Form>
                                            <Form.TextArea value={this.props.post_body} onChange={this.handleTaChange} placeholder='Escreva sua postagem...' style={{ minHeight: 500 }} />
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        {console.log(this.props.id)}
                                        <Button onClick={() => this.props.addPost({ edit: this.props.editpost, id: this.props.id, timestamp: this.props.timestamp }, { id: Date.now().toString(), timestamp: Date.now(), title: this.props.title, body: this.props.post_body, author: 'user', category: this.props.value })} icon color='blue' >
                                            <Icon name='arrow right' />
                                        </Button>
                                    </Modal.Actions>

                                </Modal>
                                <Divider inverted />
                            </div>
                            <div className="Botoes-menu" >
                                <Popup
                                    position='right center'
                                    trigger={<Button onClick={() => this.props.mudaOrdenados('')} circular basic icon size='mini' ><Icon color='blue' size='large' name="calendar" /></Button>}
                                    content='Ordenar por recentes'
                                    basic
                                />
                                <Divider inverted />
                            </div>
                            <div className="Botoes-menu" >
                                <Popup
                                    position='right center'
                                    trigger={<Button onClick={() => this.props.mudaOrdenados('curtidos')} circular basic icon size='mini' ><Icon color='blue' size='large' name="like outline" /></Button>}
                                    content='Ordenar por mais curtidos'

                                />
                                <Divider inverted />
                            </div>
                            <div className="Botoes-menu" >
                                <Popup
                                    position='right center'
                                    trigger={<Button onClick={() => this.props.mudaOrdenados('comentados')} circular basic icon size='mini' ><Icon color='blue' size='large' name="comments outline" /></Button>}
                                    content='Ordenar por mais comentados'

                                />
                                <Divider inverted />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, { renderizaSubCategorie, mudaBody, mudaCategory, mudaTitle, addPost, mudaCategorie, mudaAddPost, mudaValueCategoria, mudaEditPost, mudaOrdenados, renderizaComentarios })(MenuLateral)
