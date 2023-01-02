import TaskContainer from './TaskContainer';
import { Todo } from '../models/model';
import useData from '../hooks/useData';

const Task = () => {
  const { todos, setTodos, completedTodos, setCompletedTodos } = useData();
  return (
    <div className="grid grid-cols-2 justify-items-center px-[3%]">
      {/* <TaskContainer tasks={tasks.slice(0, 3)} isCompleted={false} />
      <TaskContainer tasks={[tasks[3]]} isCompleted={true} /> */}
      <TaskContainer tasks={todos} isCompleted={false} />
      <TaskContainer tasks={completedTodos} isCompleted={true} />
    </div>
  );
};

export default Task;
