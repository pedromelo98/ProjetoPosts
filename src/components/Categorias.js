import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { mudaCategorie } from '../actions/CategoriesActions'
import TodosPosts from './TodosPosts'
import ExibeCategoria from './ExibeCategoria'


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
                return <TodosPosts/>
            default:
                return <ExibeCategoria/>
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
