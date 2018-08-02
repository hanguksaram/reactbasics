import React from 'react'
import { render } from 'react-dom'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { firebase } from './firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './containers/app'
import reducers from './reducers/index'

import './index.css'



const createStoreWithMiddleware = applyMiddleware()(createStore)

// firebase.auth().onAuthStateChanged((user) => {
    render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <App />
        </Provider>, document.getElementById('root'))
// })
