import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import useData from '../hooks/useData';
import { useAuth } from '../providers/AuthProvider';
import InputBox from './InputBox';
import Task from './Task';
import BtnIcon from './BtnIcon';

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
    await addData(todo);
    setTodo('');
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    await logout();
    await refreshData();
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

  console.log('Loggedin status: ', isLoggedIn);

  return (
    <>
      {!isLoading ? (
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
