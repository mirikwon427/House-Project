import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CButton from './common/CButton';
import { userActions } from '../redux/store/reducers/userReducer';
import { useCallback } from 'react';

export default function Navigation() {
  const { token } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnClickProfile = () => {
    if (token === '') {
      navigate('/login');
    } else {
      navigate('/mypage');
    }
  };

  const onClickLogout = useCallback(
    (e) => {
      dispatch(userActions.logoutUserReq());
    },
    [dispatch],
  );


  return (
    <div className="w-full py-10 flex justify-between items-center">
      <div className="font-extrabold text-2xl">
        <Link to="/">LOGO</Link>
      </div>

      <div className="flex gap-12 items-center">
        <button>
          <Link to="/register/house">매물 등록</Link>
        </button>
        <button>
          <Link to="/search">통합검색</Link>
        </button>
        <button>트렌드</button>
        {/* <CButton
          title={`${token === '' ? 'Sign In' : 'Mypage'}`}
          onClick={OnClickProfile}
        /> */}
        <li className="group  relative dropdown list-none px-4 bg-black text-white hover:bg-gray-800 cursor-pointer text-base tracking-wide">
        Mypage
          <div className="group-hover:block dropdown-menu absolute hidden h-auto">
            <ul className="top-0 w-36 bg-white shadow px-6 py-8">
                <li className="py-1"><div className="block text-black text-base hover:text-gray-600 cursor-pointer" onClick={OnClickProfile}>Mypage</div></li>
                <li className="py-1"><div className="block text-black text-base hover:text-gray-600 cursor-pointer" onClick={onClickLogout}>Logout</div></li>
            </ul>
          </div>
        </li>
      </div>
    </div>
  );
}
