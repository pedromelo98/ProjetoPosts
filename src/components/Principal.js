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
                        <Route exact path="/" render={(props) => (<Categories {...props} docategorie={{ do: false }} />)} />
                        <Route exact path="/:category" render={(props) => (<Categories {...props} docategorie={{ do: true, categorie: props.match.params.category }} />)} />
                        <Route path="/:category/:post_id" render={(props) => (<Categories {...props} docategorie={{ do: true, categorie: 'post' }} />)} />                     
                    </Switch>
                </div>
                <div className="Comentarios" ><Comments /></div>
            </div>
        );
    }
}
