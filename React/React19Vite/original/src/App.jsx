import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import './app.css';

// Native React lazy loading
const LoginLazyComponent = lazy(() => import('./containers/loginContainer'));
const HomeLazyComponent = lazy(() => import('./containers/homeContainer'));

const store = createStore(rootReducer, composeWithDevTools());

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginLazyComponent />} />
          <Route path="/home" element={<HomeLazyComponent />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);

export default App;
