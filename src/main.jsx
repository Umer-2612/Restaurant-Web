import React, { Suspense } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
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
        <Suspense
          fallback={
            <Stack
              width="100%"
              height="100vh"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Stack>
          }
        >
          <Toaster />
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeLoader>
  </Provider>
  // </React.StrictMode>
);
