import React, { Component } from 'react';
import '../App.css';
import * as CategoriesAPI from '../utils/CategoriesAPI'
import { connect } from 'react-redux'
import { changeCategory } from '../actions/CategoriesActions'
import {
    changeBody,
    changeCategorie,
    changeTitle,
    addPost,
    changeAddPost,
    changeEditPost,
    changeCategorieValue,
    changeOrientation,
    changePostError
} from '../actions/PostsActions'
import { renderComments } from '../actions/CommentsActions'
import {
    Icon,
    Popup,
    Button,
    Divider,
    Modal,
    Form,
    Input,
    Radio,
    Header,
    Message
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'




class LeftMenu extends Component {

    state = {
        categorie: [],
        value: 'Selecione a categoria',
    }

    componentDidMount() {
        CategoriesAPI.getAll().then((categories) => {
            this.setState({ categorie: categories })
        })
    }

    handleCategoryChange = (e, { value }) => { this.props.changeCategorie(value); this.props.changeCategorieValue(value) }

    handleTaChange = (e, { value }) => this.props.changeBody(value)

    handleTitleChange = (e, { value }) => this.props.changeTitle(value)

    showErrorMessage() {
        if (this.props.postError) {
            return (
                <Message negative>
                    <Message.Header>Erro!</Message.Header>
                    <p>Todos os campos são obrigatórios!</p>
                </Message>
            )
        }
    }
    desableButtons(button) {
        if (button === 'todos') {
            switch (this.props.categorie) {
                case '':
                    return true
                default:
                    return false
            }
        }
        if (button === 'react') {
            switch (this.props.categorie) {
                case 'react':
                    return true
                default:
                    return false
            }
        }
        if (button === 'redux') {
            switch (this.props.categorie) {
                case 'redux':
                    return true
                default:
                    return false
            }
        }
        if (button === 'udacity') {
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
                                    <Link to='/' ><Button disabled={this.desableButtons('todos')} primary onClick={() => { this.props.changeCategory(''); this.props.changeOrientation(''); this.props.renderComments(false) }} className="SubMenu-options" >Todos os posts</Button></Link>
                                    <Link to='/react'><Button disabled={this.desableButtons('react')} primary onClick={() => { this.props.changeCategory('react'); this.props.changeOrientation(''); this.props.renderComments(false) }} className="SubMenu-options" >React</Button></Link>
                                    <Link to='/redux' ><Button disabled={this.desableButtons('redux')} primary onClick={() => { this.props.changeCategory('redux'); this.props.changeOrientation(''); this.props.renderComments(false) }} className="SubMenu-options" >Redux</Button></Link>
                                    <Link to='/udacity' ><Button disabled={this.desableButtons('udacity')} primary onClick={() => { this.props.changeCategory('udacity'); this.props.changeOrientation(''); this.props.renderComments(false) }} className="SubMenu-options" >Udacity</Button></Link>
                                </Button.Group>
                            </div>
                        </div>
                        <div className="Menu-botoes" >
                            <div className="Botoes-menu">
                                <Popup
                                    position='right center'
                                    trigger={<Button onClick={() => { this.props.changeCategory(''); this.props.changeOrientation('') }} circular basic icon size='mini' ><Icon color='blue' size='large' name="home" /></Button>}
                                    content='Home'
                                    basic
                                />
                                <Divider inverted />
                            </div>
                            <div className="Botoes-menu" >
                                <Modal open={this.props.addpost} onClose={() => { this.props.changeAddPost(false); this.props.changePostError() }} closeIcon
                                    trigger={
                                        <Popup
                                            position='right center'
                                            trigger={<Button onClick={() => { this.props.changeAddPost(true); this.props.changeBody(''); this.props.changeTitle(''); this.props.changeCategorieValue('Selecione a categoria'); this.props.changeEditPost(false) }} circular basic icon size='mini' ><Icon color='blue' size='large' name="plus" /></Button>}
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
                                        {this.showErrorMessage()}
                                        <Button onClick={() => { this.props.changePostError(); this.props.addPost({ edit: this.props.editpost, id: this.props.id, timestamp: this.props.timestamp }, { id: Date.now().toString(), timestamp: Date.now(), title: this.props.title, body: this.props.post_body, author: 'user', category: this.props.value }) }} icon color='blue' >
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
        categorie: state.CategoriesReducer.category,
        subcategories: state.CategoriesReducer.subcategories,
        post_body: state.PostsReducer.body,
        title: state.PostsReducer.title,
        category: state.PostsReducer.category,
        addpost: state.PostsReducer.addpost,
        editpost: state.PostsReducer.editpost,
        value: state.PostsReducer.categorieValue,
        id: state.PostsReducer.id,
        timestamp: state.PostsReducer.timestamp,
        postError: state.PostsReducer.postError
    }
)

export default connect(
    mapStateToProps,
    {
        changeBody,
        changeCategory,
        changeTitle,
        addPost,
        changeCategorie,
        changeAddPost,
        changeCategorieValue,
        changeEditPost,
        changeOrientation,
        renderComments,
        changePostError
    })(LeftMenu)
