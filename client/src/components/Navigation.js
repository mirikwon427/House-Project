import { Link } from 'react-router-dom';
import CButton from './common/CButton';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/store/reducers/userReducer';

export default function Navigation() {
  const navigate = useNavigate();
  const OnClickProfile = () => {
    if (sessionStorage.getItem('id') === null) {
      navigate('/login');
    } else {
      navigate('/mypage');
    }
  };

  const dispatch = useDispatch();
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
        <button>집값 예측</button>
        <button>
          <Link to="/search">통합검색</Link>
        </button>
        <button>트렌드</button>
        <CButton title="Mypage" onClick={OnClickProfile} />
      </div>
    </div>
  );
}
