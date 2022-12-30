import InputBox from './InputBox';
import Task from './Task';
import { useAuth } from '../providers/AuthProvider';

const MainPage = () => {
  const { logout } = useAuth();

  const refreshToken = async () => {};

  return (
    <>
      <InputBox />
      <Task />
      <button
        className="mx-auto mt-2 max-w-fit rounded-full bg-ghost-white p-3"
        onClick={refreshToken}
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
