import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const NavBtn = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col bg-bright-navy-blue font-neucha">
      <Link
        to="/"
        className="mt-8 list-none self-center text-5xl text-ghost-white hover:scale-[1.1]"
      >
        Taskify V2
      </Link>
      <Outlet />
      {!isLoggedIn && (
        <Link
          to="/login"
          className={`fixed right-[2vw] bottom-[5vh] h-[4rem] w-[4rem] rounded-full bg-ghost-white text-[4rem]`}
        >
          +
        </Link>
      )}
      {isLoggedIn && (
        <button
          className={`fixed right-[2vw] bottom-[5vh] h-[4rem] w-[4rem] rounded-full bg-orange-red-crayola text-[4rem]`}
          onClick={logout}
        >
          O
        </button>
      )}
    </main>
  );
};

export default NavBtn;
