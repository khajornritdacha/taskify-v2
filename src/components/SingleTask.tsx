import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

interface Props {
  task: string;
  isCompleted: boolean;
}

const SingleTask: React.FC<Props> = ({ task, isCompleted }) => {
  return (
    <div className="my-4 mx-4 flex h-20 rounded-lg bg-[url('https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg')] px-4 text-2xl text-black hover:scale-[1.03] hover:shadow-todo">
      <h1 className={`mr-auto self-center ${isCompleted && 'line-through'}`}>
        {task}
      </h1>
      <div className="flex text-[1.1em]">
        <span className="self-center px-[5px] hover:scale-[1.3] hover:cursor-pointer">
          <AiFillEdit />
        </span>
        <span className="self-center px-[5px] hover:scale-[1.3] hover:cursor-pointer">
          <AiFillDelete />
        </span>
        <span className="self-center px-[5px] hover:scale-[1.3] hover:cursor-pointer">
          <MdDone />
        </span>
      </div>
    </div>
  );
};

export default SingleTask;
