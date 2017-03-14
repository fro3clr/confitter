import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/App';
import configureStore from './stores/configureStore';
import {Provider} from 'react-redux';
import './index.css';

const store = configureStore();

ReactDOM.render(
   <Provider store={store}>
        <AppContainer />
    </Provider>,
  document.getElementById('root')
);
