import { Slider } from 'antd';
import { useState } from 'react';
import { cancelBgFixed } from '../../utils/utils';
import CButton from '../common/CButton';
import CCheckBtn from '../common/CCheckBtn';

const locVal = [
  { id: '도봉구', title: '도봉구', checked: false },
  { id: '노원구', title: '노원구', checked: false },
  { id: '강북구', title: '강북구', checked: false },
  { id: '중랑구', title: '중랑구', checked: false },
  { id: '동대문구', title: '동대문구', checked: false },
  { id: '성북구', title: '성북구', checked: false },
  { id: '종로구', title: '종로구', checked: false },
  { id: '은평구', title: '은평구', checked: false },
  { id: '서대문구', title: '서대문구', checked: false },
  { id: '마포구', title: '마포구', checked: false },
  { id: '용산구', title: '용산구', checked: false },
  { id: '중구', title: '중구', checked: false },
  { id: '성동구', title: '성동구', checked: false },
  { id: '광진구', title: '광진구', checked: false },
  { id: '강동구', title: '강동구', checked: false },
  { id: '송파구', title: '송파구', checked: false },
  { id: '강남구', title: '강남구', checked: false },
  { id: '서초구', title: '서초구', checked: false },
  { id: '동작구', title: '동작구', checked: false },
  { id: '관악구', title: '관악구', checked: false },
  { id: '영등포구', title: '영등포구', checked: false },
  { id: '금천구', title: '금천구', checked: false },
  { id: '구로구', title: '구로구', checked: false },
  { id: '양천구', title: '양천구', checked: false },
  { id: '강서구', title: '강서구', checked: false },
];
const typeVal = [
  { id: '원룸', title: '원룸', checked: false },
  { id: '투,쓰리룸', title: '투,쓰리룸', checked: false },
  { id: '오피스텔', title: '오피스텔', checked: false },
  { id: '아파트', title: '아파트', checked: false },
];

export default function FilterModal({ setModalOpen, handleFilter, data }) {
  const [startPrice, setStartPrice] = useState(data.startPrice);
  const [endPrice, setEndPrice] = useState(data.endPrice);
  const [startSquare, setStartSquare] = useState(data.startSquare);
  const [endSquare, setEndSquare] = useState(data.endSquare);
  const [location, setLocation] = useState(
    locVal.map((v) => {
      return { ...v, checked: data.locationVal.includes(v.id) };
    }),
  );
  const [type, setType] = useState(
    typeVal.map((v) => {
      return { ...v, checked: data.typeVal.includes(v.id) };
    }),
  );

  const handlePrice = (e) => {
    setStartPrice(e[0]);
    setEndPrice(e[1]);
  };
  const handleSquare = (e) => {
    setStartSquare(e[0]);
    setEndSquare(e[1]);
  };
  const onCheckLocation = (e) => {
    const data = location.map((v) => {
      if (v.id === e.id) return { ...v, checked: e.checked };
      return v;
    });
    setLocation(data);
  };
  const onCheckType = (e) => {
    const data = type.map((v) => {
      if (v.id === e.id) return { ...v, checked: e.checked };
      return v;
    });
    setType(data);
  };

  const onSubmit = () => {
    setModalOpen(false);

    const data = {
      startPrice,
      endPrice,
      startSquare,
      endSquare,
      location: location.filter((v) => v.checked),
      type: type.filter((v) => v.checked),
    };

    handleFilter(data);
    cancelBgFixed();
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
      <div className="relative min-w-[1080px] w-1/3 h-fit max-h-[80vh] bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
        <div className="w-full h-full px-12 py-12 overflow-auto">
          <div className="text-4xl font-bold mb-12">검색 조건</div>

          <div className="text-xl font-bold mb-4">
            금액&nbsp;&nbsp;
            <span className="text-base font-normal">
              ({startPrice}억 ~ {endPrice}억)
            </span>
          </div>
          <div className="w-full flex gap-4 mb-6 flex-wrap">
            <Slider
              range
              defaultValue={[startPrice, endPrice]}
              max={7}
              className="w-full"
              onChange={handlePrice}
            />
          </div>

          <div className="text-xl font-bold mb-4">
            평수&nbsp;&nbsp;
            <span className="text-base font-normal">
              ({startSquare}평 ~ {endSquare}평)
            </span>
          </div>
          <div className="w-full flex gap-4 flex-wrap mb-6">
            <Slider
              range
              defaultValue={[startSquare, endSquare]}
              max={40}
              className="w-full"
              onChange={handleSquare}
            />
          </div>

          <div className="text-xl font-bold mb-4">지역</div>
          <div className="w-full flex gap-4 mb-6 flex-wrap">
            {location.map((v) => (
              <CCheckBtn
                key={v.id}
                data={v}
                onClick={onCheckLocation}
                checked={v.checked}
              />
            ))}
          </div>

          <div className="text-xl font-bold mb-4">건물 형태</div>
          <div className="w-full flex gap-4 flex-wrap">
            {type.map((v) => (
              <CCheckBtn
                key={v.id}
                data={v}
                onClick={onCheckType}
                checked={v.checked}
              />
            ))}
          </div>

          <div className="w-full mt-12 flex justify-end">
            <CButton title="적용" onClick={onSubmit} />
          </div>
        </div>

        <div
          className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
          onClick={() => {
            setModalOpen(false);
            cancelBgFixed();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
