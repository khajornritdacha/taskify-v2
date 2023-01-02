import InputBox from './InputBox';
import Task from './Task';
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAuth } from '../providers/AuthProvider';
import useData from '../hooks/useData';
import toast from 'react-hot-toast';

const MainPage = () => {
  const [todo, setTodo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { logout, getToken } = useAuth();

  const { addData, refreshData } = useData();

  useEffect(() => {
    const initializeLogin = async () => {
      await getToken();
      await refreshData();
    };
    initializeLogin();
  }, []);

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!todo) return;
    setIsSubmitting(true);
    await addData(todo);
    setTodo('');
    setIsSubmitting(false);
  };

  // Todo: Migrate onDragEnd to its own file
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
        <InputBox
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
          isSubmitting={isSubmitting}
        />
        <Task />
      </DragDropContext>
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        onClick={getToken}
      >
        Refresh my Token
      </button>
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        onClick={async () => {
          await logout();
          await refreshData();
        }}
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
