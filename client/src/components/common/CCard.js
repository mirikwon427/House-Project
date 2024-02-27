// Props
// data: { image: string, bldg_nm: string, sgg_nm: string }

import { Link } from 'react-router-dom';

// image: 이미지, bldg_nm: 건물명, sgg_nm: 주소
export default function CCard({ data }) {
  return (
    <Link to={`/house/${data.registeredHouse_id}`} className="cursor-pointer">
      <img
        src="https://picsum.photos/id/27/200/300"
        alt="dummy"
        className="w-full h-[320px] bg-[#9C9C9C] rounded-xl"
      />
      <div className="w-full flex justify-between mt-4">
        <div>
          <div className="text-lg font-bold">{data.bldgNm}</div>
          <div className="text-[#7F7F7F] text-sm">{data.sggNm}</div>
        </div>
        <div className="flex flex-col justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
