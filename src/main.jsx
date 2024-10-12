import React from 'react';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import ThemeLoader from './theme-loader/ThemeLoader.jsx';

import { store } from 'store/index.js';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeLoader>
      <BrowserRouter basename="/home">
        <Toaster />
        <App />
      </BrowserRouter>
    </ThemeLoader>
  </Provider>
  // </React.StrictMode>
);
