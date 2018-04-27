import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/Reducers'
import Principal from './components/Principal'
import ReduxThunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'


class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
        <BrowserRouter>
          <Principal />
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
