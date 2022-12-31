import TaskContainer from './TaskContainer';
import { Todo } from '../models/model';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Task = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  // let tasks = ['hello', 'how', 'are', 'you'];
  return (
    <div className="grid grid-cols-2 justify-items-center px-[3%]">
      {/* <TaskContainer tasks={tasks.slice(0, 3)} isCompleted={false} />
      <TaskContainer tasks={[tasks[3]]} isCompleted={true} /> */}
      <TaskContainer
        tasks={todos}
        isCompleted={false}
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
      />
      <TaskContainer
        tasks={completedTodos}
        isCompleted={true}
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
      />
    </div>
  );
};

export default Task;
