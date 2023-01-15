import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import useData from '../hooks/useData';
import { useAuth } from '../providers/AuthProvider';
import InputBox from './InputBox';
import Task from './Task';
import BtnIcon from './BtnIcon';
import { onDragEnd } from '../utils/onDragEnd';

const MainPage = () => {
  const [todo, setTodo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout, getToken, isLoggedIn } = useAuth();
  const {
    completedTodos,
    setCompletedTodos,
    addData,
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
    setIsSubmitting(true);
    // await addData(todo);
    setTodos([...todos, { todoText: todo, _id: Date.now() }]);
    setTodo('');
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    await logout();
    await refreshData();
  };

  console.log('Loggedin status: ', isLoggedIn);

  return (
    <>
      {!isLoading ? (
        <>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(
                result,
                todos,
                setTodos,
                completedTodos,
                setCompletedTodos
              )
            }
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
