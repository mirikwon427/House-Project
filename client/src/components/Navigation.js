import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userActions } from '../redux/store/reducers/userReducer';
import CButton from './common/CButton';

export default function Navigation() {
  const { token } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    navigate('/login');
  };
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
        {token === '' ? (
          <CButton title="Sign In" onClick={navigateToLogin} />
        ) : (
          <li className="group relative dropdown list-none bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800 tracking-wide cursor-pointer">
            Mypage
            <div className="group-hover:block dropdown-menu absolute hidden top-10 -left-6 h-auto z-50 cursor-default">
              <ul className="w-36 bg-white shadow px-6 py-8 rounded-md">
                <li className="py-1">
                  <div
                    className="block text-black text-base hover:text-gray-600 cursor-pointer text-center"
                    onClick={OnClickProfile}
                  >
                    Mypage
                  </div>
                </li>
                <li className="py-1">
                  <div
                    className="block text-black text-base hover:text-gray-600 cursor-pointer text-center"
                    onClick={onClickLogout}
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </li>
        )}
      </div>
    </div>
  );
}
