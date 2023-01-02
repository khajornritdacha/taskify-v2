import { Droppable } from 'react-beautiful-dnd';
import SingleTask from './SingleTask';
import { useStrictDroppable } from '../hooks/UseStrictDroppable';
import { Todo } from '../models/model';

interface Props {
  tasks: Todo[];
  isCompleted: boolean;
}

const TaskContainer: React.FC<Props> = ({ tasks, isCompleted }) => {
  const [enabled] = useStrictDroppable(false);

  return (
    <div className="container">
      {enabled && (
        <Droppable
          droppableId={
            isCompleted ? `CompletedTodosList` : `UnCompletedTodosList`
          }
        >
          {(provided) => (
            <div
              className={`h-fit min-w-[95%] rounded-lg ${
                !isCompleted ? 'bg-maximum-blue-green' : 'bg-orange-red-crayola'
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h1 className="mt-4 py-2 text-center text-4xl font-bold text-ghost-white">
                {!isCompleted ? 'Active Tasks' : 'Completed Tasks'}
              </h1>
              {tasks.map((task, index) => (
                <SingleTask
                  index={index}
                  task={task}
                  isCompleted={isCompleted}
                  todos={todos}
                  setTodos={setTodos}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default TaskContainer;
