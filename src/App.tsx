import Navbar from './components/Navbar';
import InputBox from './components/InputBox';
import Task from './components/Task';

export default function App() {
  return (
    <main className="min-h-screen bg-bright-navy-blue font-neucha">
      <h1 className="font-neucha">Hello</h1>
      <Navbar />
      <InputBox />
      <Task />
    </main>
  );
}
