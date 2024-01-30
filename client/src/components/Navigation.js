import { Link } from 'react-router-dom';
import CButton from './common/CButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function Navigation() {
  const navigate = useNavigate();
  const OnClickProfile = () => {
    if (sessionStorage.getItem('id') === null){
        navigate("/login");
      } else {
        navigate("/profile");
    }
  }




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
        <CButton title="Profile" onClick={OnClickProfile}/>
      </div>
    </div>
  );
}
