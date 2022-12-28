import NavBtn from './components/NavBtn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBtn />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
