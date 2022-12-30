import { api } from '../utils/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { useEffect } from 'react';

interface extendedAxiosConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const usePrivateApi = () => {
  const { token } = useAuth();

  useEffect(() => {
    console.log('API interceptors');
    const requestIntercept = api.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        if (!token) return config;
        return {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${token}` },
        };
      },
      (err: AxiosError) => Promise.reject(err)
    );

    // const responseIntercept = api.interceptors.response.use(
    //   async (res: AxiosResponse) => res,
    //   async (err: AxiosError) => {
    //     const prevRequest: extendedAxiosConfig | undefined = err?.config;
    //     if (
    //       !!prevRequest &&
    //       !!prevRequest.headers &&
    //       err?.response?.status === 401 &&
    //       !prevRequest?.sent
    //     ) {
    //       prevRequest.sent = true;
    //       await getToken();
    //       prevRequest.headers['Authorization'] = `Bearer ${token}`;
    //       return api(prevRequest);
    //     }
    //     return Promise.reject(err);
    //   }
    // );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      //   api.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return api;
};

export default usePrivateApi;
