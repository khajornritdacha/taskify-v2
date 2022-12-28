import { Outlet, Link } from 'react-router-dom';

const NavBtn = () => {
  return (
    <>
      <Outlet />
      <div className="">
        <Link
          to="/login"
          className="fixed right-[2vw] bottom-[5vh] h-[4rem] w-[4rem] rounded-full bg-ghost-white text-[4rem]"
        >
          +
        </Link>
      </div>
    </>
  );
};

export default NavBtn;
