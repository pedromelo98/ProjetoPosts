import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers/Reducers'
import Principal from './components/Principal'


class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducers)} >
        <Principal />
      </Provider>
    );
  }
}


export default App;
