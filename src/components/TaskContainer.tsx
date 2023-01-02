import { Droppable } from 'react-beautiful-dnd';
import SingleTask from './SingleTask';
import { useStrictDroppable } from '../hooks/UseStrictDroppable';

interface Props {
  tasks: string[];
  isCompleted: boolean;
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
  completedTodos: string[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<string[]>>;
}

const TaskContainer: React.FC<Props> = ({ tasks, isCompleted, todos, setTodos, completedTodos, setCompletedTodos }) => {
  const [enabled] = useStrictDroppable(false);

  return <div className="container">
    {enabled && <Droppable droppableId={isCompleted ? `CompletedTodosList` : `UnCompletedTodosList`}>
      {(provided, snapshot) => (
        <div
          className={`h-fit min-w-[95%] rounded-lg ${
            !isCompleted ? 'bg-maximum-blue-green' : 'bg-orange-red-crayola'
          } ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}
        >
          <h1 className="mt-4 py-2 text-center text-4xl font-bold text-ghost-white">
            {!isCompleted ? 'Active Tasks' : 'Completed Tasks'}
          </h1>
          {tasks.map((task, index) => (
            <SingleTask index={index} task={task} isCompleted={isCompleted} todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>}
  </div>
};

export default TaskContainer;
