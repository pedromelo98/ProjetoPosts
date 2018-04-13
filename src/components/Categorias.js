import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux'
import { mudaCategorie } from '../actions/CategoriesActions'
import * as PostsAPI from '../utils/PostsAPI'
import TodosPosts from './TodosPosts'
import ExibeCategoria from './ExibeCategoria'
import { Sidebar, Menu, Segment } from 'semantic-ui-react'


class Categorias extends Component {

    state = { categoria: '' }

    componentWillReceiveProps(nextProps) {
        if(nextProps.categorie !== this.state.categoria){
            this.setState({categoria: nextProps.categorie})
        }
    }

    renderizaCategoriaChamada() {
        switch (this.state.categoria) {
            case '':
                return <TodosPosts />
                break
            default:
                return <ExibeCategoria />
        }
    }

    render() {
        return (
            <div className="Posts" >
                {this.renderizaCategoriaChamada()}
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        categorie: state.CategoriesReducer.categorie,
    }
)

export default connect(mapStateToProps, { mudaCategorie })(Categorias)
