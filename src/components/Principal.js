import React, { Component } from 'react';
import '../App.css';
import LeftMenu from './LeftMenu'
import Categories from './Categories'
import Comments from './Comments'
import { Switch, Route } from 'react-router-dom'



export default class Principal extends Component {

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
                        <Route path="/react/post" render={(pp) => (<Categories utils={pp} docategorie={{ do: true, categorie: 'post' }} />)} />                        
                        <Route path="/redux/post" render={(pp) => (<Categories utils={pp} docategorie={{ do: true, categorie: 'post' }} />)} />                        
                        <Route path="/udacity/post" render={(pp) => (<Categories utils={pp} docategorie={{ do: true, categorie: 'post' }} />)} />                        
                    </Switch>
                </div>
                <div className="Comentarios" ><Comments /></div>
            </div>
        );
    }
}
