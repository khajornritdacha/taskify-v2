import InputBox from './InputBox';
import Task from './Task';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAuth } from '../providers/AuthProvider';
import usePrivateApi from '../hooks/usePrivateApi';
import useData from '../hooks/useData';

const MainPage = () => {
  const [todo, setTodo] = useState<string>('');
  const { logout, getToken, isLoggedIn } = useAuth();
  const { todos, setTodos, completedTodos, setCompletedTodos } = useData();
  const api = usePrivateApi();

  // Todo: Refresh only when data is changed
  // console.log('Page Reloaded');

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!todo) return;
    const addTodo = async () => {
      const res = await api.post('/api/todos', {
        todoText: todo,
        isDone: false,
      });
      console.log(res);
    };

    await addTodo();
    setTodo('');
  };

  const onDragEnd = (result: DropResult) => {
    // const { source, destination } = result;
    // if (destination === null) {
    //   return;
    // }
    // if (
    //   destination?.droppableId === source.droppableId &&
    //   destination?.index === source.index
    // ) {
    //   return;
    // }
    // let tmp: string = '',
    //   currentTodos = [...todos],
    //   currentCompletedTodos = [...completedTodos];
    // if (source.droppableId === 'UnCompletedTodosList') {
    //   tmp = currentTodos[source.index];
    //   currentTodos.splice(source.index, 1);
    // } else {
    //   tmp = currentCompletedTodos[source.index];
    //   currentCompletedTodos.splice(source.index, 1);
    // }
    // if (destination?.droppableId === 'UnCompletedTodosList') {
    //   currentTodos.splice(destination.index, 0, tmp);
    // } else if (destination?.droppableId === 'CompletedTodosList') {
    //   currentCompletedTodos.splice(destination.index, 0, tmp);
    // }
    // setTodos(currentTodos);
    // setCompletedTodos(currentCompletedTodos);
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
        onClick={getToken}
      >
        Refresh my Token
      </button>
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        onClick={logout}
      >
        logout
      </button>
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        onClick={handleAdd}
      >
        addTodo
      </button>
    </>
  );
};

export default MainPage;
