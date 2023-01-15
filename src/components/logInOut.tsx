import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

interface props {
  handleLogout: () => Promise<void>;
  isLoggingOut: boolean;
}

export default function LogInOut({ handleLogout, isLoggingOut }: props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <div className="group fixed right-[2vw] bottom-[5vh] flex items-center">
      {!isLoggedIn ? (
        <>
          <span
            className={`absolute float-left min-w-max translate-x-[-110%] scale-0 rounded-xl bg-ghost-white px-3 py-2 text-xl font-bold text-bright-navy-blue transition-all duration-200 group-hover:scale-100`}
          >
            Log In
          </span>
          <BiLogInCircle
            className={`h-[4rem] w-[4rem] rounded-2xl bg-ghost-white text-bright-navy-blue transition-all duration-200 ease-linear hover:cursor-pointer hover:rounded-3xl hover:bg-bright-navy-blue hover:text-ghost-white`}
            onClick={() => navigate('/login')}
          />
        </>
      ) : (
        <>
          <span
            className={`absolute float-left min-w-max translate-x-[-110%] scale-0 rounded-xl bg-ghost-white px-3 py-2 text-xl font-bold text-orange-red-crayola transition-all duration-200 group-hover:scale-100 ${
              isLoggingOut && 'bg-black text-white'
            }`}
          >
            Log Out
          </span>
          <BiLogOutCircle
            className={`h-[4rem] w-[4rem] rounded-2xl bg-ghost-white text-orange-red-crayola transition-all duration-200 ease-linear hover:cursor-pointer hover:rounded-3xl hover:bg-bright-navy-blue hover:text-ghost-white ${
              isLoggingOut && 'bg-black text-white '
            }`}
            onClick={() => handleLogout()}
          />
        </>
      )}
    </div>
  );
}
