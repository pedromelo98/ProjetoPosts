import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import LeftMenu from './LeftMenu'
import Categories from './Categories'
import Comments from './Comments'
import { Switch, Route } from 'react-router-dom'



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
                <div className="MenuLateral" ><LeftMenu /></div>
                <div className="Conteudo" >
                    <Switch>
                        <Route exact path="/" render={(pp) => (<Categories docategorie={{ do: false, categorie: '' }} />)} />
                        <Route exact path="/react" render={(pp) => (<Categories docategorie={{ do: true, categorie: 'react' }} />)} />
                        <Route exact path="/redux" render={(pp) => (<Categories docategorie={{ do: true, categorie: 'redux' }} />)} />
                        <Route exact path="/udacity" render={(pp) => (<Categories docategorie={{ do: true, categorie: 'udacity' }} />)} />
                    </Switch>
                </div>
                <div className="Comentarios" ><Comments /></div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {

    }
)

export default connect(mapStateToProps, {})(Principal)
