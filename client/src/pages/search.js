import { useState } from 'react';
import CFilterBtn from '../components/common/CFilterBtn';
import SearchList from '../components/search/SearchList';
import FilterModal from '../components/search/FilterModal';
import { bgFixed } from '../utils/utils';
import CButton from '../components/common/CButton';

export default function Search() {
  const [modalOpen, setModalOpen] = useState(false);

  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(1);
  const [startSquare, setStartSquare] = useState(0);
  const [endSquare, setEndSquare] = useState(10);
  const [typeVal, setTypeVal] = useState([]);
  const [locationVal, setLocationVal] = useState([]);

  const [price, setPrice] = useState('');
  const [square, setSquare] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  const handleFilter = (e) => {
    let { startPrice, endPrice, startSquare, endSquare, location, type } = e;

    setStartPrice(startPrice);
    setEndPrice(endPrice);
    setStartSquare(startSquare);
    setEndSquare(endSquare);
    setLocationVal(location);
    setTypeVal(type);

    if (endPrice !== 0) setPrice(`${startPrice}억 ~ ${endPrice}억`);
    if (endSquare !== 0) setSquare(`${startSquare}평 ~ ${endSquare}평`);
    if (location.length > 0) {
      let val = '';
      location.map((v, idx) => {
        val += v.title;

        if (idx !== location.length - 1) val += ', ';

        return v;
      });
      setLocation(val);
    }
    if (type.length > 0) {
      let val = '';
      type.map((v, idx) => {
        val += v.title;

        if (idx !== type.length - 1) val += ', ';

        return v;
      });
      setType(val);
    }
  };

  const deletePrice = () => {
    setPrice('');
    setStartPrice(0);
    setEndPrice(0);
  };
  const deleteSquare = () => {
    setSquare('');
    setStartSquare(0);
    setEndSquare(0);
  };
  const deleteLocation = () => {
    setLocation('');
    setLocationVal([]);
  };
  const deleteType = () => {
    setType('');
    setTypeVal([]);
  };

  return (
    <div className="mt-4">
      <div className="mb-12 w-full flex justify-between items-center">
        <div className="text-4xl font-extrabold">통합 검색</div>
        {/* 필터링 */}
        <div className="w-fit flex gap-4">
          {/* 필터링 조건들 */}
          <div className="w-fit flex gap-3 h-fit">
            {price !== '' ? (
              <CFilterBtn data={price} onClick={deletePrice} />
            ) : (
              ''
            )}
            {square !== '' ? (
              <CFilterBtn data={square} onClick={deleteSquare} />
            ) : (
              ''
            )}
            {type !== '' ? <CFilterBtn data={type} onClick={deleteType} /> : ''}
            {location !== '' ? (
              <CFilterBtn data={location} onClick={deleteLocation} />
            ) : (
              ''
            )}
          </div>
          {/* 필터링 버튼 */}
          <CButton
            title="+"
            onClick={() => {
              setModalOpen(true);
              bgFixed();
            }}
          ></CButton>
        </div>
      </div>

      {/* 리스트 */}
      <SearchList handleFilter={setModalOpen} />

      {modalOpen ? (
        <FilterModal
          setModalOpen={setModalOpen}
          handleFilter={handleFilter}
          data={{
            startPrice,
            endPrice,
            startSquare,
            endSquare,
            locationVal: locationVal.map((v) => v.id),
            typeVal: typeVal.map((v) => v.id),
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}
