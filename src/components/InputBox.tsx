interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (event: React.FormEvent) => void;
}

const InputBox = ({ todo, setTodo, handleAdd }: Props) => {
  return (
    <form className="relative mx-auto my-10 flex w-fit" onSubmit={handleAdd}>
      <input
        className="h-[60px] w-[85vw] rounded-full px-8 text-3xl"
        placeholder="Enter a task"
        type="text"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      />
      <button
        className="right-0 h-12 w-12 translate-x-[-110%] self-center rounded-full border-none bg-bright-navy-blue font-bold text-ghost-white
        hover:bg-[#388ae2]"
        type="submit"
      >
        Go
      </button>
    </form>
  );
};

export default InputBox;
