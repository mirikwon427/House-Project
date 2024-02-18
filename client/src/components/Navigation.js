import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CButton from './common/CButton';

export default function Navigation() {
  const { token } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const OnClickProfile = () => {
    if (token === '') {
      navigate('/login');
    } else {
      navigate('/mypage');
    }
  };

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
        <CButton
          title={`${token === '' ? 'Sign In' : 'Mypage'}`}
          onClick={OnClickProfile}
        />
      </div>
    </div>
  );
}
