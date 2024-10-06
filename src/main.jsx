import React, { Suspense } from 'react';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import ThemeLoader from './theme-loader/ThemeLoader.jsx';

import { store } from 'store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeLoader>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Toaster />
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeLoader>
  </Provider>
  // </React.StrictMode>
);
