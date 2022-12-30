import InputBox from './InputBox';
import Task from './Task';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export default function App() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo !== '') {
      setTodos([...todos, todo]);
      setTodo('');
    }
  };

  const onDragEnd = (result: DropResult) => {
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

    let tmp: string = '',
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex min-h-screen flex-col bg-bright-navy-blue font-neucha">
        <a
          className="mt-8 list-none self-center text-5xl text-ghost-white"
          href="#"
        >
          Taskify V2
        </a>
        <InputBox todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <Task
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </main>
    </DragDropContext>
  );
}
