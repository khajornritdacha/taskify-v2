import { Outlet, Link } from 'react-router-dom';

const NavBtn = () => {
  return (
    <main className="flex min-h-screen flex-col bg-bright-navy-blue font-neucha">
      <Link
        to="/"
        className="mt-8 list-none self-center text-5xl text-ghost-white"
      >
        Taskify V2
      </Link>
      <Outlet />
      <Link
        to="/login"
        className="fixed right-[2vw] bottom-[5vh] h-[4rem] w-[4rem] rounded-full bg-ghost-white text-[4rem]"
      >
        +
      </Link>
    </main>
  );
};

export default NavBtn;
