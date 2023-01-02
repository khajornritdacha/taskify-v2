import { Outlet, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

const Layout = () => {
  const { getToken } = useAuth();
  useEffect(() => {
    async function tryLoginUser() {
      await getToken();
    }
    tryLoginUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-bright-navy-blue font-neucha">
      <Link
        to="/"
        className="mt-8 list-none self-center text-5xl text-ghost-white hover:scale-[1.1]"
      >
        Taskify V2
      </Link>
      <Outlet />
    </main>
  );
};

export default Layout;
