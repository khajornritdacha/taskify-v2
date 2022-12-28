const InputBox = () => {
  return (
    <form className="relative mx-auto my-10 flex w-fit">
      <input
        className="h-[60px] w-[75vw] rounded-full px-4 text-xl"
        type="text"
      />
      <button
        className="absolute right-0 h-12 w-12 rounded-full border-none bg-forest-green-traditional font-bold text-white"
        type="submit"
      >
        Go
      </button>
    </form>
  );
};

export default InputBox;
