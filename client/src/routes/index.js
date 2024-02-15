import { Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import Main from '../pages';
import HouseDetail from '../pages/houseDetail';
import LogIn from '../pages/login';
import Profile from '../pages/profile';
import MypageSample from '../pages/profileSample';
import RegisterHouse from '../pages/registerHouse';
import Search from '../pages/search';
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
            <Route path="/mypage" element={<MypageSample />}></Route>
            <Route path="/register/house" element={<RegisterHouse />}></Route>
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DefaultRouter;
