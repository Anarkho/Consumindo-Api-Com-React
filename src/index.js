import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

//Provider responsavel por atualizar altomaticamente as store
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // permiti uso dispatch
import multi from 'redux-multi' // permi dispatch multiplas actions
import mainReducer from 'store'

const store = applyMiddleware(thunk, multi)(createStore)(mainReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')

);

serviceWorker.unregister();
