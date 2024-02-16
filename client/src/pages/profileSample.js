import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CButton from '../components/common/CButton';
import MypageSwiper from '../components/mypage/MypageSwiper';
import { houseActions } from '../redux/store/reducers/houseReducer';

export default function MypageSample() {
  const { user, token } = useSelector((state) => state.user);
  const { likedHouses } = useSelector((state) => state.house);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(houseActions.getLikedHouseReq({ userId: user.id, token }));
  }, [dispatch, user, token]);

  const navigate = useNavigate();
  const gotoUpdateUser = () => {
    navigate('/profile');
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-50 rounded-sm p-16">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-8">
            <div className="w-32 h-32 rounded-full bg-gray-500"></div>
            <div className="flex flex-col justify-center gap-2">
              <div className="text-2xl font-bold">{user.name}</div>
              <div className="text-sm text-gray-500">{user.address}</div>
            </div>
          </div>
          <CButton title="프로필 수정" onClick={gotoUpdateUser} />
        </div>
      </div>

      <MypageSwiper title="찜한 매물 목록" data={likedHouses} />
      <MypageSwiper title="등록한 매물 목록" data={likedHouses} />
    </div>
  );
}
