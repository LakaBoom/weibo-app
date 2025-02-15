import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StoreContext } from 'redux-react-hook';
import reducers from './reducers';
import './index.scss';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
   
  document.getElementById('root')
);

