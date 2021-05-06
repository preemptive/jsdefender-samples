import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component'
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Switch } from "react-router";
import rootReducer from './reducers';
import "./app.css";

const LoginLazyComponent = loadable(() => import('./containers/loginContainer'));
const HomeLazyComponent = loadable(() => import('./containers/homeContainer'));
const store = createStore(rootReducer);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route exact path='/' component={LoginLazyComponent} />
                <Route exact path='/home' component={HomeLazyComponent} />
            </Switch>
        </Provider>
    </BrowserRouter>, document.getElementById('root')
);