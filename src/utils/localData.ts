import { Todo } from '../models/model';

export function saveLocalData(todos: Todo[], completedTodos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
}

export function readLocalData() {
  const localTodos = JSON.parse(localStorage.getItem('todos') || '[]');
  const localCompletedTodos = JSON.parse(
    localStorage.getItem('completedTodos') || '[]'
  );
  return { localTodos, localCompletedTodos };
}
