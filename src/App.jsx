import React, { useEffect } from 'react';

import AppRouting from './AppRouting';
import './main.css';
import { updateDocumentTitle } from 'utils/commonFunctions';

const App = () => {
  useEffect(() => {
    updateDocumentTitle(location);
  }, [location]);

  return <AppRouting />;
};

export default App;
