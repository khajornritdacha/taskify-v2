import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { api } from '../utils/axios';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPassword, setConPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password, conPassword);

    if (isSubmitting) return;

    if (password !== conPassword) {
      toast.error('Password does not match');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Signing up...');
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
      });

      toast.success('Sign up success', {
        id: toastId,
      });

      navigate('/login');
    } catch (err) {
      let message = 'Unknown Error';
      if (axios.isAxiosError(err)) {
        const { response } = err;
        message = response?.data?.message && response.data.message;
      }
      toast.error(message, {
        id: toastId,
      });
    }
    setIsSubmitting(false);
  };

  if (isLoggedIn) return <Navigate to="/" />;
  return (
    <>
      <h1 className="mt-[2rem] self-center text-3xl font-bold text-ghost-white">
        Create An Account
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
          className="mb-[1rem] rounded-xl p-3 text-2xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          placeholder="Confirmation Password"
          type="password"
          name="password"
          className="mb-[2rem] rounded-xl p-3 text-2xl"
          value={conPassword}
          onChange={(e) => setConPassword(e.target.value)}
        />
        <button
          className="mx-auto w-[50%] rounded-full bg-ghost-white py-4 text-xl hover:scale-[1.1]"
          disabled={isSubmitting}
        >
          Sign Up!
        </button>
      </form>
      <Link
        to="/login"
        className="mt-[1.5rem] self-center underline hover:scale-[1.3]"
      >
        Login
      </Link>
    </>
  );
};

export default RegisterPage;
