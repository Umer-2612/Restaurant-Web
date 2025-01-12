import React, { useCallback, useEffect, useRef, useState } from 'react';

import { PropTypes } from 'prop-types';
import { io } from 'socket.io-client';

import { getCookie } from 'utils/commonFunctions';
import {
  SocketContext,
  getSocketInstance,
  setSocketInstance,
} from 'utils/socketUtils';

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(
    !!getSocketInstance()?.connected
  );
  const socketRef = useRef(getSocketInstance());

  const initSocketConnection = useCallback(() => {
    // if (user?.info?.company?._id) {
    const socketClient = io(
      import.meta.env.VITE_ENV === 'development'
        ? `http://localhost:${import.meta.env.VITE_SOCKET_PORT}/` // Development URL
        : 'wss://www.punjabitouchindianrestaurant.com.au', // Production URL
      {
        path:
          import.meta.env.VITE_ENV === 'development'
            ? '/socket.io/'
            : '/socket.io/', // Path remains the same
        transports: ['websocket'],
        reconnection: false,
        auth: {
          token: getCookie('token'), // Sending token as x-access-token
        },
      }
    );
    socketClient.on('connect', function () {
      setIsConnected(true);
    });
    socketClient.on('disconnect', function () {
      setIsConnected(false);
    });
    socketClient.on('connect_error', (err) => {
      console.log({ err });
    });
    socketRef.current = socketClient;

    setSocketInstance(socketClient);
    // }
  }, []);

  useEffect(() => {
    let timer;
    if (!isConnected)
      timer = setInterval(() => {
        if (!socketRef.current?.connected && !socketRef.current?.connecting) {
          socketRef.current.connect();
        }
      }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [isConnected]);

  useEffect(() => {
    initSocketConnection();
    const socket = socketRef?.current;
    return () => {
      if (socket?.connected) {
        socket.disconnect();
      }
      setSocketInstance(undefined);
      socketRef.current = undefined;
    };
  }, [initSocketConnection]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, initSocketConnection, isConnected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.element,
};
