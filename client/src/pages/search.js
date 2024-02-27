import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CButton from '../components/common/CButton';
import CFilterBtn from '../components/common/CFilterBtn';
import FilterModal from '../components/search/FilterModal';
import SearchList from '../components/search/SearchList';
import { houseActions } from '../redux/store/reducers/houseReducer';
import { bgFixed } from '../utils/utils';

export default function Search() {
  const { token } = useSelector((state) => state.user);

  const params = useParams();

  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [startSquare, setStartSquare] = useState(0);
  const [endSquare, setEndSquare] = useState(0);
  const [typeVal, setTypeVal] = useState([]);
  const [locationVal, setLocationVal] = useState([]);

  const [price, setPrice] = useState('');
  const [square, setSquare] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  const [page, setPage] = useState(1);

  const handleFilter = (e) => {
    let { startPrice, endPrice, startSquare, endSquare, location, type } = e;
    setPage(1);
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

    let locPayload = [];
    let typePayload = [];

    if (location.length > 0) {
      location.map((v) => {
        locPayload.push(v.id);
        return v;
      });
    }

    if (type.length > 0) {
      type.map((v) => {
        typePayload.push(v.id);
        return v;
      });
    }

    let payload = {
      price1: startPrice,
      price2: endPrice,
      location: locPayload,
      type: typePayload,
      size1: startSquare,
      size2: endSquare,
      page: 1,
    };

    const data = {
      data: payload,
      token: token,
    };

    dispatch(houseActions.searchHousesReq(data));
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

  // 다른 페이지에서 조건 걸고 들어올때 조건 같이 걸어줘야됨
  useEffect(() => {
    let payload = {
      price1: 0,
      price2: 0,
      location: [],
      type: [],
      size1: 0,
      size2: 0,
      page: 1,
    };

    const data = {
      data: payload,
      token: token,
    };

    dispatch(houseActions.searchHousesReq(data));
  }, [dispatch, token]);

  const handleSearch = useCallback(
    (e) => {
      setPage(e);

      let locPayload = [];
      let typePayload = [];

      if (locationVal.length > 0) {
        locationVal.map((v) => {
          locPayload.push(v.id);
          return v;
        });
      }

      if (typeVal.length > 0) {
        typeVal.map((v) => {
          typePayload.push(v.id);
          return v;
        });
      }

      let payload = {
        price1: startPrice,
        price2: endPrice,
        location: locPayload,
        type: typePayload,
        size1: startSquare,
        size2: endSquare,
        page: e,
      };

      const data = {
        data: payload,
        token: token,
      };

      dispatch(houseActions.searchHousesReq(data));
    },
    [
      dispatch,
      token,
      startPrice,
      endPrice,
      startSquare,
      endSquare,
      locationVal,
      typeVal,
    ],
  );

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
      <SearchList
        handleFilter={setModalOpen}
        handleSearch={handleSearch}
        page={page}
      />

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
