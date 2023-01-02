import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Todo: Improve notification for each cases
      setErrMsg('Unknown Error');
    }
    setIsSubmitting(false);
  };

  if (isLoggedIn) return <Navigate to="/" />;
  return (
    <>
      {errMsg && <p>{errMsg}</p>}
      <h1 className="mt-[2rem] self-center text-3xl font-bold text-ghost-white">
        Login To Your Account
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto flex w-[30%] flex-col"
      >
        <input
          required
          placeholder="Email"
          type="email"
          name="email"
          className="mt-[2rem] mb-[1rem] rounded-xl p-3 text-2xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          placeholder="Password"
          type="password"
          name="password"
          className="mb-[2rem] rounded-xl p-3 text-2xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mx-auto w-[50%] rounded-full bg-ghost-white py-4 text-xl hover:scale-[1.1]"
          disabled={isSubmitting}
        >
          Login!
        </button>
      </form>
      <Link
        to="/register"
        className="mt-[1.5rem] self-center underline hover:scale-[1.3]"
      >
        Sign Up
      </Link>
    </>
  );
};

export default LoginPage;
