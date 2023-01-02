import { api } from '../utils/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { useEffect } from 'react';

const usePrivateApi = () => {
  const { token, getToken } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      async (config: any) => {
        if (!token) return config;
        return {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${token}` },
        };
      },
      (err: AxiosError) => Promise.reject(err)
    );

    const responseIntercept = api.interceptors.response.use(
      async (res: AxiosResponse) => res,
      async (err: any) => {
        const prevRequest = err?.config;
        if (
          !!prevRequest &&
          !!prevRequest.headers &&
          err?.response?.status === 401 &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const accessToken = await getToken();
          prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return api;
};

export default usePrivateApi;
