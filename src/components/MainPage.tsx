import InputBox from './InputBox';
import Task from './Task';
import { useAuth } from '../providers/AuthProvider';

const MainPage = () => {
  const { logout, getToken } = useAuth();

  return (
    <>
      <InputBox />
      <Task />
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        onClick={getToken}
      >
        Refresh my Token
      </button>
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        onClick={logout}
      >
        logout
      </button>
    </>
  );
};

export default MainPage;
