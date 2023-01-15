import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

import { ErrorDto } from '../models/model';
import { api } from '../utils/axios';

const LOGIN_URL = '/auth/login';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);
const token = localStorage.getItem('token');

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(
        LOGIN_URL,
        JSON.stringify({ email, password })
      );
      const accessToken = response?.data?.accessToken;
      localStorage.setItem('token', accessToken);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        if (message) throw new Error(message);
      }
      throw new Error('Unknown Error');
    }
  };

  const logout = async () => {
    // Todo: Remove refresh token when user logout
    try {
      const res = await api.post('/auth/logout');
    } catch (err) {
      console.log(err);
      // Todo Add notification
      if (axios.isAxiosError(err)) {
        const { response } = err;
        const message = response?.data?.message;
        console.log(message);
      } else {
        console.log('Something went wrong!');
      }
    }
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
