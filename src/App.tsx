import Navbar from './components/Navbar';
import InputBox from './components/InputBox';
import Task from './components/Task';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col bg-bright-navy-blue font-neucha">
      <a
        className="mt-8 list-none self-center text-5xl text-ghost-white"
        href="https://google.com"
      >
        Taskify
      </a>
      <InputBox />
      <Task />
    </main>
  );
}
