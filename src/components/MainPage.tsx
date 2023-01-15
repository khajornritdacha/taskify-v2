import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { saveLocalData } from '../utils/localData';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import useData from '../hooks/useData';
import { useAuth } from '../providers/AuthProvider';
import InputBox from './InputBox';
import Task from './Task';
import BtnIcon from './BtnIcon';
import { onDragEnd } from '../utils/onDragEnd';
import toast from 'react-hot-toast';

const MainPage = () => {
  const [todo, setTodo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout, getToken, isLoggedIn } = useAuth();
  const {
    completedTodos,
    setCompletedTodos,
    addTask,
    refreshData,
    setTodos,
    todos,
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeLogin = async () => {
      setIsLoading(true);
      try {
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
    if (!todo || isSubmitting) return;
    if (!isLoggedIn) {
      const newTodo = [...todos, { todoText: todo, _id: Date.now() }];
      setTodos([...todos, { todoText: todo, _id: Date.now() }]);
      saveLocalData(newTodo, completedTodos);
    } else {
      const toastId = toast.loading('Adding data');
      try {
        setIsSubmitting(true);
        await addTask(todo);
        toast.success('Add success', {
          id: toastId,
        });
      } catch (err) {
        toast.error('Add data failed', {
          id: toastId,
        });
      }
    }
    setTodo('');
    setIsSubmitting(false);
  };

  const handleDrag = async (result: DropResult) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading('Adding data');
    try {
      await onDragEnd(
        result,
        todos,
        setTodos,
        completedTodos,
        setCompletedTodos,
        isLoggedIn
      );
      toast.success('Move success', {
        id: toastId,
      });
      await refreshData();
    } catch (err) {
      toast.error('Move failed', {
        id: toastId,
      });
    }
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    await logout();
    await refreshData();
  };

  return (
    <>
      {!isLoading ? (
        <>
          <DragDropContext
            onDragEnd={(result) => {
              handleDrag(result);
            }}
          >
            <InputBox
              todo={todo}
              setTodo={setTodo}
              handleAdd={handleAdd}
              isSubmitting={isSubmitting}
            />
            <Task />
          </DragDropContext>
          <div className="group fixed right-[2vw] bottom-[5vh] flex items-center">
            {!isLoggedIn ? (
              <BtnIcon
                Icon={BiLogInCircle}
                text={'Log In'}
                handleClick={() => navigate('/login')}
              />
            ) : (
              <BtnIcon
                Icon={BiLogOutCircle}
                text={'Log out'}
                handleClick={() => handleLogout()}
                customClass="text-orange-red-crayola"
              />
            )}
          </div>
        </>
      ) : (
        <h1 className="m-auto translate-x-[10%] self-center text-5xl text-ghost-white">
          Loading ...
        </h1>
      )}
    </>
  );
};

export default MainPage;
