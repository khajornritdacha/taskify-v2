import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../utils/axios';
import axios from 'axios';
const LOGIN_URL = '/auth/login';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  token: string;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | undefined>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const res = await api.post('/auth/token');
      const accessToken = res?.data?.accessToken;

      console.log('AccessToken: ', accessToken);
      if (!accessToken) {
        throw new Error('Invalid Token');
      }

      setToken(accessToken);
      setIsLoggedIn(true);
      return accessToken;
    } catch (err) {
      console.log('Refresh Token Error');
      setIsLoggedIn(false);
      setToken('');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(
        LOGIN_URL,
        JSON.stringify({ email, password })
      );
      const accessToken = response?.data?.accessToken;
      setToken(accessToken);
      setIsLoggedIn(true);
    } catch (err) {
      // Todo: Improve error throwing
      console.log(err);
      throw 'Unknown Error';
    }
  };

  const logout = async () => {
    // console.log('Logging Out');
    // Todo: Remove refresh token when user logout
    try {
      const res = await api.post('/auth/logout');
      console.log(res);
      setToken('');
      setIsLoggedIn(false);
    } catch (err) {
      // Todo Add notification
      if (axios.isAxiosError(err)) {
        const { response } = err;
        const message = response?.data?.message;
        console.log(message);
      } else {
        console.log('Something went wrong!');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logout, login, getToken, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
