import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ThemeLoader from './theme-loader/ThemeLoader.jsx';
import { Provider } from 'react-redux';
import { store } from 'store/index.js';

// Lazy load the App component for better performance
const App = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeLoader>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeLoader>
  </Provider>
  // </React.StrictMode>
);
