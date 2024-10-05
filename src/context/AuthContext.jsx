import React, { useState, useEffect, useMemo } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { userSelector } from 'store/slices/user';
import useAuth, { AuthContext, oldRefToken } from 'utils/authUtils';
import { deleteAllCookies, setCookie } from 'utils/commonFunctions';

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ refreshToken: oldRefToken });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (oldRefToken) {
      setTimeout(() => {
        if (isMounted) {
          setAuth({ refreshToken: oldRefToken });
          setLoading(false);
        }
      }, 1000);
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const token = auth?.token || auth?.refreshToken;

  const removeAuth = () => {
    dispatch({ type: 'logout' });
    deleteAllCookies();
    setAuth(undefined);
    navigate('/sign-in');
    localStorage.removeItem('User');
  };

  const addAuth = ({ token, refreshToken }) => {
    setCookie('token', token);
    setCookie('refresh', refreshToken);
    setAuth({ token, refreshToken });
  };

  const value = {
    authenticated: token,
    setAuth: addAuth,
    removeAuth,
    loading,
  };

  if (loading) {
    return (
      <Stack
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthRedirect({ children, authenticatedRoute = true }) {
  const auth = useAuth();
  const location = useLocation();
  const user = useSelector(userSelector);

  // Ensure that the redirection logic does not trigger unnecessary re-renders
  const isAuthenticated = !!auth?.authenticated;

  // Memoize the redirect path to avoid excessive re-rendering
  const redirectPath = useMemo(() => {
    if (isAuthenticated) {
      return '/admin';
    }
    return '/sign-in';
  }, [isAuthenticated]);

  // Redirect to sign-in if not authenticated and the route is protected
  if (!isAuthenticated && authenticatedRoute) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  // Redirect to sign-in if not authenticated and the route is protected
  if (isAuthenticated && authenticatedRoute && user?.info?.approved === false) {
    return <Navigate to="/set-password" state={{ from: location }} />;
  }

  // Redirect to role-based dashboard if authenticated but accessing a public route
  if (isAuthenticated && !authenticatedRoute) {
    return <Navigate to={redirectPath} state={{ from: { location, user } }} />;
  }

  return children;
}

AuthRedirect.propTypes = {
  children: PropTypes.node,
  authenticatedRoute: PropTypes.bool,
};
