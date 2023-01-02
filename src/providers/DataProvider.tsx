import { createContext, ReactNode, useState } from 'react';
import { Todo } from '../models/model';
import { IGetResponse } from '../models/apiModel';
import usePrivateApi from '../hooks/usePrivateApi';

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
  const { children } = props;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const privateApi = usePrivateApi();

  const refreshData = async () => {
    const res = await privateApi.get<IGetResponse>('/api/todos');
    setTodos(res.data?.todos);
    setCompletedTodos(res.data?.toRemoves);
  };

  const addData = async (todo: string) => {
    const res = await privateApi.post('/api/todos', {
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
