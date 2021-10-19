import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SocketContextProvider } from './contexts/SocketContext';
import store from './redux/store';
import history from './redux/history';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';

const root = document.getElementById('root');

const node = (
  <Provider store={store}>
    <AuthContextProvider>
      <SocketContextProvider history={history}>
        <Router history={history}>
          <App />
        </Router>
      </SocketContextProvider>
    </AuthContextProvider>
  </Provider>
);

ReactDOM.render(node, root);
