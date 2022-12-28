import SingleTask from './SingleTask';

interface Props {
  tasks: string[];
  isCompleted: boolean;
}

const TaskContainer: React.FC<Props> = ({ tasks, isCompleted }) => {
  return (
    <div
      className={`h-fit min-w-[85%] rounded-lg ${
        !isCompleted ? 'bg-maximum-blue-green' : 'bg-orange-red-crayola'
      }`}
    >
      <h1 className="mt-4 py-2 text-center text-4xl font-bold text-ghost-white">
        {!isCompleted ? 'Active Tasks' : 'Completed Tasks'}
      </h1>
      {tasks.map((task) => (
        <SingleTask task={task} isCompleted={isCompleted} />
      ))}
    </div>
  );
};

export default TaskContainer;
