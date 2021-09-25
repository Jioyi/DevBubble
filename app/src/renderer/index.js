import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SocketContextProvider } from './components/SocketContext';
import store from './redux/store';
import history from './redux/history';
import App from './App';

const root = document.getElementById('root');


const node = (
  <Provider store={store}>
    <SocketContextProvider history={history}>
      <Router history={history}>
        <App />
      </Router>
    </SocketContextProvider>
  </Provider>
);

ReactDOM.render(node, root);
