import { Routes, Route } from 'react-router-dom';
import Main from '../pages';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import LogIn from '../pages/login';
import Search from '../pages/search';
import Profile from '../pages/profile';
import HouseDetail from '../pages/houseDetail';
import SignUp from '../pages/signup';

function DefaultRouter() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <div className="w-full min-w-[1340px] max-w-[1730px] px-20">
          <Navigation />

          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/house/:id" element={<HouseDetail />}></Route>
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DefaultRouter;
