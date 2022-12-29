import NavBtn from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AuthProvider from './providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBtn />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
