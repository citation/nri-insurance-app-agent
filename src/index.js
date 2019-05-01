import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import reducers from './module/reducer/combine';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';

const root = document.querySelector("#root");
const store = createStore( reducers , applyMiddleware( thunk , createLogger ));

render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>, root
);

serviceWorker.unregister();