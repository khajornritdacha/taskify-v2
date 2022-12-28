const InputBox = () => {
  return (
    <form className="relative mx-auto my-10 flex w-fit">
      <input
        className="h-[60px] w-[75vw] rounded-full px-8 text-xl"
        placeholder="Enter a task"
        type="text"
      />
      <button
        className="right-0 h-12 w-12 translate-x-[-110%] self-center rounded-full border-none bg-bright-navy-blue font-bold text-ghost-white"
        type="submit"
      >
        Go
      </button>
    </form>
  );
};

export default InputBox;
