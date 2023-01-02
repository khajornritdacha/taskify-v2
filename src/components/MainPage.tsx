import InputBox from './InputBox';
import Task from './Task';
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAuth } from '../providers/AuthProvider';
import useData from '../hooks/useData';
import { onDragEnd } from './DragEnd';

const MainPage = () => {
  const [todo, setTodo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout, getToken, isLoggedIn } = useAuth();
  const { addData, refreshData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeLogin = async () => {
      setIsLoading(true);
      try {
        await getToken();
        await refreshData();
      } catch (err) {
        console.log('Load data fail');
      }
      setIsLoading(false);
    };
    initializeLogin();
  }, []);

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!todo) return;
    setIsSubmitting(true);
    // await addData(todo);
    setTodos([...todos, {todoText: todo, _id: Date.now()}]);
    setTodo('');
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    await logout();
    await refreshData();
  };

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, todos, setTodos, completedTodos, setCompletedTodos)}>
        <InputBox
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
          isSubmitting={isSubmitting}
        />
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
