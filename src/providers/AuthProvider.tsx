import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../utils/axios';
import axios, { AxiosResponse, AxiosError } from 'axios';
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
  const [responseIntercept, setResponseIntercept] = useState<number>(0);
  const [requestIntercept, setRequestIntercept] = useState<number>(0);

  const getToken = async () => {
    try {
      const res = await api.post('/auth/token');
      const accessToken = res?.data?.accessToken;

      console.log('AccessToken: ', accessToken);
      if (!accessToken) {
        throw new Error('Invalid Token');
      }

      api.interceptors.response.eject(responseIntercept);
      setResponseIntercept(
        api.interceptors.response.use(
          (res: AxiosResponse) => res,
          async (err: any) => {
            const prevRequest = err?.config;
            console.log('Mount response intercept');
            if (!prevRequest?.sent) {
              prevRequest.sent = true;
              console.log('Send Request again with: ', accessToken);
              prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
              return api(prevRequest);
            }
            return Promise.reject(err);
          }
        )
      );

      api.interceptors.request.eject(requestIntercept);
      setRequestIntercept(
        api.interceptors.request.use(
          async (config: any) => {
            if (!accessToken) return config;
            console.log(
              'Mount request intercept with accessToken: ',
              accessToken
            );
            console.log(api);
            return {
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
              },
            };
          },
          (err: AxiosError) => Promise.reject(err)
        )
      );

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

      api.interceptors.response.eject(responseIntercept);
      api.interceptors.request.eject(requestIntercept);
      console.log('Unmount Interceptors');

      console.log(res);
      setToken('');
      setIsLoggedIn(false);
      setResponseIntercept(0);
      setRequestIntercept(0);
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
