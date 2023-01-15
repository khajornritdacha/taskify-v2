import { createContext, ReactNode, useState } from 'react';
import { Todo } from '../models/model';
import { IGetResponse } from '../models/apiModel';
import { api } from '../utils/axios';
import axios, { AxiosError } from 'axios';
import { ErrorDto } from '../models/model';
import { readLocalData } from '../utils/localData';

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
  addTask: (todo: string, isDone?: boolean) => Promise<void>;
  editSingleTask: (todoText: string, id: number | string) => Promise<void>;
  deleteTask: (id: number | string) => Promise<void>;
}

const DataProvider = (props: DataProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const { children } = props;
  const token = localStorage.getItem('token');

  const refreshData = async () => {
    if (!token) {
      const { localTodos, localCompletedTodos } = readLocalData();
      setTodos(localTodos);
      setCompletedTodos(localCompletedTodos);
      return;
    }

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

  const addTask = async (todo: string, isDone: boolean = false) => {
    console.log(isDone);
    try {
      const res = await api.post('/api/todos', {
        todoText: todo,
        isDone,
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

  const editSingleTask = async (todoText: string, id: number | string) => {
    try {
      const res = await api.put(`/api/todos/${id}`, {
        todoText: todoText,
      });
      console.log('Edit single task: ', res);
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

  const deleteTask = async (id: number | string) => {
    try {
      const res = api.delete(`/api/todos/${id}`);
      console.log('Delete single task: ', res);
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
        addTask,
        editSingleTask,
        deleteTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
