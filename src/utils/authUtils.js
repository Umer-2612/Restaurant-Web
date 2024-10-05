import React, { useContext } from 'react';

import { getCookie } from './commonFunctions';

export const oldRefToken = getCookie('refresh')
  ? JSON.parse(getCookie('refresh'))
  : false;

export const AuthContext = React.createContext({
  // token: oldToken,
  // superToken: oldSuperToken,
});

function useAuth() {
  console.log(useContext(AuthContext));
  return useContext(AuthContext);
}

export default useAuth;
