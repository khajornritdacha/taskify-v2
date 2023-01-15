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
  let token = '';
  let requestIntercept: number | null = null;

  useEffect(() => {
    const responseIntercept = api.interceptors.response.use(
      (res: AxiosResponse) => res,
      async (err: any) => {
        const prevRequest = err?.config;
        console.log('Mount response intercept');
        if (!prevRequest?.sent) {
          prevRequest.sent = true;
          await getToken();
          prevRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.response.eject(responseIntercept);
    };
  }, []);

  useEffect(() => {
    console.log('token changed');
    const requestIntercept = api.interceptors.request.use(
      async (config: any) => {
        if (!token) return config;
        console.log('Mount request intercept with accessToken: ', token);
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      },
      (err: AxiosError) => Promise.reject(err)
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
    };
  }, [token]);

  // const [token, setToken] = useState('');
  // const [responseIntercept, setResponseIntercept] = useState<number>(0);
  // const [requestIntercept, setRequestIntercept] = useState<number>(0);

  const getToken = async () => {
    try {
      const res = await api.post('/auth/token');
      const accessToken = res?.data?.accessToken;

      console.log('AccessToken: ', accessToken);
      if (!accessToken) {
        throw new Error('Invalid Token');
      }

      token = accessToken;
      // setToken(accessToken);
      setIsLoggedIn(true);
      return accessToken;
    } catch (err) {
      console.log('Refresh Token Error');
      setIsLoggedIn(false);
      token = '';
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(
        LOGIN_URL,
        JSON.stringify({ email, password })
      );
      const accessToken = response?.data?.accessToken;
      token = accessToken;
      setIsLoggedIn(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        if (message) throw new Error(message);
      }
      throw new Error('Unknown Error');

      // Todo: Improve error throwing
      // console.log(
      //   !!err?.response.data?.message ? err.response.data.message : err
      // );
      // throw 'Unknown Error';
    }
  };

  const logout = async () => {
    // console.log('Logging Out');
    // Todo: Remove refresh token when user logout
    try {
      const res = await api.post('/auth/logout');

      // console.log(responseIntercept);
      // console.log(requestIntercept);

      // api.interceptors.response.eject(responseIntercept);
      // console.log({ api });
      // if (typeof requestIntercept === 'number') {
      //   api.interceptors.request.eject(requestIntercept);
      // }
      // console.log({ api });
      // console.log('Unmount Interceptors');

      console.log(res);
      // setToken('');
      token = '';
      requestIntercept = null;
      setIsLoggedIn(false);
      // setResponseIntercept(0);
      // setRequestIntercept(0);
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
