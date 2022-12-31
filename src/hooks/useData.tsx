import { useContext, useEffect } from 'react';
import { DataContext } from '../providers/DataProvider';
import usePrivateApi from './usePrivateApi';

const useData = () => {
  const dataContext = useContext(DataContext);
  const privateApi = usePrivateApi();
  if (!dataContext)
    throw new Error('useData must be used within a DataProvider');

  const { todos, setTodos, completedTodos, setCompletedTodos } = dataContext;

  useEffect(() => {
    const initializeLogin = async () => {
      try {
        const res = await privateApi.get('/api/todos');
        setTodos(res.data?.todos);
        setCompletedTodos(res.data?.toRemoves);
      } catch (err) {
        console.log(err);
      }
    };
    initializeLogin();
  }, []);

  return dataContext;
};

export default useData;
