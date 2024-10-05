import React, { Suspense } from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';
import ThemeLoader from './theme-loader/ThemeLoader.jsx';

import { store } from 'store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeLoader>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <ToastContainer />
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeLoader>
  </Provider>
  // </React.StrictMode>
);
