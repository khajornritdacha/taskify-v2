import InputBox from './InputBox';
import Task from './Task';

const MainPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-bright-navy-blue font-neucha">
      <a
        className="mt-8 list-none self-center text-5xl text-ghost-white"
        href="#"
      >
        Taskify V2
      </a>
      <InputBox />
      <Task />
    </main>
  );
};

export default MainPage;
