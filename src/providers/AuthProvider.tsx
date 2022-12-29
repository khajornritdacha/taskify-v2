import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../utils/axios';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
  // const [token, setToken] = useState("");

  const login = async (email: string, password: string) => {
    try {
      // const response = await api.post(
      //   '/auth/login',
      //   {
      //     data: {
      //       email,
      //       password,
      //     },
      //   },
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //     withCredentials: true,
      //   }
      // );
      let response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const err = (await response.json())?.message;
        throw err;
      }

      const data = await response.json();

      localStorage.setItem('token', data.data?.accessToken);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      if (typeof err === 'string') {
        throw err;
      }

      // Todo: Improve error throwing
      throw 'Unknown Error';
    }
  };

  const logout = () => {
    // Todo: Remove refresh token when user logout
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
