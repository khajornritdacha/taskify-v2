import { createContext, ReactNode, useState } from 'react';
import { Todo } from '../models/model';
import { IGetResponse } from '../models/apiModel';
import { useAuth } from './AuthProvider';
import { api } from '../utils/axios';
import axios, { AxiosError } from 'axios';
import { ErrorDto } from '../models/model';

export const DataContext = createContext<IDataContext | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

interface IDataContext {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  refreshData: () => Promise<void>;
  addData: (todo: string) => Promise<void>;
}

const DataProvider = (props: DataProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  // const privateApi = usePrivateApi();
  const { token, getToken } = useAuth();
  const { children } = props;

  const refreshData = async () => {
    try {
      const res = await api.get<IGetResponse>('/api/todos');
      setTodos(res.data?.todos);
      setCompletedTodos(res.data?.toRemoves);
    } catch (err) {
      setTodos([]);
      setCompletedTodos([]);

      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        if (message) throw new Error(message);
      }
      throw new Error('Unknown Error');
    }
  };

  const addData = async (todo: string) => {
    try {
      const res = await api.post('/api/todos', {
        todoText: todo,
        isDone: false,
      });
      console.log('Add data: ', res);
      await refreshData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        if (message) throw new Error(message);
      }
      throw new Error('Unknown Error');
    }
  };

  return (
    <DataContext.Provider
      value={{
        todos,
        setTodos,
        completedTodos,
        setCompletedTodos,
        refreshData,
        addData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
