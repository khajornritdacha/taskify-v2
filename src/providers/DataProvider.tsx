import { createContext, ReactNode, useState } from 'react';
import { Todo } from '../models/model';

export const DataContext = createContext<IDataContext | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

interface IDataContext {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const DataProvider = (props: DataProviderProps) => {
  const { children } = props;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  return (
    <DataContext.Provider
      value={{ todos, setTodos, completedTodos, setCompletedTodos }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
