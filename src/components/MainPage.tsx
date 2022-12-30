import InputBox from './InputBox';
import Task from './Task';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAuth } from '../providers/AuthProvider';
import usePrivateApi from '../hooks/usePrivateApi';

const MainPage = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);
  // const { logout, getToken } = useAuth();
  // const api = usePrivateApi();

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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <InputBox todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <Task
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </DragDropContext>
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        // onClick={getToken}
      >
        Refresh my Token
      </button>
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        // onClick={logout}
      >
        logout
      </button>
    </>
  );
};

export default MainPage;
