import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import CSpinner from '../components/common/CSpinner';
import Chart from '../components/detail/Chart';
import DetailMap from '../components/detail/DetailMap';
import { houseActions } from '../redux/store/reducers/houseReducer';

export default function HouseDetail() {
  const params = useParams();

  const [liked, setLiked] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('abc');

  const { house, isLiked, isLoading } = useSelector((state) => state.house);
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(houseActions.getHouseReq({ id: params.id, token }));
  }, [dispatch, params, token]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const onClickLiked = () => {
    setLiked(!liked);
    setIsAlert(true);
    setAlertTitle(
      liked
        ? '해당 매물이 찜 목록에서 제거되었습니다.'
        : '해당 매물이 찜 목록에 추가되었습니다.',
    );

    let timer = setTimeout(() => {
      setIsAlert(false);
      clearTimeout(timer);
    }, 1500);

    dispatch(
      liked
        ? houseActions.unlikeHouseReq({ id: params.id, token })
        : houseActions.likeHouseReq({ id: params.id, token }),
    );
  };

  return (
    <div className="w-full h-fit flex gap-12">
      {isLoading && <CSpinner />}

      {/* 오른쪽 */}
      <div className="w-2/3">
        <div className="w-full bg-gray-50">
          <Swiper spaceBetween={0} slidesPerView={1}>
            <SwiperSlide>
              <div className="flex justify-center cursor-pointer">
                <img src="/banpoxi.jpg" alt="dummy" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center cursor-pointer">
                <img src="/banpoxi.jpg" alt="dummy" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center cursor-pointer">
                <img src="/banpoxi.jpg" alt="dummy" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="text-3xl font-extrabold mt-12 flex items-center justify-between">
          <div>{house.bldgNm}</div>

          <div
            className={`cursor-pointer w-12 h-12 rounded-full bg-white items-center flex justify-center border border-gray-300`}
            onClick={onClickLiked}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? '#ef5777' : '#fff'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={liked ? '#ef5777' : '#000'}
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>

        <div className="w-full mt-12">
          <div className="text-2xl font-bold mb-6">상세 정보</div>

          <div className="w-full border-t-2 border-[#181818]">
            <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                건물명
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.bldgNm}
              </div>

              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                가격
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.objAmt} 만원
              </div>
            </div>

            <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                전용면적
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.netLeasableArea}
              </div>

              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                공급면적
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.supplyArea}
              </div>
            </div>

            <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                건물용도
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.houseType}
              </div>

              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                층
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.floor}&nbsp;/&nbsp;{house.totalFloor}
              </div>
            </div>

            <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                관리비
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.managementFee}
              </div>

              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                방향
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.direction}
              </div>
            </div>

            <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                방 수
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.room}
              </div>

              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                욕실 수
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.bathroom}
              </div>
            </div>

            <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
              <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                주소
              </div>
              <div className="flex-1 text-base flex justify-center flex-col px-5">
                {house.addressRoad}
              </div>
            </div>
          </div>
        </div>

        <div className="text-2xl font-bold mb-6 mt-12">위치</div>
        <DetailMap center={`${house.addressRoad}`} />
      </div>

      {/* 왼쪽 */}
      <div className="flex-1">
        <div className="sticky top-20">
          <div className="w-full h-fit p-12 bg-white rounded-lg shadow-2xl">
            <div className="text-xl font-bold mb-4">
              매매가 변동 및 예상&nbsp;&nbsp;
              <span className="text-sm font-medium text-gray-500">
                (단위 : 만 원)
              </span>
            </div>
            <Chart />
          </div>
        </div>
      </div>

      {isAlert && (
        <div
          className={`w-[400px] text-center h-fit px-8 py-2 rounded-md text-base fixed bottom-[12%] left-[calc(50%-200px)] z-50 bg-[#1976D2] text-white`}
        >
          {alertTitle}
        </div>
      )}
    </div>
  );
}
