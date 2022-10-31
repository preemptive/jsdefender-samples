import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { initialState as userInitialState } from '../reducers/user';

const middlewares = [thunk];

const configureStore = () => createStore(rootReducer, { user: userInitialState }, applyMiddleware(...middlewares));
export default configureStore;