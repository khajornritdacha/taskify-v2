import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/axios';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPassword, setConPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password, conPassword);

    if (isSubmitting) return;

    if (password !== conPassword) {
      setErrMsg('Password does not match');
      return;
    }

    console.log(import.meta.env.VITE_BASE_URL);

    setIsSubmitting(true);
    try {
      const response = await api.post(
        '/auth/register',
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      // Todo: Pop up banner to let user know if they register succesfully
      console.log('Register Successfully');

      setErrMsg('');
      setEmail('');
      setPassword('');
      setConPassword('');
      setIsSubmitting(false);
    } catch (err) {
      setErrMsg('Something went wrong!');
    }
  };

  return (
    <>
      {errMsg && <p>{errMsg}</p>}
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
