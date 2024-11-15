import { createContext, useContext } from 'react';

export const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

let socketInstance;

export const getSocketInstance = () => socketInstance;

export const setSocketInstance = (instance) => {
  socketInstance = instance;
};
