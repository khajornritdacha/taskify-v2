import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone, MdClear } from 'react-icons/md';
import { Todo } from '../models/model';
import useData from '../hooks/useData';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { saveLocalData } from '../utils/localData';

interface Props {
  index: number;
  task: Todo;
  isCompleted: boolean;
}

const SingleTask: React.FC<Props> = ({ index, task, isCompleted }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo>(task);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn } = useAuth();
  const {
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos,
    editSingleTask,
    deleteTask,
    addTask,
  } = useData();

  const handleToggleDone = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!isLoggedIn) {
      let currentTodos = [...todos],
        currentCompletedTodos = [...completedTodos];
      if (isCompleted == true) {
        currentCompletedTodos.splice(currentCompletedTodos.indexOf(task), 1);
        currentTodos.push(task);
      } else {
        currentTodos.splice(currentTodos.indexOf(task), 1);
        currentCompletedTodos.push(task);
      }
      saveLocalData(currentTodos, currentCompletedTodos);
      setTodos(currentTodos);
      setCompletedTodos(currentCompletedTodos);
    } else {
      const toastId = toast.loading('Moving data');
      try {
        await deleteTask(task._id);
        await addTask(task.todoText, !isCompleted);
        toast.success('Move success', {
          id: toastId,
        });
      } catch (err) {
        toast.error('Move data failed', {
          id: toastId,
        });
      }
    }
  };

  const handleDelete = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!isLoggedIn) {
      let currentTodos = [...todos],
        currentCompletedTodos = [...completedTodos];
      if (isCompleted == true) {
        currentCompletedTodos.splice(currentCompletedTodos.indexOf(task), 1);
      } else {
        currentTodos.splice(currentTodos.indexOf(task), 1);
      }
      saveLocalData(currentTodos, currentCompletedTodos);
      setTodos(currentTodos);
      setCompletedTodos(currentCompletedTodos);
    } else {
      const toastId = toast.loading('Deleting data');
      try {
        await deleteTask(task._id);
        toast.success('Delete success', {
          id: toastId,
        });
      } catch (err) {
        toast.error('Delete data failed', {
          id: toastId,
        });
      }
    }
  };

  const handleEdit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!isLoggedIn) {
      let currentTodos = [...todos],
        currentCompletedTodos = [...completedTodos];
      if (isCompleted === true) {
        currentCompletedTodos[currentCompletedTodos.indexOf(task)] =
          editingTodo;
      } else {
        currentTodos[currentTodos.indexOf(task)] = editingTodo;
      }
      saveLocalData(currentTodos, currentCompletedTodos);
      setTodos(currentTodos);
      setCompletedTodos(currentCompletedTodos);
    } else {
      const toastId = toast.loading('Editing data');
      try {
        if (!inputRef.current) throw new Error('No input ref');
        const todoText = inputRef.current?.value;
        await editSingleTask(todoText, task._id);
        toast.success('Edit success', {
          id: toastId,
        });
      } catch (err) {
        toast.error('Edit data failed', {
          id: toastId,
        });
      }
    }
    setIsSubmitting(false);
    setIsEditing(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <form
          onSubmit={handleEdit}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="my-4 mx-4 flex h-20 rounded-lg bg-[url('https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg')] px-4 text-2xl text-black hover:scale-[1.03] hover:shadow-todo">
            {isEditing ? (
              <input
                ref={inputRef}
                value={editingTodo.todoText}
                onChange={(event) =>
                  setEditingTodo((prev) => ({
                    ...prev,
                    todoText: event.target.value,
                  }))
                }
              ></input>
            ) : (
              <h1
                className={`mr-auto self-center ${
                  isCompleted && 'line-through'
                }`}
              >
                {task.todoText}
              </h1>
            )}
            <div className="flex text-[1.1em]">
              <span
                className="self-center px-[5px] hover:scale-[1.3] hover:cursor-pointer"
                onClick={() =>
                  setIsEditing((prev) => {
                    return !prev;
                  })
                }
              >
                <AiFillEdit />
              </span>
              <span
                className="self-center px-[5px] hover:scale-[1.3] hover:cursor-pointer"
                onClick={handleDelete}
              >
                <AiFillDelete />
              </span>
              <span
                className="self-center px-[5px] hover:scale-[1.3] hover:cursor-pointer"
                onClick={handleToggleDone}
              >
                {isCompleted ? <MdClear /> : <MdDone />}
              </span>
            </div>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
