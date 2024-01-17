import { Routes, Route } from 'react-router-dom';
import Main from '../pages';
import LogIn from '../pages/login';

function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
    </Routes>
  );
}

export default DefaultRouter;
