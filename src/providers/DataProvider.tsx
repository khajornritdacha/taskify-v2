import { createContext, ReactNode, useState } from 'react';
import { Todo } from '../models/model';
import { IGetResponse } from '../models/apiModel';
import { useAuth } from './AuthProvider';
import { api } from '../utils/axios';

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
      console.log('Refresh data err');
      console.log(err);
      setTodos([]);
      setCompletedTodos([]);
    }
  };

  const addData = async (todo: string) => {
    const res = await api.post('/api/todos', {
      todoText: todo,
      isDone: false,
    });
    console.log('Add data: ', res);
    await refreshData();
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
