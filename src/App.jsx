import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import AppRouting from './AppRouting';

import { updateDocumentTitle } from 'utils/commonFunctions';

import './main.css';

const App = () => {
  const location = useLocation();
  useEffect(() => {
    updateDocumentTitle(location);
  }, [location]);

  return <AppRouting />;
};

export default App;
