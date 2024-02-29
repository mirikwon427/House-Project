import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MypageSwiper({ title, data, errMsg, errFunc, errBtn }) {
  const [swiperSetting, setSwiperSetting] = useState(null);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    if (!swiperSetting) {
      const settings = {
        spaceBetween: 32,
        navigation: {
          prevEl: navigationPrevRef.current, // 이전 버튼
          nextEl: navigationNextRef.current, // 다음 버튼
        },
        slidesPerView: 7,
        onBeforeInit: (swiper) => {
          // 초기 설정
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.update();
        },
      };
      setSwiperSetting(settings);
    }
  }, [swiperSetting]);

  return (
    <div className="w-full mt-16">
      <div className="relative">
        <div className="text-3xl font-bold mb-12">{title}</div>
        {data.length < 1 ? (
          <div className="w-full h-[320px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
            <div className="h-fit w-full flex flex-col gap-4">
              <div className="text-[#9b9b9b] text-lg text-center">{errMsg}</div>
              <div className="w-full h-fit flex justify-center">
                <button
                  className="w-[132px] h-12 px-4 py-2 border-[#d3d3d3] border rounded-full bg-white text-base mx-auto"
                  onClick={errFunc}
                >
                  {errBtn}
                </button>
              </div>
            </div>
          </div>
        ) : (
          swiperSetting && (
            <Swiper
              spaceBetween={32}
              slidesPerView={7}
              modules={[Navigation]}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
            >
              {data.map((v) => (
                <SwiperSlide
                  key={v.registeredHouse_id}
                  className="group cursor-pointer"
                >
                  <Link to={`/house/${v.registeredHouse_id}`}>
                    <img
                      src="https://picsum.photos/id/25/200/300"
                      alt="dummy"
                      className="w-[200px] h-[200px] bg-[#9C9C9C] rounded-sm"
                    />
                    <div className="flex-1 flex flex-col justify-between py-4 group-hover:underline">
                      <div>
                        <div className="text-base font-bold">{v.bldgNm}</div>
                        <div className="text-sm text-gray-500">{v.sggNm}</div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )
        )}

        {data.length > 7 && (
          <button
            ref={navigationPrevRef}
            className="absolute -left-5 bottom-[calc(50%-20px)] z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        {data.length > 7 && (
          <button
            ref={navigationNextRef}
            className="absolute -right-5 bottom-[calc(50%-20px)] z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
