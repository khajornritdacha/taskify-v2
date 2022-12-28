import TaskContainer from './TaskContainer';

const Task = () => {
  let tasks = ['hello', 'how', 'are', 'you'];
  return (
    <div className="grid grid-cols-2 justify-items-center px-[3%]">
      <TaskContainer tasks={tasks.slice(0, 3)} isCompleted={false} />
      <TaskContainer tasks={[tasks[3]]} isCompleted={true} />
    </div>
  );
};

export default Task;
