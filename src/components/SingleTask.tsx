interface Props {
  task: string;
}

const SingleTask: React.FC<Props> = ({ task }) => {
  return (
    <div className="my-4 mx-4 flex h-20 rounded-lg bg-[url('https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg')] px-4 text-2xl text-black hover:scale-[1.03] hover:shadow-todo">
      <h1 className="self-center">{task}</h1>
    </div>
  );
};

export default SingleTask;
