import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPassword, setConPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password, conPassword);
  };

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
        <button className="mx-auto w-[50%] rounded-full bg-ghost-white py-4 text-xl hover:scale-[1.1]">
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
