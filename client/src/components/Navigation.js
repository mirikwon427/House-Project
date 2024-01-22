import { Link } from 'react-router-dom';

export default function Navigation() {
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
        <button className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800">
          Profile 자리
        </button>
      </div>
    </div>
  );
}
