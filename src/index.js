import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Router } from 'react-router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

