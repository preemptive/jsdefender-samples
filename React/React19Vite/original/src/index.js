import "./app.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import loadable from '@loadable/component'
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Switch } from "react-router";
import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension'

/**
 * Lazy loading components, to load only when the route is requested
 */
const LoginLazyComponent = loadable(() => import('./containers/loginContainer'));
const HomeLazyComponent = loadable(() => import('./containers/homeContainer'));

const store = createStore(rootReducer, composeWithDevTools());
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route exact path='/' component={LoginLazyComponent} />
                <Route exact path='/home' component={HomeLazyComponent} />
            </Switch>
        </Provider>
    </BrowserRouter>
);