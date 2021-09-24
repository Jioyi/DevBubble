import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from './redux/store';
import history from './redux/history';
import App from './App';

const root = document.getElementById('root');
import { ContextProvider } from './components/SocketContext';

const node = (
  <Provider store={store}>
    <ContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </ContextProvider>
  </Provider>
);

ReactDOM.render(node, root);
