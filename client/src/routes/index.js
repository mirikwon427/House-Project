import { Routes, Route } from 'react-router-dom';
import Main from '../pages';

function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
    </Routes>
  );
}

export default DefaultRouter;
