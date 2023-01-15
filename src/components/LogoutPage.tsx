import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../providers/AuthProvider';

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigate('/');
    };
    handleLogout();
  }, []);

  return (
    <h1 className="m-auto translate-x-[10%] self-center text-5xl text-ghost-white">
      Logging Out...
    </h1>
  );
}
