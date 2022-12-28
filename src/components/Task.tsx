import TaskContainer from './TaskContainer';

const Task = () => {
  let tasks = ['hello', 'how', 'are', 'you'];
  return (
    <div className="grid grid-cols-2 justify-items-center">
      <TaskContainer tasks={tasks.slice(0, 3)} />
      <TaskContainer tasks={[tasks[3]]} />
    </div>
  );
};

export default Task;
