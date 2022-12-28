import SingleTask from './SingleTask';

interface Props {
  tasks: string[];
}

const TaskContainer: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="h-fit min-w-[85%] rounded-lg bg-maximum-blue-green">
      <h1 className="py-4 text-center text-2xl font-bold text-ghost-white">
        Active Tasks
      </h1>
      {tasks.map((task) => (
        <SingleTask task={task} />
      ))}
    </div>
  );
};

export default TaskContainer;
