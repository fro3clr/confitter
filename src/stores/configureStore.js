import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import INITIAL_STATE from './initialState';
//import createLogger from 'redux-logger';
//const logger = createLogger();
import { composeWithDevTools } from 'redux-devtools-extension';


const configureStore = () => createStore(
    rootReducer,
    INITIAL_STATE,composeWithDevTools(
    applyMiddleware(thunk))
);

export default configureStore;