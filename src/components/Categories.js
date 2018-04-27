import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { changeCategory } from '../actions/CategoriesActions'
import AllPosts from './AllPosts'
import ShowCategorie from './ShowCategorie'



class Categories extends Component {

    state = { categorie: '' }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== this.state.categorie) {
            this.setState({ categorie: nextProps.category })
        }
    }

    componentDidMount(){
        if(this.props.docategorie.do){
            this.setState({categorie: this.props.docategorie.categorie})
        }
        this.props.changeCategory(this.props.docategorie.categorie)
    }


    renderCategorieCalled() {
        switch (this.state.categorie) {
            case '':
                return <AllPosts />
            default:
                return <ShowCategorie docategorie={this.state.categorie} />
        }
    }

    render() {
        return (
            <div className="Posts" >
                {this.renderCategorieCalled()}
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        category: state.CategoriesReducer.category,
    }
)

export default connect(
    mapStateToProps,
    {
        changeCategory
    }
)(Categories)
