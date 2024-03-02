import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CSpinner from '../components/common/CSpinner';
import MainSwiper from '../components/main/MainSwiper';
import { houseActions } from '../redux/store/reducers/houseReducer';

export default function Main() {
  const { user, token } = useSelector((state) => state.user);
  const { likedHouses, recommendedHouses, hotPlaces, isLoading } = useSelector(
    (state) => state.house,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(houseActions.getHotPlacesReq({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(houseActions.getLikedHouseReq({ userId: user.id, token }));
  }, [dispatch, user, token]);

  useEffect(() => {
    dispatch(houseActions.getRecommendedHouseReq({ userId: user.id, token }));
  }, [dispatch, user, token]);

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate('/search');
  };

  const navigateToMypage = () => {
    navigate('/mypage');
  };

  return (
    <div>
      {isLoading && <CSpinner />}
      {/* 거래 많은 지역 */}
      {/* <MainMap places={hotPlaces} /> */}

      {/* 찜한 매물 목록 */}
      <MainSwiper
        data={{
          title: '찜한 매물 목록',
          items: likedHouses,
          errMsg: '찜한 매물이 없습니다.',
          errBtn: '찜 하러가기',
          errFunc: navigateToSearch,
        }}
      />

      {/* 추천 매물 목록 */}
      <MainSwiper
        data={{
          title: '추천 매물 목록',
          items: recommendedHouses,
          errMsg: '추천 매물이 없습니다.',
          errBtn: '지역 설정',
          errFunc: navigateToMypage,
        }}
      />
    </div>
  );
}
