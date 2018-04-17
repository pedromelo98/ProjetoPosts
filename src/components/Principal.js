import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import MenuLateral from './MenuLateral'
import Categorias from './Categorias'
import Comentarios from './Comentarios'


class Principal extends Component {

    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }
    

    render() {
        return (
            <div className="Flex" >
                <div className="MenuLateral" ><MenuLateral/></div>
                <div className="Conteudo" ><Categorias/></div>
                <div className="Comentarios" ><Comentarios/></div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        
    }
)

export default connect(mapStateToProps, {})(Principal)
