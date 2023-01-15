import { DropResult } from 'react-beautiful-dnd';
import { Todo, ErrorDto } from '../models/model';
import { api } from './axios';
import axios, { AxiosError } from 'axios';
import { saveLocalData } from './localData';

export const onDragEnd = async (
  result: DropResult,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  isLoggedIn: boolean
) => {
  const { source, destination } = result;
  if (destination === null) {
    return;
  }
  if (
    destination?.droppableId === source.droppableId &&
    destination?.index === source.index
  ) {
    return;
  }
  let tmp,
    currentTodos = [...todos],
    currentCompletedTodos = [...completedTodos];
  if (source.droppableId === 'UnCompletedTodosList') {
    tmp = currentTodos[source.index];
    currentTodos.splice(source.index, 1);
  } else {
    tmp = currentCompletedTodos[source.index];
    currentCompletedTodos.splice(source.index, 1);
  }
  if (destination?.droppableId === 'UnCompletedTodosList') {
    currentTodos.splice(destination.index, 0, tmp);
  } else if (destination?.droppableId === 'CompletedTodosList') {
    currentCompletedTodos.splice(destination.index, 0, tmp);
  }

  if (isLoggedIn) {
    try {
      const res = await api.put(`/api/todos`, {
        todos: currentTodos,
        toRemoves: currentCompletedTodos,
      });
      console.log(res);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        if (message) throw new Error(message);
      }
      throw new Error('Unknown Error');
    }
  } else {
    saveLocalData(currentTodos, currentCompletedTodos);
    setTodos(currentTodos);
    setCompletedTodos(currentCompletedTodos);
  }
};
