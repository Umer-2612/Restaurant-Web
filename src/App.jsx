import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import AppRouting from './AppRouting';

import { useLazyGetUserInfoQuery } from 'store/apis/signIn';
import { setUserInfo } from 'store/slices/user';
import {
  deleteCookie,
  getCookie,
  updateDocumentTitle,
} from 'utils/commonFunctions';

import './main.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [getUserInfo, { isSuccess, isLoading, isError, data }] =
    useLazyGetUserInfoQuery();

  console.log(getUserInfo);

  useEffect(() => {
    updateDocumentTitle(location);
  }, [location]);

  React.useEffect(() => {
    if (isError) {
      deleteCookie('token');
    } else if (
      (getCookie('token') || getCookie('refresh')) &&
      !isLoading &&
      !isSuccess &&
      !data
    ) {
      console.log('object');
      getUserInfo();
    }

    if (isSuccess) {
      dispatch(setUserInfo(data));
    }
  }, [data, isLoading, isError, dispatch, isSuccess, getUserInfo]);

  return <AppRouting />;
};

export default App;
