import { DropResult } from 'react-beautiful-dnd';
import { Todo } from '../models/model';

export const onDragEnd = (
  result: DropResult,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
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
  setTodos(currentTodos);
  setCompletedTodos(currentCompletedTodos);
};
